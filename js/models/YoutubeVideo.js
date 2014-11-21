define(['underscore', 'backbone'], function(_, Backbone) {
  var YoutubeVideo = Backbone.Model.extend({

    defaults: {
      title: "",
      youtubeCode: "",
      trackNumber:"",
      currentTrack: false
    },
    initialize: function() {

    }
  });
  return YoutubeVideo;
});
