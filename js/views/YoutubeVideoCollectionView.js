define([
  'jquery',
  'underscore',
  'backbone',
  'models/YoutubeVideo',
  'views/YoutubeVideoView',
  'collections/YoutubeVideoCollection'
  ], function($, _, Backbone, YoutubeVideo, YoutubeVideoView, YoutubeVideoCollection){
  var YoutubeVideoCollectionView = Backbone.View.extend({
    tagName: 'ol',
    className: "video-list",
    initialize: function() {
      this.render();
      this.listenTo(this.collection, 'all', this.render )
    },

   render: function(){
      var self = this;
      this.$el.empty();
      // filter through all items in a collection
      _.each(this.collection.models, function(youtubeVideo){
      // for each create a new YoutubeVideoView
        var youtubeVideoView = new YoutubeVideoView({model: youtubeVideo})
      // append to root element
        self.$el.append(youtubeVideoView.render().el );
      })
      return this
    }
  });
  return YoutubeVideoCollectionView;
});
