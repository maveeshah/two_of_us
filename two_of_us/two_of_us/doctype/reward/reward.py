# Copyright (c) 2025, Your Company and contributors
# For license information, please see license.txt


import frappe
from frappe import _
from datetime import date


class Reward(frappe.model.document.Document):
    def validate(self):
        """Validate reward data"""
        if self.points_required < 0:
            frappe.throw(_("Points required cannot be negative"))

    def on_update(self):
        """Handle reward updates"""
        if self.status == "unlocked" and not hasattr(self, "unlocked_date"):
            self.unlocked_date = date.today()
            self.check_couple_points()

    def check_couple_points(self):
        """Check if couple has enough points to unlock reward"""
        if self.status == "unlocked":
            # Get couple profile to check points
            profile = frappe.get_doc(
                "Couple Profile",
                {
                    "partner1_name": self.partner1_name,
                    "partner2_name": self.partner2_name,
                },
            )

            if profile and profile.total_points >= self.points_required:
                # Points are sufficient, reward can be unlocked
                pass
            else:
                # Not enough points, revert status
                self.status = "locked"
                frappe.throw(_("Not enough points to unlock this reward"))

    def unlock_reward(self):
        """Unlock the reward if couple has enough points"""
        profile = frappe.get_doc(
            "Couple Profile",
            {
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
            },
        )

        if profile and profile.total_points >= self.points_required:
            self.status = "unlocked"
            self.unlocked_date = date.today()
            self.save()
            frappe.msgprint(_("Reward unlocked successfully!"))
        else:
            frappe.throw(_("Not enough points to unlock this reward"))
