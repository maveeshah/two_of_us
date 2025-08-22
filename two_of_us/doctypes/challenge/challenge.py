import frappe
from frappe import _
from datetime import date


class Challenge(frappe.model.document.Document):
    def validate(self):
        """Validate challenge data"""
        if self.start_date and self.end_date and self.start_date > self.end_date:
            frappe.throw(_("Start date cannot be after end date"))

        if self.points < 0:
            frappe.throw(_("Points cannot be negative"))

    def on_update(self):
        """Handle challenge updates"""
        if self.status == "completed" and not hasattr(self, "completed_date"):
            self.completed_date = date.today()
            self.points_earned = self.points
            self.update_couple_profile()

    def update_couple_profile(self):
        """Update couple profile when challenge is completed"""
        if self.status == "completed":
            # Update couple profile statistics
            profile = frappe.get_doc(
                "Couple Profile",
                {
                    "partner1_name": self.partner1_name,
                    "partner2_name": self.partner2_name,
                },
            )

            if profile:
                profile.relationship_score += self.points
                profile.save()
