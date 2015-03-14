requirejs.config({
    baseUrl: '/js',
    paths: {
        'backbone': 'libs/backbone',
        'fastclick': 'libs/fastclick',
        'foundation': 'libs/foundation',
        'jquery': 'libs/jquery',
        'marionette': 'libs/backbone.marionette',
        'modernizr': 'libs/modernizr',
        'promise': 'libs/bluebird',
        'text': 'libs/text',
        'underscore': 'libs/underscore',

        'Achievement': 'common/Achievement/achievement',
        'AchievementList': 'common/AchievementList/achievement-list',
        'Dialog': 'common/Dialog/dialog',
        'LightBox': 'common/LightBox/lightbox',
        'Picture': 'common/Picture/picture',
        'TabbedPanels': 'common/TabbedPanels/tabbedpanels',
        'Thumbnail': 'common/Thumbnail/thumbnail',

        'AchievementEditorDialog': 'back/AchievementEditorDialog/editor',
        'Configuration': 'back/Configuration/configuration',
        'Dashboard': 'back/dashboard',
        'Gallery': 'back/Gallery/gallery',

        'Test': 'back/Test/test',
    },
    shim: {
        'fastclick':  {exports: 'FastClick'},
        'modernizr':  {exports: 'Modernizr'},
        'foundation': {
            deps: ['fastclick', 'jquery', 'modernizr'],
            exports: 'Foundation'
        },
    }
});
