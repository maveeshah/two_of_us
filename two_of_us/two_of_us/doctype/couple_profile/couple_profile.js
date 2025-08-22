
// Copyright (c) 2025, Your Company and contributors
// Please see license.txt

frappe.ui.form.on('Couple Profile', {
    refresh: function (frm) {
        // Add custom button to update statistics
        frm.add_custom_button(__('Update Statistics'), function () {
            frm.call('update_statistics').then(() => {
                frm.reload_doc();
                frappe.show_alert(__('Statistics updated successfully!'));
            });
        });
    },

    partner1_email: function (frm) {
        // Validate email format
        if (frm.doc.partner1_email && !frappe.utils.validate_email(frm.doc.partner1_email)) {
            frappe.msgprint(__('Please enter a valid email address for Partner 1'));
            frm.set_value('partner1_email', '');
        }
    },

    partner2_email: function (frm) {
        // Validate email format
        if (frm.doc.partner2_email && !frappe.utils.validate_email(frm.doc.partner2_email)) {
            frappe.msgprint(__('Please enter a valid email address for Partner 2'));
            frm.set_value('partner2_email', '');
        }
    },

    anniversary_date: function (frm) {
        // Calculate relationship duration when anniversary date changes
        if (frm.doc.anniversary_date) {
            const anniversary = new Date(frm.doc.anniversary_date);
            const today = new Date();
            const diffTime = Math.abs(today - anniversary);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            frm.set_value('relationship_duration', diffDays);
        }
    }
});
