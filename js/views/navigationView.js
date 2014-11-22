define([
  'jquery',
  'underscore',
  'backbone',
  'utils/EventDispatcher'
  // 'text!templates/youtubeVideo.html'
  ], function($, _, Backbone, EventDispatcher){
  var navigationView = Backbone.View.extend({
    el: $('div.sidebar'),
    // Cache the template function for a single item.
    template: _.template($("#navTemplate").html()),

    events: {
      'click button.next': 'nextTrack',
      'click button.prev': 'prevTrack'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.append(this.template);
    },
    nextTrack: function(e){
      e.stopPropagation();
      require(['utils/EventDispatcher'], function (EventDispatcher) {
          EventDispatcher.trigger('cueNextTrack');
      });
    },
    prevTrack: function(e){
      e.stopPropagation();
      require(['utils/EventDispatcher'], function (EventDispatcher) {
          EventDispatcher.trigger('cuePrevTrack');
      });
    }
  });
  return new navigationView;
});
