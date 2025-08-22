// -*- coding: utf-8 -*-
/*
 * Challenge Doctype Client Script
 */

frappe.ui.form.on('Challenge', {
    refresh: function (frm) {
        // Add custom buttons
        if (frm.doc.status === 'active') {
            frm.add_custom_button(__('Complete Challenge'), function () {
                frm.set_value('status', 'completed');
                frm.save();
            });
        }

        if (frm.doc.status === 'upcoming') {
            frm.add_custom_button(__('Start Challenge'), function () {
                frm.set_value('status', 'active');
                frm.save();
            });
        }
    },

    start_date: function (frm) {
        // Validate start date
        if (frm.doc.start_date && frm.doc.end_date) {
            if (frm.doc.start_date > frm.doc.end_date) {
                frappe.msgprint(__('Start date cannot be after end date'));
                frm.set_value('start_date', '');
            }
        }
    },

    end_date: function (frm) {
        // Validate end date
        if (frm.doc.start_date && frm.doc.end_date) {
            if (frm.doc.start_date > frm.doc.end_date) {
                frappe.msgprint(__('End date cannot be before start date'));
                frm.set_value('end_date', '');
            }
        }
    },

    status: function (frm) {
        // Auto-set completion date when status changes to completed
        if (frm.doc.status === 'completed' && !frm.doc.completed_date) {
            frm.set_value('completed_date', frappe.datetime.get_today());
        }

        // Auto-set progress when status changes
        if (frm.doc.status === 'completed') {
            frm.set_value('progress', 100);
        } else if (frm.doc.status === 'active') {
            frm.set_value('progress', 0);
        }
    }
});
