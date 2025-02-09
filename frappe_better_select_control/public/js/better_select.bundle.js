/*
* Frappe Better Select Control © 2023
* Author:  Ameen Ahmed
* Company: Level Up Marketing & Software Development Services
* Licence: Please refer to LICENSE file
*/


frappe.ui.form.add_options = function(input, options_list) {
    let $select = $(input),
    container = $select;
    if (!$.isArray(options_list)) return $select;
    
    let placeholder = null,
    has_selection = false;
    for (var i = 0, j = options_list.length; i < j; i++) {
        let v = options_list[i],
        value = null,
        label = null,
        is_placeholder = false,
        is_group = false,
        is_label_null = false,
        is_disabled = false,
        is_selected = false;
        if (!is_null(v)) {
            let is_value_null = is_null(v.value);
            is_label_null = is_null(v.label);
            is_disabled = Boolean(v.disabled);
            is_selected = Boolean(v.selected);
            if (is_selected) has_selection = true;

            if (is_value_null && is_label_null) {
                value = v;
                label = __(v);
            } else {
                value = is_value_null ? "" : v.value;
                label = is_label_null ? __(value) : __(v.label);
            }
        }
        
        if (cstr(value).length) {
            value = cstr(value);
            if (value[0] === '$' || value[0] === '#') {
                var char = value[0];
                value = value.substring(1);
                if (!value.length) {
                    container = $select;
                    continue;
                }
                if (char === '$') is_placeholder = true;
                else is_group = true;
                if (is_label_null) label = __(value);
                if (is_placeholder) {
                    placeholder = cstr(label);
                    continue;
                }
            } else if (value[0] === '!' && value[1] === '#') {
                value = value.substring(1);
            }
        }
        
        if (is_group) {
            container = $('<optgroup>');
            container.attr('label', cstr(label))
                .prop('disabled', is_disabled)
                .appendTo($select.get(0));
            continue;
        }
        $('<option>').html(cstr(label))
            .attr('value', value)
            .prop('disabled', is_disabled)
            .prop('selected', is_selected)
            .appendTo(container.get(0));
    }
    
    if (placeholder && !has_selection) {
        $('<option>').html(placeholder)
            .attr('value', '')
            .prop('disabled', true)
            .prop('selected', true)
            .prop('hidden', true)
            .prependTo($select.get(0));
    }
    
    $select.get(0).selectedIndex = 0;
    $select.trigger('select-change');
    return $select;
};