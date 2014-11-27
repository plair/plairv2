define([
  'jquery',
  'underscore',
  'backbone',
  'utils/EventDispatcher'
  // 'text!templates/youtubeVideo.html'
  ], function($, _, Backbone, EventDispatcher){
  var navigationView = Backbone.View.extend({
    el: $('div.navigation'),
    // Cache the template function for a single item.
    template: _.template($("#navTemplate").html()),

    events: {
      'click button.next': 'nextTrack',
      'click button.prev': 'prevTrack',
      'submit #addVideo': 'addTrack',
      'click input[type="submit"]': 'addTrack'
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
    },
    addTrack: function(e){
      e.preventDefault();
      function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        }
      }
      var value = youtube_parser( $(this.el).find("input[type='text']").val() );
      $(this.el).find("input[type='text']").val('');
      require(['utils/EventDispatcher'], function (EventDispatcher) {
          EventDispatcher.trigger('addTrack', value);
      });

      //console.log('addTrack', $(this.el).find("input[type='text']").val());
    }
  });
  return new navigationView;
});
