import frappe
from frappe import _
from datetime import date


class Goal(frappe.model.document.Document):
    def validate(self):
        """Validate goal data"""
        if self.target_date and self.target_date < date.today():
            frappe.throw(_("Target date cannot be in the past"))

        if self.progress < 0 or self.progress > 100:
            frappe.throw(_("Progress must be between 0 and 100"))

    def on_update(self):
        """Handle goal updates"""
        if self.status == "achieved" and not hasattr(self, "achieved_date"):
            self.achieved_date = date.today()
            self.progress = 100
            self.update_couple_profile()

    def update_couple_profile(self):
        """Update couple profile when goal is achieved"""
        if self.status == "achieved":
            # Update couple profile statistics
            profile = frappe.get_doc(
                "Couple Profile",
                {
                    "partner1_name": self.partner1_name,
                    "partner2_name": self.partner2_name,
                },
            )

            if profile:
                profile.save()

    def update_progress(self, new_progress):
        """Update goal progress"""
        if 0 <= new_progress <= 100:
            self.progress = new_progress

            # Update status based on progress
            if new_progress == 100:
                self.status = "achieved"
            elif new_progress > 0:
                self.status = "in_progress"
            else:
                self.status = "planning"

            self.save()
