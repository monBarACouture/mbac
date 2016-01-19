/*global requirejs: false*/
window.GoogleAnalyticsObject = '__ga__';
window.__ga__ = {
    q: [['create', 'UA-71079173-1', 'auto']],
    l: Date.now()
};
requirejs.config({
    baseUrl: '/js',
    paths: {
        'async': 'libs/async',
        'backbone': 'libs/backbone',
        'fastclick': 'libs/fastclick',
        'foundation': 'libs/foundation',
        'foundation-datepicker': 'libs/foundation-datepicker',
        'foundation-datepicker-fr': 'libs/foundation-datepicker.fr',
        'ga': '//www.google-analytics.com/analytics',
        'jquery': 'libs/jquery',
        'marked': 'libs/marked',
        'marionette': 'libs/backbone.marionette',
        'modernizr': 'libs/modernizr',
        'promise': 'libs/bluebird',
        'text': 'libs/text',
        'underscore': 'libs/underscore',
        'Configuration': 'common/Configuration/configuration',
        'Dialog': 'common/Dialog/dialog',
        'LightBox': 'common/LightBox/lightbox',
        'ModelFlagMixin': 'common/ModelMixins/flag',
        'ModelFormDataSyncMixin': 'common/ModelMixins/form-data-sync',
        'ModelPicturesContainerMixin': 'common/ModelMixins/pictures-container',
        'ModelTagsContainerMixin': 'common/ModelMixins/tags-container',
        'Picture': 'common/Picture/picture',
        'PictureList': 'common/PictureList/picture-list',
        'TabbedPanels': 'common/TabbedPanels/tabbedpanels',
        'Thumbnail': 'common/Thumbnail/thumbnail',
        'ThumbnailList': 'common/ThumbnailList/thumbnail-list'
    },
    shim: {
        'fastclick':  {exports: 'FastClick'},
        'modernizr':  {exports: 'Modernizr'},
        'foundation': {
            deps: ['fastclick', 'jquery', 'modernizr'],
            exports: 'Foundation'
        },
        'foundation-datepicker-fr': {
            deps: ['foundation', 'foundation-datepicker']
        },
        'ga': {
            exports: '__ga__'
        }
    }
});
