// -*- coding: utf-8 -*-
/*
 * Goal Milestone Doctype Client Script
 */

frappe.ui.form.on('Goal Milestone', {
    refresh: function (frm) {
        // Add custom button to mark milestone as completed
        if (!frm.doc.completed) {
            frm.add_custom_button(__('Mark Completed'), function () {
                frm.set_value('completed', 1);
                frm.set_value('completion_date', frappe.datetime.get_today());
                frm.save();
            });
        }
    },

    completed: function (frm) {
        // Auto-set completion date when milestone is completed
        if (frm.doc.completed && !frm.doc.completion_date) {
            frm.set_value('completion_date', frappe.datetime.get_today());
        }

        // Clear completion date if milestone is unchecked
        if (!frm.doc.completed) {
            frm.set_value('completion_date', '');
        }
    }
});
