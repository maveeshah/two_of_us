#!/usr/bin/env python3
"""
Cleanup Script for Two of Us App
Removes any existing demo data
"""

import frappe


def cleanup_demo_data():
    """Remove all existing demo data"""

    print("🧹 Cleaning up demo data...")

    # List of doctypes to clean
    doctypes = [
        "Couple Profile",
        "Challenge",
        "Goal",
        "Reward",
        "Achievement",
        "Chat Message",
    ]

    for doctype in doctypes:
        try:
            # Get all documents of this doctype
            docs = frappe.get_all(doctype, fields=["name"])
            count = len(docs)

            if count > 0:
                print(f"🗑️  Removing {count} {doctype} records...")

                # Delete each document
                for doc in docs:
                    frappe.delete_doc(doctype, doc.name)

                print(f"✅ Cleaned up {doctype}")
            else:
                print(f"✨ {doctype} is already clean")

        except Exception as e:
            print(f"⚠️  Error cleaning {doctype}: {e}")

    print("\n🎉 Cleanup completed!")
    print("Your doctypes are now clean and ready for real data!")


def after_migrate():
    """This function will be called after migration"""
    cleanup_demo_data()


if __name__ == "__main__":
    cleanup_demo_data()
