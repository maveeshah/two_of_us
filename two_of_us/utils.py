# -*- coding: utf-8 -*-
"""
Two of Us App Utilities
"""

import frappe


def has_permission(doc, ptype, user):
    """
    Check if user has permission to access the document
    """
    if not user:
        return False

    # System Manager has all permissions
    if "System Manager" in frappe.get_roles(user):
        return True

    # Check if user is one of the partners
    if hasattr(doc, "partner1_name") and hasattr(doc, "partner2_name"):
        user_name = frappe.get_value("User", user, "full_name")
        if user_name in [doc.partner1_name, doc.partner2_name]:
            return True

    # Check if user is the owner
    if doc.owner == user:
        return True

    return False
