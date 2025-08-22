// Copyright (c) 2025, Your Company and contributors
// For license information, please see license.txt


frappe.ui.form.on('Reward', {
    refresh: function (frm) {
        // Add custom buttons based on reward status
        if (frm.doc.status === 'available') {
            frm.add_custom_button(__('Unlock Reward'), function () {
                unlockReward(frm);
            });
        }

        if (frm.doc.status === 'locked') {
            frm.add_custom_button(__('Check Availability'), function () {
                checkRewardAvailability(frm);
            });
        }
    },

    points_required: function (frm) {
        // Validate points requirement
        if (frm.doc.points_required < 0) {
            frappe.msgprint(__('Points required cannot be negative'));
            frm.set_value('points_required', 0);
        }
    },

    status: function (frm) {
        // Auto-set unlock date when status changes to unlocked
        if (frm.doc.status === 'unlocked' && !frm.doc.unlocked_date) {
            frm.set_value('unlocked_date', frappe.datetime.get_today());
        }
    }
});

function unlockReward(frm) {
    frappe.call({
        method: 'two_of_us.api.unlock_reward',
        args: {
            reward_name: frm.doc.name,
            partner1_name: frm.doc.partner1_name,
            partner2_name: frm.doc.partner2_name
        },
        callback: function (r) {
            if (r.message && r.message.success) {
                frappe.msgprint(__('Reward unlocked successfully!'));
                frm.reload_doc();
            } else {
                frappe.msgprint(__('Failed to unlock reward: ') + (r.message.error || 'Unknown error'));
            }
        }
    });
}

function checkRewardAvailability(frm) {
    frappe.call({
        method: 'two_of_us.api.get_rewards_list',
        args: {
            partner1_name: frm.doc.partner1_name,
            partner2_name: frm.doc.partner2_name
        },
        callback: function (r) {
            if (r.message && r.message.current_points >= frm.doc.points_required) {
                frappe.msgprint(__('You have enough points! This reward is now available.'));
                frm.set_value('status', 'available');
                frm.save();
            } else {
                frappe.msgprint(__('You need {0} more points to unlock this reward.').format(
                    frm.doc.points_required - (r.message.current_points || 0)
                ));
            }
        }
    });
}
