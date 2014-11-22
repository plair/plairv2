define([
  'jquery',
  'underscore',
  'backbone',
  'utils/EventDispatcher'
  // 'text!templates/youtubeVideo.html'
  ], function($, _, Backbone, EventDispatcher){
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
      'click .removeTrack': 'destroy',
      'click': 'selectTrack'
    },

    initialize: function() {
      this.render();
      this.model.on('destroy', this.remove, this);
      // this.model.on("change:currentTrack", this.changeCurrentState, this);
      this.model.on("change:currentTrack", this.changeCurrentState($(this.el)), this);
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
    },
    changeCurrentState: function(track){
      //console.log("traxxx", this.model.get('currentTrack'));
      if(this.model.get('currentTrack') === true){
        track.toggleClass('currentVid');
      }
    },
    selectTrack: function(e){
      e.stopPropagation();
      var trackCode = this.model.get('youtubeCode');
      EventDispatcher.trigger('selectTrack', trackCode);
    }
  });
  return YoutubeVideoView;
});
