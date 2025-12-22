"""
Support Router for eSIM Myanmar Platform
"""

from fastapi import APIRouter, HTTPException, Depends, Request, status
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

from .auth import get_current_user, get_admin_user

router = APIRouter(prefix="/api/support", tags=["Support"])


# Request Models
class CreateTicketRequest(BaseModel):
    subject: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=20, max_length=5000)
    category: str  # activation, billing, technical, transfer, roaming, account, other
    priority: str = "medium"  # low, medium, high, urgent
    profile_id: Optional[str] = None
    transaction_id: Optional[str] = None
    preferred_contact: str = "email"


class TicketMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)


class TicketUpdateRequest(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_to: Optional[str] = None


@router.post("/tickets")
async def create_ticket(
    request: Request,
    data: CreateTicketRequest,
    current_user: dict = Depends(get_current_user)
):
    """Create support ticket"""
    db = request.app.state.db
    
    ticket = {
        "ticket_id": str(uuid.uuid4()),
        "user_id": current_user["user_id"],
        "subject": data.subject,
        "description": data.description,
        "category": data.category,
        "priority": data.priority,
        "status": "open",
        "profile_id": data.profile_id,
        "transaction_id": data.transaction_id,
        "preferred_contact": data.preferred_contact,
        "assigned_to": None,
        "created_at": datetime.utcnow(),
        "updated_at": None,
        "resolved_at": None,
        "response_count": 0,
        "last_response_at": None
    }
    
    await db.support_tickets.insert_one(ticket)
    ticket.pop("_id", None)
    
    return {"message": "Ticket created", "ticket": ticket}


@router.get("/tickets")
async def get_tickets(
    request: Request,
    status: Optional[str] = None,
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """Get user's support tickets"""
    db = request.app.state.db
    
    query = {"user_id": current_user["user_id"]}
    if status:
        query["status"] = status
    
    cursor = db.support_tickets.find(query).sort("created_at", -1).limit(limit)
    tickets = await cursor.to_list(length=limit)
    
    for ticket in tickets:
        ticket.pop("_id", None)
    
    return {"tickets": tickets}


@router.get("/tickets/{ticket_id}")
async def get_ticket(
    request: Request,
    ticket_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get specific ticket"""
    db = request.app.state.db
    
    ticket = await db.support_tickets.find_one({
        "ticket_id": ticket_id,
        "user_id": current_user["user_id"]
    })
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    ticket.pop("_id", None)
    
    # Get messages
    cursor = db.ticket_messages.find({"ticket_id": ticket_id}).sort("created_at", 1)
    messages = await cursor.to_list(length=100)
    
    for msg in messages:
        msg.pop("_id", None)
    
    return {"ticket": ticket, "messages": messages}


@router.post("/tickets/{ticket_id}/messages")
async def add_message(
    request: Request,
    ticket_id: str,
    data: TicketMessageRequest,
    current_user: dict = Depends(get_current_user)
):
    """Add message to ticket"""
    db = request.app.state.db
    
    # Verify ticket ownership
    ticket = await db.support_tickets.find_one({
        "ticket_id": ticket_id,
        "user_id": current_user["user_id"]
    })
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    if ticket["status"] == "closed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot add message to closed ticket"
        )
    
    message = {
        "message_id": str(uuid.uuid4()),
        "ticket_id": ticket_id,
        "sender_id": current_user["user_id"],
        "sender_type": "customer",
        "message": data.message,
        "created_at": datetime.utcnow()
    }
    
    await db.ticket_messages.insert_one(message)
    
    # Update ticket
    await db.support_tickets.update_one(
        {"ticket_id": ticket_id},
        {
            "$set": {
                "updated_at": datetime.utcnow(),
                "last_response_at": datetime.utcnow(),
                "status": "open"  # Reopen if was waiting
            },
            "$inc": {"response_count": 1}
        }
    )
    
    message.pop("_id", None)
    return {"message": "Message added", "ticket_message": message}


@router.post("/tickets/{ticket_id}/close")
async def close_ticket(
    request: Request,
    ticket_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Close ticket"""
    db = request.app.state.db
    
    result = await db.support_tickets.update_one(
        {
            "ticket_id": ticket_id,
            "user_id": current_user["user_id"]
        },
        {
            "$set": {
                "status": "closed",
                "resolved_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    return {"message": "Ticket closed"}


@router.get("/faq")
async def get_faq(
    request: Request,
    category: Optional[str] = None
):
    """Get FAQ items"""
    db = request.app.state.db
    
    query = {"is_published": True}
    if category:
        query["category"] = category
    
    cursor = db.faq.find(query).sort("order", 1)
    items = await cursor.to_list(length=100)
    
    # If no FAQ items, return defaults
    if not items:
        items = [
            {
                "faq_id": "faq_1",
                "question": "How do I activate my eSIM?",
                "answer": "Go to Settings > Cellular > Add eSIM, then scan the QR code provided in your dashboard.",
                "category": "activation",
                "order": 1
            },
            {
                "faq_id": "faq_2",
                "question": "Can I transfer my eSIM to a new device?",
                "answer": "Yes, you can transfer your eSIM between compatible devices. Go to your dashboard and select Transfer option.",
                "category": "transfer",
                "order": 2
            },
            {
                "faq_id": "faq_3",
                "question": "What payment methods are accepted?",
                "answer": "We accept KBZ Pay, Wave Money, and AYA Pay. Credit card payments coming soon.",
                "category": "billing",
                "order": 3
            },
            {
                "faq_id": "faq_4",
                "question": "Is 5G included in all plans?",
                "answer": "Yes, all our plans include 5G network access where available.",
                "category": "technical",
                "order": 4
            },
            {
                "faq_id": "faq_5",
                "question": "How do I check my data usage?",
                "answer": "You can view your data usage in real-time from your customer dashboard.",
                "category": "account",
                "order": 5
            }
        ]
    
    for item in items:
        item.pop("_id", None)
    
    return {"faq": items}


# Admin endpoints
@router.get("/admin/tickets")
async def admin_get_tickets(
    request: Request,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    limit: int = 100,
    admin_user: dict = Depends(get_admin_user)
):
    """Get all tickets (admin)"""
    db = request.app.state.db
    
    query = {}
    if status:
        query["status"] = status
    if priority:
        query["priority"] = priority
    
    cursor = db.support_tickets.find(query).sort("created_at", -1).limit(limit)
    tickets = await cursor.to_list(length=limit)
    
    for ticket in tickets:
        ticket.pop("_id", None)
    
    return {"tickets": tickets}


@router.put("/admin/tickets/{ticket_id}")
async def admin_update_ticket(
    request: Request,
    ticket_id: str,
    data: TicketUpdateRequest,
    admin_user: dict = Depends(get_admin_user)
):
    """Update ticket (admin)"""
    db = request.app.state.db
    
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    if data.status == "resolved":
        update_data["resolved_at"] = datetime.utcnow()
    
    result = await db.support_tickets.update_one(
        {"ticket_id": ticket_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    return {"message": "Ticket updated"}


@router.post("/admin/tickets/{ticket_id}/reply")
async def admin_reply_ticket(
    request: Request,
    ticket_id: str,
    data: TicketMessageRequest,
    admin_user: dict = Depends(get_admin_user)
):
    """Reply to ticket (admin)"""
    db = request.app.state.db
    
    message = {
        "message_id": str(uuid.uuid4()),
        "ticket_id": ticket_id,
        "sender_id": admin_user["user_id"],
        "sender_type": "support",
        "message": data.message,
        "created_at": datetime.utcnow()
    }
    
    await db.ticket_messages.insert_one(message)
    
    # Update ticket
    await db.support_tickets.update_one(
        {"ticket_id": ticket_id},
        {
            "$set": {
                "updated_at": datetime.utcnow(),
                "last_response_at": datetime.utcnow(),
                "status": "waiting_customer"
            },
            "$inc": {"response_count": 1}
        }
    )
    
    message.pop("_id", None)
    return {"message": "Reply sent", "ticket_message": message}
