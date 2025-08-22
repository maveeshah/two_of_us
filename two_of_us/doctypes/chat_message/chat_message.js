// -*- coding: utf-8 -*-
/*
 * Chat Message Doctype Client Script
 */

frappe.ui.form.on('Chat Message', {
    refresh: function (frm) {
        // Add custom buttons
        if (!frm.doc.is_read) {
            frm.add_custom_button(__('Mark as Read'), function () {
                frm.set_value('is_read', 1);
                frm.save();
            });
        }

        // Add reply button
        frm.add_custom_button(__('Reply'), function () {
            createReply(frm);
        });
    },

    message_type: function (frm) {
        // Handle different message types
        if (frm.doc.message_type === 'image') {
            // Show image upload field
            frm.toggle_display('text', false);
            frm.toggle_display('image_upload', true);
        } else {
            // Show text field
            frm.toggle_display('text', true);
            frm.toggle_display('image_upload', false);
        }
    },

    timestamp: function (frm) {
        // Auto-set timestamp if not provided
        if (!frm.doc.timestamp) {
            frm.set_value('timestamp', frappe.datetime.now_datetime());
        }
    }
});

function createReply(frm) {
    // Create a new chat message as a reply
    let reply = frappe.model.get_new_doc('Chat Message');
    reply.partner1_name = frm.doc.partner1_name;
    reply.partner2_name = frm.doc.partner2_name;
    reply.sender_name = frm.doc.sender_name === frm.doc.partner1_name ?
        frm.doc.partner2_name : frm.doc.partner1_name;
    reply.message_type = 'text';
    reply.text = '';

    frappe.set_route('Form', 'Chat Message', reply.name);
}
