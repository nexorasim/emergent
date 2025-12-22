"""
Support Ticket Models for eSIM Myanmar Platform
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Literal, List
from datetime import datetime
from enum import Enum


class TicketCategory(str, Enum):
    ACTIVATION = "activation"
    BILLING = "billing"
    TECHNICAL = "technical"
    TRANSFER = "transfer"
    ROAMING = "roaming"
    ACCOUNT = "account"
    OTHER = "other"


class TicketPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TicketStatus(str, Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    WAITING_CUSTOMER = "waiting_customer"
    RESOLVED = "resolved"
    CLOSED = "closed"


class SupportTicketCreate(BaseModel):
    """Create support ticket request"""
    subject: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=20, max_length=5000)
    category: TicketCategory
    priority: TicketPriority = TicketPriority.MEDIUM
    
    # Related entities
    profile_id: Optional[str] = None
    transaction_id: Optional[str] = None
    
    # Contact preference
    preferred_contact: Literal["email", "phone", "chat"] = "email"


class SupportTicketResponse(BaseModel):
    """Support ticket response model"""
    ticket_id: str
    user_id: str
    subject: str
    description: str
    category: TicketCategory
    priority: TicketPriority
    status: TicketStatus = TicketStatus.OPEN
    
    # Related entities
    profile_id: Optional[str] = None
    transaction_id: Optional[str] = None
    
    # Assignment
    assigned_to: Optional[str] = None
    
    # Timestamps
    created_at: datetime
    updated_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    
    # Response info
    response_count: int = 0
    last_response_at: Optional[datetime] = None


class TicketMessage(BaseModel):
    """Ticket message/reply"""
    message_id: str
    ticket_id: str
    sender_id: str
    sender_type: Literal["customer", "support", "system"]
    message: str
    attachments: List[str] = []
    created_at: datetime


class TicketMessageCreate(BaseModel):
    """Create ticket message request"""
    message: str = Field(..., min_length=1, max_length=5000)
    attachments: List[str] = []


class TicketUpdate(BaseModel):
    """Update ticket request (admin)"""
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    assigned_to: Optional[str] = None
    internal_notes: Optional[str] = None


class FAQItem(BaseModel):
    """FAQ item model"""
    faq_id: str
    question: str
    answer: str
    category: TicketCategory
    helpful_count: int = 0
    order: int = 0
    is_published: bool = True
