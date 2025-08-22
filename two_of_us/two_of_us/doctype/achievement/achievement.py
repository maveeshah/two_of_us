# Copyright (c) 2025, Your Company and contributors
# For license information, please see license.txt


class Achievement(frappe.model.document.Document):
    def validate(self):
        """Validate achievement data"""
        if self.points_awarded < 0:
            frappe.throw(_("Points awarded cannot be negative"))

    def on_update(self):
        """Handle achievement updates"""
        if not hasattr(self, "earned_date"):
            self.earned_date = date.today()
            self.award_points()

    def award_points(self):
        """Award points to the couple when achievement is earned"""
        if self.points_awarded > 0:
            # Update couple profile with points
            profile = frappe.get_doc(
                "Couple Profile",
                {
                    "partner1_name": self.partner1_name,
                    "partner2_name": self.partner2_name,
                },
            )

            if profile:
                profile.relationship_score += self.points_awarded
                profile.save()
                frappe.msgprint(_("Points awarded successfully!"))

    def check_achievement_conditions(self):
        """Check if achievement conditions are met"""
        # This method can be extended to check various conditions
        # For now, it's a placeholder for future logic
        pass

    def create_achievement(self, title, description, achievement_type, points=0):
        """Create a new achievement"""
        achievement = frappe.get_doc(
            {
                "doctype": "Achievement",
                "title": title,
                "description": description,
                "achievement_type": achievement_type,
                "points_awarded": points,
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
                "earned_date": date.today(),
            }
        )
        achievement.insert()
        return achievement
