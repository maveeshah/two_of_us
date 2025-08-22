# Copyright (c) 2025, Your Company and contributors
# Please see license.txt

import frappe
from frappe import _
from datetime import datetime


class ChatMessage(frappe.model.document.Document):
    def validate(self):
        """Validate chat message data"""
        if not self.timestamp:
            self.timestamp = datetime.now()

    def on_update(self):
        """Handle message updates"""
        if self.is_read:
            self.mark_as_read()

    def mark_as_read(self):
        """Mark message as read"""
        if self.is_read:
            # Update read status
            self.save()
            # Could add notification logic here
            pass

    def send_message(self, text, message_type="text"):
        """Send a new message"""
        message = frappe.get_doc(
            {
                "doctype": "Chat Message",
                "text": text,
                "message_type": message_type,
                "sender_name": self.sender_name,
                "sender_avatar": self.sender_avatar,
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
                "timestamp": datetime.now(),
                "is_read": False,
            }
        )
        message.insert()
        return message

    def get_conversation_history(self, limit=50):
        """Get conversation history for the couple"""
        messages = frappe.get_all(
            "Chat Message",
            filters={
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
            },
            fields=["*"],
            order_by="timestamp desc",
            limit=limit,
        )
        return messages

    def mark_conversation_as_read(self):
        """Mark all messages in conversation as read"""
        frappe.db.sql(
            """
            UPDATE `tabChat Message` 
            SET is_read = 1 
            WHERE partner1_name = %s 
            AND partner2_name = %s
        """,
            (self.partner1_name, self.partner2_name),
        )

        frappe.db.commit()
