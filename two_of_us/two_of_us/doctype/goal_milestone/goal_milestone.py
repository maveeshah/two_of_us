# Copyright (c) 2025, Your Company and contributors
# For license information, please see license.txt


import frappe
from frappe import _
from datetime import date


class GoalMilestone(frappe.model.document.Document):
    def validate(self):
        """Validate milestone data"""
        if self.completed and not self.completion_date:
            self.completion_date = date.today()

    def on_update(self):
        """Handle milestone updates"""
        if self.completed:
            # Update parent goal progress
            self.update_goal_progress()

    def update_goal_progress(self):
        """Update parent goal progress when milestone is completed"""
        if self.parent and self.parenttype == "Goal":
            goal = frappe.get_doc("Goal", self.parent)
            if goal:
                # Calculate progress based on completed milestones
                total_milestones = len(goal.milestones)
                completed_milestones = len([m for m in goal.milestones if m.completed])

                if total_milestones > 0:
                    progress = (completed_milestones / total_milestones) * 100
                    goal.progress = progress

                    # Update status based on progress
                    if progress == 100:
                        goal.status = "achieved"
                    elif progress > 0:
                        goal.status = "in_progress"
                    else:
                        goal.status = "planning"

                    goal.save()
