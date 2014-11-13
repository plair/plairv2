define(['underscore', 'backbone'], function(_, Backbone) {
  var YoutubeVideo = Backbone.Model.extend({

    defaults: {
      title: "",
      youtubeCode: ""
    },
    initialize: function() {

    }
  });
  return YoutubeVideo;
});
