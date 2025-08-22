// Copyright (c) 2025, Your Company and contributors
// For license information, please see license.txt


frappe.ui.form.on('Goal', {
    refresh: function (frm) {
        // Add custom buttons
        if (frm.doc.status === 'planning') {
            frm.add_custom_button(__('Start Goal'), function () {
                frm.set_value('status', 'in_progress');
                frm.save();
            });
        }

        if (frm.doc.status === 'in_progress') {
            frm.add_custom_button(__('Mark Achieved'), function () {
                frm.set_value('status', 'achieved');
                frm.set_value('progress', 100);
                frm.save();
            });
        }
    },

    target_date: function (frm) {
        // Validate target date
        if (frm.doc.target_date) {
            let target = new Date(frm.doc.target_date);
            let today = new Date();
            if (target < today) {
                frappe.msgprint(__('Target date cannot be in the past'));
                frm.set_value('target_date', '');
            }
        }
    },

    progress: function (frm) {
        // Auto-update status based on progress
        if (frm.doc.progress >= 100) {
            frm.set_value('status', 'achieved');
        } else if (frm.doc.progress > 0) {
            frm.set_value('status', 'in_progress');
        } else {
            frm.set_value('status', 'planning');
        }
    },

    status: function (frm) {
        // Auto-set achieved date when status changes to achieved
        if (frm.doc.status === 'achieved' && !frm.doc.achieved_date) {
            frm.set_value('achieved_date', frappe.datetime.get_today());
        }
    }
});
