# Copyright (c) 2025, Your Company and contributors
# Please see license.txt

import frappe
from frappe import _
from datetime import date


class CoupleProfile(frappe.model.document.Document):
    def validate(self):
        """Validate the couple profile data"""
        if self.partner1_email == self.partner2_email:
            frappe.throw(_("Partners cannot have the same email address"))

        if self.anniversary_date and self.anniversary_date > date.today():
            frappe.throw(_("Anniversary date cannot be in the future"))

    def on_update(self):
        """Update statistics when profile is updated"""
        self.update_statistics()

    def update_statistics(self):
        """Update all statistics based on related records"""
        # Update challenge statistics
        challenges = frappe.get_all(
            "Challenge",
            filters={
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
            },
            fields=["status", "points"],
        )

        self.total_challenges = len(challenges)
        self.completed_challenges = len(
            [c for c in challenges if c.status == "completed"]
        )

        # Update goal statistics
        goals = frappe.get_all(
            "Goal",
            filters={
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
            },
            fields=["status"],
        )

        self.total_goals = len(goals)
        self.achieved_goals = len([g for g in goals if g.status == "achieved"])

        # Update points
        self.total_points = sum(
            [c.points for c in challenges if c.status == "completed"]
        )

        # Update achievements count
        achievements = frappe.get_all(
            "Achievement",
            filters={
                "partner1_name": self.partner1_name,
                "partner2_name": self.partner2_name,
            },
        )
        self.achievements_count = len(achievements)

        # Calculate relationship duration
        if self.anniversary_date:
            duration = (date.today() - self.anniversary_date).days
            self.relationship_duration = duration

        # Update relationship level based on score
        self.update_relationship_level()

        self.save()

    def update_relationship_level(self):
        """Update relationship level based on score"""
        if self.relationship_score >= 1000:
            self.relationship_level = "Forever"
        elif self.relationship_score >= 750:
            self.relationship_level = "Soulmates"
        elif self.relationship_score >= 500:
            self.relationship_level = "Lovebirds"
        elif self.relationship_score >= 250:
            self.relationship_level = "Growing Together"
        else:
            self.relationship_level = "New Couple"
