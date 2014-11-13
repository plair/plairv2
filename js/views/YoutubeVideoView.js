define([
  'jquery',
  'underscore',
  'backbone'
  // 'text!templates/youtubeVideo.html'
  ], function($, _, Backbone){
  var YoutubeVideoView = Backbone.View.extend({
    attributes: function(){
      return {
        'data-youtube': this.model.get('youtubeCode')
      };
    },
    tagName: 'li',
    className: 'youtube-item',
    // Cache the template function for a single item.
    template: _.template($("#youtubeTemplate").html()),

    // The DOM events specific to an item.
    events: {
      'click .removeTrack': 'destroy'
    },

    initialize: function() {
      this.render();
      this.model.on('destroy', this.remove(), this);
    },

    render: function() {
      this.$el.html(this.template( this.model.toJSON()) );
      return this
    },
    destroy: function(e){
      e.stopPropagation();
      this.model.destroy();
    },
    remove: function(){
      this.$el.remove();
    }
  });
  return YoutubeVideoView;
});
