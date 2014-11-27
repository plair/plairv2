define([
  'underscore',
  'backbone',
  'jquery',
  'models/YoutubeVideo'
  ], function(_, Backbone, $, YoutubeVideo){

  var YoutubeVideoCollection = Backbone.Collection.extend({
    model: YoutubeVideo,
    comparator: 'trackNumber',
    initialize: function(options) {
      this.bind( 'add', this.onModelAdded, this );
    },
    onModelAdded: function(model, collection, options) {
      Backbone.ajax({
        url: "http://gdata.youtube.com/feeds/api/videos/" + model.get('youtubeCode'),
        success: function(result){
          model.set('title', $(result).find('title').eq(0).text());
          // console.log("model added!", model);
        }
      })
    }


  });
  return YoutubeVideoCollection;
});
