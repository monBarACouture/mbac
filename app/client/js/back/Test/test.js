define(function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = Backbone.Marionette;

    var Achievement = require('Achievement');
    var ThumbnailView = require('Thumbnail');
    var testTemplate = require('text!back/Test/test.html');

    var collection = new Backbone.Collection([]);

    var remote_pictures = new (Backbone.Collection.extend({
        url: '/api/pictures'
    }));
    remote_pictures.fetch({reset: true});
    remote_pictures.on('reset', function() {
        collection.add(remote_pictures.toJSON());
    });

    var achievements = new (Backbone.Collection.extend({
        url: '/api/achievements',
        model: Achievement,
    }));
    achievements.fetch({reset: true});
    achievements.on('reset', function() {
        collection.add(achievements.models);
    });


    var PicturesCollection = Marionette.CollectionView.extend({
        className: 'thumbnails',
        tagName: 'ul',
        childViewOptions: {
            tagName: 'li',
            width: 196,
            height: 131,
        },
        getChildView: ThumbnailView.create,
    });

    var Test = Marionette.LayoutView.extend({
        template: _.template(testTemplate),
        ui: {
            addButton: '#add-picture'
        },
        events: {
            'click @ui.addButton': 'onAddButtonClicked'
        },
        initialize: function() {
            this.filesInput = $(document.createElement('input')).attr({
                accept: '.gif,.jpeg,.jpg,.png',
                multiple: '',
                type: 'file',
            });
            this.filesInput.on('change', (function(e) {
                this.addFiles(e.target.files);
            }).bind(this));
        },
        addFile: function(file) {
            if (file instanceof File && file.type.match(/^image\/.+$/)) {
                collection.add({file: file});
            }
        },
        addFiles: function(files) {
            _.each(files, this.addFile, this);
        },
        onAddButtonClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.filesInput.click();

            return false;
        },
        onShow: function() {
            if (! this.regions.content) {
                this.addRegion('content', '#test-content');
            }
            this.getRegion('content').show(new PicturesCollection({
                collection: collection
            }));
        }
    });

    return Test;
});
