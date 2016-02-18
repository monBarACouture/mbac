// TextEditView.
// =============
// - author: Neal.Rame. <contact@nealrame.com>
// -   date: Thu Feb 18 22:15:03 CET 2016
define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Marionette = require('marionette');
    var util = require('common/util');
    var template = require('text!common/TextEditView/text-edit.html');

    return Marionette.ItemView.extend({
        template: _.template(template),
        className: 'row',
        ui: {
            input: '.input > textarea'
        },
        events: {
            'change @ui.input': 'onInputChanged',
            'blur @ui.input': 'onInputLostFocus',
            'focus @ui.input': 'onInputGainFocus'
        },
        initialize: function(options) {
            this.mergeOptions(options, ['inputAttribute', 'inputId', 'inputLabel', 'inputRows']);
            if (!this.inputId) {
                this.inputId = util.randomString({
                    prefix: 'input'
                });
            }
            if (!this.inputRows) {
                this.inputRows = 8;
            }
        },
        serializeData: function() {
            return {
                inputId: this.inputId,
                inputLabel: this.inputLabel,
                inputRows: this.inputRows
            };
        },
        onInputChanged: function() {
            this.triggerMethod('change', this.inputAttribute, this.ui.input.val());
        },
        onInputGainFocus: function() {
            this.ui.input.parent().addClass('focus');
        },
        onInputLostFocus: function() {
            this.ui.input.parent().removeClass('focus');
        },
        value: function() {
            return _.object([
                [this.inputAttribute, this.ui.input.val()]
            ]);
        },
        setValue: function(value) {
            this.ui.input.val(value);
        }
    });
});
