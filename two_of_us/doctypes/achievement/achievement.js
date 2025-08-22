// -*- coding: utf-8 -*-
/*
 * Achievement Doctype Client Script
 */

frappe.ui.form.on('Achievement', {
    refresh: function (frm) {
        // Add custom buttons
        if (!frm.doc.earned_date) {
            frm.add_custom_button(__('Mark as Earned'), function () {
                frm.set_value('earned_date', frappe.datetime.get_today());
                frm.save();
            });
        }

        // Add share button
        frm.add_custom_button(__('Share Achievement'), function () {
            shareAchievement(frm);
        });
    },

    achievement_type: function (frm) {
        // Set default icon based on achievement type
        if (!frm.doc.icon) {
            let defaultIcons = {
                'Challenge': '🏆',
                'Goal': '🎯',
                'Streak': '🔥',
                'Points': '⭐',
                'Special': '💎',
                'Milestone': '🏁'
            };

            if (defaultIcons[frm.doc.achievement_type]) {
                frm.set_value('icon', defaultIcons[frm.doc.achievement_type]);
            }
        }
    },

    points_awarded: function (frm) {
        // Validate points awarded
        if (frm.doc.points_awarded < 0) {
            frappe.msgprint(__('Points awarded cannot be negative'));
            frm.set_value('points_awarded', 0);
        }
    },

    earned_date: function (frm) {
        // Auto-set earned notes if not provided
        if (frm.doc.earned_date && !frm.doc.earned_notes) {
            frm.set_value('earned_notes', 'Achievement earned on ' + frm.doc.earned_date);
        }
    }
});

function shareAchievement(frm) {
    let message = `🎉 Achievement Unlocked! 🎉\n\n` +
        `${frm.doc.title}\n` +
        `${frm.doc.description}\n\n` +
        `Earned on: ${frm.doc.earned_date || 'Today'}`;

    // You can integrate with social media sharing here
    frappe.msgprint({
        title: __('Share Achievement'),
        message: message,
        indicator: 'green'
    });
}
