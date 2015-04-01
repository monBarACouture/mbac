/// pages.js
/// ========
/// - author: Neal.Rame. <contact@nealrame.com>
/// -   date: Tue Mar 31 19:50:23 CEST 2015

var _ = require('underscore');
var config = require('config');
var debug = require('debug')('mbac:pages');
var path = require('path');

function setup_page(app, name, config) {
    var route = path.join(config.prefix, name);
    var page = {
        name: name,
        template: path.join(__dirname, name, 'views', config.template),
        title: config.title || name
    };

    debug(['Setup', route].join(' '));

    // Add this page to application menus
    _.each(config.menu, function(title, type) {
        app.locals.menu[type].push({
            page: name,
            slug: route,
            title: title,
        });
    });

    // The page custom application
    if (config.app) {
        page.application = path.join('pages', config.app);
    }

    // The page custom stylesheet
    if (config.css) {
        page.style = path.join('/styles', config.css);
    }

    // Setup page controller
    app.get(route, function(res, req) {
        res.render(config.layout, {page: page});
    });
}

function setup_api(app, name, config) {
    var module;
    var module_path = path.join('pages', name, 'api');
    var route = path.join('/api', name);

    debug(['Setup', route].join(' '));

    try {
        module = require(module_path);
        if (! _.isFunction(module)) {
            throw new Error([module_path, 'must export a function!'].join(' '));
        }
    } catch (err) {
        throw err;
    }

    app.use(route, require_api(name));
}

exports.setup = function(app) {
    app.locals.menu = {
        navbar: [],
        footer: [],
        admin:  []
    };
    _.each(config.pages, function(page_config, name) {
        if (page_config.back) {
            setup_page(app, name, _.extend(page_config.back, {
                layout: 'backend',
                menu: {
                    admin: page_config.back.menu || name
                },
                prefix: '/admin',
                template: 'back.jade',
            }));
        }
        if (page_config.front) {
            setup_page(app, name, _.extend(page_config.front, {
                layout: 'frontend',
                prefix: '/',
                template: 'front.jade',
            }));
        }
        if (page_config.api) {
            setup_api(app, name, page_config.api);
        }
    });
};