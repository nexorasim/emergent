"""
MongoDB serialization utilities
Handles ObjectId and datetime conversion to JSON-serializable formats
"""

from datetime import datetime
from typing import Any, Dict, List, Optional
from bson import ObjectId


def serialize_doc(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """
    Serialize a MongoDB document for JSON response
    Converts ObjectId to string and datetime to ISO format
    """
    if doc is None:
        return None
    
    serialized = {}
    for key, value in doc.items():
        if key == "_id":
            # Skip MongoDB internal _id field
            continue
        elif isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, datetime):
            serialized[key] = value.isoformat()
        elif isinstance(value, dict):
            serialized[key] = serialize_doc(value)
        elif isinstance(value, list):
            serialized[key] = [
                serialize_doc(item) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            serialized[key] = value
    
    return serialized


def serialize_list(docs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Serialize a list of MongoDB documents
    """
    return [serialize_doc(doc) for doc in docs if doc is not None]
