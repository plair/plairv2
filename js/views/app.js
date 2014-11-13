define([
  'jquery',
  'underscore',
  'backbone',
  'models/YoutubeVideo',
  'collections/YoutubeVideoCollection',
  'views/YoutubeVideoCollectionView',
  'players/YTPlayer',
  'utils/EventDispatcher'
  ], function($, _, Backbone, YoutubeVideo, YoutubeVideoCollection, YoutubeVideoCollectionView, YTPlayer, EventDispatcher){
  var AppView = Backbone.View.extend({
    el: "#main",
    initialize: function(){
      var self = this;
      var youtubeTestCodes = [{youtubeCode: "7O_l7O4PpDI" }, { youtubeCode: "-q5nFR-EW7U" }, { youtubeCode: "tADtj3idaQ8" }, { youtubeCode: "AsGbETlosPo" }, { youtubeCode: "TqARD0rNHqY" }, { youtubeCode: "O0cihXmhbjs" }, { youtubeCode: "jAv_P2Z-5LU" }, { youtubeCode: "6EWIawHfMZM" }, { youtubeCode: "3XdT2ZEC3Go" }, { youtubeCode: "jkPAeOpLSrI" }, { youtubeCode: "0xxWBigyovY" }, { youtubeCode: "rtodyi12q-4" }, { youtubeCode: "98nUZ938oiU" }, { youtubeCode: "s_u6RCIfe80" }, { youtubeCode: "lup_mAtL7zY" }, { youtubeCode: "QbjLa9vbZe0" }, { youtubeCode: "HohnlWnQPvs" }, { youtubeCode: "nk4P03R3Hts" }, { youtubeCode: "3yn0PISCGpg" }, { youtubeCode: "X1h26SvybDw" }];

      var testcollection = new YoutubeVideoCollection;
      var fillCollection = function(youtubeTestCodes, testcollection){
        for(var i = 0; i< youtubeTestCodes.length; i++){
        var currentcode = youtubeTestCodes[i].youtubeCode;
        var testVid = new YoutubeVideo({ youtubeCode: currentcode});
        testcollection.add(testVid);
        }
        return testcollection
      }

      var finishedCollection = fillCollection(youtubeTestCodes, testcollection);

      $( document ).ajaxStop(function() {
        console.log("this", this);
        var totaled = [];
        var days = finishedCollection.map(function(model){
          totaled.push({ title: model.get('title'), youtubeCode: model.get('youtubeCode')});
        });
        console.log("totaled",  JSON.stringify(totaled));

        var playlistView = new YoutubeVideoCollectionView({ collection: finishedCollection});
        console.log('new YoutubeVideoCollection', testcollection);
        console.log(playlistView.render().el);
        $('div.sidebar').append(playlistView.render().el);
        $('ul.video-list li').first().addClass('currentVid');
        self.listenTo(EventDispatcher, 'playerLoaded', YTPlayer.playVideo('player', $('ul.video-list li').first().data("youtube")));
      });

    },

  });
  return AppView;
});
