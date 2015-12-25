/// products.MenuView
/// =================
/// - author: Neal.Rame. <contact@nealrame.com>
/// -   date: Mon Dec 21 22:43:33 CET 2015
define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var template = require('text!pages/products/back/menu/menu.html');

    var functional = require('common/functional');
    var app_channel = Backbone.Wreqr.radio.channel('app');

    return Marionette.ItemView.extend({
        tagName: 'ul',
        className: 'side-nav',
        serializeData: _.constant({}),
        template: _.template(template),
        ui: {
            products: '#products',
            createProduct: '#create-product',
            resellers: '#resellers',
            createReseller: '#create-reseller'
        },
        events: {
            'click @ui.createProduct': 'onCreateProduct',
            'click @ui.createReseller': 'onCreateReseller'
        },
        initialize: function() {
            _.bindAll(this, 'activeProducts', 'activeResellers');
            var active_products = this.activeProducts.bind(this);
            var active_resellers = this.activeResellers.bind(this);
            var route_dispatch = functional.dispatch(
                function(route) {
                    if (route === 'products') {
                        active_products();
                        return true;
                    }
                },
                function(route) {
                    if (route === 'resellers') {
                        active_resellers();
                        return true;
                    }
                }
            );
            app_channel.commands.setHandler('route', route_dispatch);
        },
        activeProducts: function() {
            this.ui.products.parent().addClass('active');
            this.ui.resellers.parent().removeClass('active');
        },
        activeResellers: function() {
            this.ui.resellers.parent().addClass('active');
            this.ui.products.parent().removeClass('active');
        },
        onCreateProduct: function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('onCreateProduct');
            return false;
        },
        onCreateReseller: function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('onCreateReseller');
            return false;
        }
    });
});