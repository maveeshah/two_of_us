#!/usr/bin/env python3
"""
Demo Data Script for Two of Us App
Run this script to populate your doctypes with sample data
"""

import frappe
from datetime import date, timedelta
import random


def create_demo_data():
    """Create demo data for the Two of Us app"""

    print("🎭 Creating demo data for Two of Us app...")

    # Create Couple Profile
    print("👫 Creating couple profile...")
    couple_profile = frappe.get_doc(
        {
            "doctype": "Couple Profile",
            "partner1_name": "John",
            "partner1_email": "john@example.com",
            "partner2_name": "Sarah",
            "partner2_email": "sarah@example.com",
            "anniversary_date": date.today() - timedelta(days=365),
            "relationship_status": "Dating",
            "relationship_score": 750,
            "relationship_level": "Soulmates",
            "relationship_duration": 365,
            "total_challenges": 0,
            "completed_challenges": 0,
            "total_goals": 0,
            "achieved_goals": 0,
            "total_points": 750,
            "achievements_count": 0,
            "description": "John and Sarah have been together for a year and love taking on challenges together!",
        }
    )
    couple_profile.insert()
    print(f"✅ Created couple profile: {couple_profile.name}")

    # Create Challenges
    print("🏆 Creating challenges...")
    challenges_data = [
        {
            "title": "Cook dinner together",
            "description": "Plan and cook a romantic dinner together",
            "category": "Quality Time",
            "difficulty": "Easy",
            "points": 15,
            "status": "completed",
            "start_date": date.today() - timedelta(days=30),
            "end_date": date.today() - timedelta(days=25),
            "progress": 100,
            "completed_date": date.today() - timedelta(days=25),
            "points_earned": 15,
        },
        {
            "title": "Plan weekend getaway",
            "description": "Research and plan a weekend trip together",
            "category": "Adventure",
            "difficulty": "Medium",
            "points": 25,
            "status": "active",
            "start_date": date.today() - timedelta(days=10),
            "end_date": date.today() + timedelta(days=20),
            "progress": 60,
        },
        {
            "title": "Share daily gratitude",
            "description": "Share three things you're grateful for each day",
            "category": "Communication",
            "difficulty": "Easy",
            "points": 10,
            "status": "upcoming",
            "start_date": date.today() + timedelta(days=5),
            "end_date": date.today() + timedelta(days=35),
            "progress": 0,
        },
        {
            "title": "Learn a new skill together",
            "description": "Pick a skill and learn it together",
            "category": "Learning",
            "difficulty": "Hard",
            "points": 50,
            "status": "upcoming",
            "start_date": date.today() + timedelta(days=15),
            "end_date": date.today() + timedelta(days=75),
            "progress": 0,
        },
    ]

    for challenge_data in challenges_data:
        challenge = frappe.get_doc(
            {
                "doctype": "Challenge",
                "partner1_name": "John",
                "partner2_name": "Sarah",
                **challenge_data,
            }
        )
        challenge.insert()
        print(f"✅ Created challenge: {challenge.title}")

    # Create Goals
    print("🎯 Creating goals...")
    goals_data = [
        {
            "title": "Save for vacation",
            "description": "Save $2000 for a summer vacation",
            "category": "Financial",
            "priority": "High",
            "target_date": date.today() + timedelta(days=90),
            "status": "in_progress",
            "progress": 65,
        },
        {
            "title": "Improve communication",
            "description": "Practice active listening and open communication",
            "category": "Communication",
            "priority": "Medium",
            "target_date": date.today() + timedelta(days=60),
            "status": "in_progress",
            "progress": 40,
        },
        {
            "title": "Get fit together",
            "description": "Exercise together 3 times a week",
            "category": "Health",
            "priority": "Medium",
            "target_date": date.today() + timedelta(days=120),
            "status": "planning",
            "progress": 0,
        },
    ]

    for goal_data in goals_data:
        goal = frappe.get_doc(
            {
                "doctype": "Goal",
                "partner1_name": "John",
                "partner2_name": "Sarah",
                **goal_data,
            }
        )
        goal.insert()
        print(f"✅ Created goal: {goal.title}")

    # Create Rewards
    print("🎁 Creating rewards...")
    rewards_data = [
        {
            "title": "Movie Night",
            "description": "Pick any movie and have a cozy movie night",
            "points_required": 100,
            "category": "Entertainment",
            "status": "unlocked",
        },
        {
            "title": "Dinner Date",
            "description": "Go to your favorite restaurant",
            "points_required": 200,
            "category": "Dining",
            "status": "unlocked",
        },
        {
            "title": "Weekend Getaway",
            "description": "Plan a weekend trip together",
            "points_required": 500,
            "category": "Adventure",
            "status": "available",
        },
        {
            "title": "Spa Day",
            "description": "Treat yourselves to a relaxing spa day",
            "points_required": 300,
            "category": "Wellness",
            "status": "locked",
        },
    ]

    for reward_data in rewards_data:
        reward = frappe.get_doc(
            {
                "doctype": "Reward",
                "partner1_name": "John",
                "partner2_name": "Sarah",
                **reward_data,
            }
        )
        reward.insert()
        print(f"✅ Created reward: {reward.title}")

    # Create Achievements
    print("🏅 Creating achievements...")
    achievements_data = [
        {
            "title": "First Challenge",
            "description": "Completed your first challenge together",
            "icon": "🎯",
            "achievement_type": "Challenge",
            "points_awarded": 25,
            "earned_date": date.today() - timedelta(days=25),
        },
        {
            "title": "Week Streak",
            "description": "Maintained a 7-day challenge streak",
            "icon": "🔥",
            "achievement_type": "Streak",
            "points_awarded": 50,
            "earned_date": date.today() - timedelta(days=20),
        },
        {
            "title": "Goal Setter",
            "description": "Set your first goal together",
            "icon": "🎯",
            "achievement_type": "Goal",
            "points_awarded": 30,
            "earned_date": date.today() - timedelta(days=15),
        },
    ]

    for achievement_data in achievements_data:
        achievement = frappe.get_doc(
            {
                "doctype": "Achievement",
                "partner1_name": "John",
                "partner2_name": "Sarah",
                **achievement_data,
            }
        )
        achievement.insert()
        print(f"✅ Created achievement: {achievement.title}")

    # Create Chat Messages
    print("💬 Creating chat messages...")
    chat_messages = [
        "Good morning! Ready for our challenge today? 💪",
        "I'm so excited about our weekend getaway plans! 🏖️",
        "You're doing amazing with our goals! Keep it up! 🌟",
        "I love how we're growing together ❤️",
        "Let's plan something fun for this weekend! 🎉",
    ]

    for i, message_text in enumerate(chat_messages):
        message = frappe.get_doc(
            {
                "doctype": "Chat Message",
                "text": message_text,
                "message_type": "text",
                "sender_name": "John" if i % 2 == 0 else "Sarah",
                "partner1_name": "John",
                "partner2_name": "Sarah",
                "timestamp": date.today() - timedelta(days=random.randint(1, 7)),
                "is_read": True,
            }
        )
        message.insert()
        print(f"✅ Created chat message: {message_text[:30]}...")

    print("\n🎉 Demo data creation completed!")
    print("You can now view your dynamic frontend with real data!")
    print("\nTo view the data in Frappe:")
    print("1. Go to your Frappe desk")
    print("2. Navigate to 'Two of Us' module")
    print("3. You'll see all the created records")

    print("\nTo view the dynamic frontend:")
    print("1. Run 'yarn dev' in the frontend folder")
    print("2. Go to http://localhost:5173")
    print("3. The dashboard will show real data from Frappe!")


if __name__ == "__main__":
    create_demo_data()
