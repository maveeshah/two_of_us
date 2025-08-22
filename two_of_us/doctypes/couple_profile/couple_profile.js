// -*- coding: utf-8 -*-
/*
 * Couple Profile Doctype Client Script
 */

frappe.ui.form.on('Couple Profile', {
    refresh: function (frm) {
        // Add custom buttons or functionality
        frm.add_custom_button(__('Calculate Streak'), function () {
            frm.call({
                method: 'calculate_streak',
                callback: function (r) {
                    if (r.message) {
                        frm.reload_doc();
                    }
                }
            });
        });
    },

    partner1_name: function (frm) {
        // Auto-fill partner1_email if available
        if (frm.doc.partner1_name && !frm.doc.partner1_email) {
            // You can add logic to fetch email from user profile
        }
    },

    partner2_name: function (frm) {
        // Auto-fill partner2_email if available
        if (frm.doc.partner2_name && !frm.doc.partner2_email) {
            // You can add logic to fetch email from user profile
        }
    },

    anniversary_date: function (frm) {
        // Calculate relationship duration when anniversary changes
        if (frm.doc.anniversary_date) {
            let anniversary = new Date(frm.doc.anniversary_date);
            let today = new Date();
            let diffTime = Math.abs(today - anniversary);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            frm.set_value('relationship_duration', diffDays);
        }
    }
});
