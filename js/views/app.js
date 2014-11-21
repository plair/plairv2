define([
  'jquery',
  'underscore',
  'backbone',
  'models/YoutubeVideo',
  'collections/YoutubeVideoCollection',
  'views/YoutubeVideoCollectionView',
  'players/YTPlayer',
  'views/navigationView',
  'utils/EventDispatcher'
  ], function($, _, Backbone, YoutubeVideo, YoutubeVideoCollection, YoutubeVideoCollectionView, YTPlayer, navigationView, EventDispatcher){
  var AppView = Backbone.View.extend({
    el: "#main",
    initialize: function(){
      var self = this;
      console.log("dis", this);

      //this.listenTo(EventDispatcher, 'playNext', console.log("wow") );
      require(['utils/EventDispatcher'], function (EventDispatcher) {
          EventDispatcher.on('playNext', function () {
              console.log('shee doop');
          });
      });

      // navigationView.render();

      var testcollection = new YoutubeVideoCollection([{title:"Zé Rodrix - Xamego Da Nega.", youtubeCode:"7O_l7O4PpDI", trackNumber: 20},{title:"Only Real - Cadillac Girl", youtubeCode:"-q5nFR-EW7U", trackNumber: 19},{title:"Marvin Gaye - Anna's Song", youtubeCode:"tADtj3idaQ8", trackNumber: 18},{title:"Detroit Spinners - How Could I Let You Get Away.wmv", youtubeCode:"AsGbETlosPo", trackNumber: 17},{title:"Dennis Brown - How Could I Let You Get Away-Trojan Reggae", youtubeCode:"TqARD0rNHqY", trackNumber: 16},{title:"How Could I Let You Get Away - Barry Biggs", youtubeCode:"O0cihXmhbjs", trackNumber: 15},{title:"william bell - I Forgot to be Your Lover", youtubeCode:"jAv_P2Z-5LU", trackNumber: 14},{title:"Havoc - Be There (Instrumental)", youtubeCode:"6EWIawHfMZM", trackNumber: 13},{title:"Piero Umiliani - Atmosphere", youtubeCode:"3XdT2ZEC3Go", trackNumber: 12},{title:"Twin Sister - 'Daniel' (Live at WFUV)", youtubeCode:"jkPAeOpLSrI", trackNumber: 11},{title:"Stevie Wonder - SuperWoman/Where Where You When I Needed You", youtubeCode:"0xxWBigyovY", trackNumber: 10},{title:"P Reign feat. Drake & Future - DnF (Explicit)", youtubeCode:"rtodyi12q-4", trackNumber: 9},{title:"Freddie Gibbs & Madlib - Piñata (FULL ALBUM)", youtubeCode:"98nUZ938oiU", trackNumber: 8 },{title:"2 Chainz - Dresser ft. Young Thug", youtubeCode:"s_u6RCIfe80", trackNumber: 7},{title:"Twin Sister - Daniel", youtubeCode:"lup_mAtL7zY", trackNumber: 6 },{title:"Twin Sister - Stop (Yours Truly Session)", youtubeCode:"QbjLa9vbZe0", trackNumber: 5 },{title:"Twin Sister - Lady Daydream", youtubeCode:"HohnlWnQPvs", trackNumber: 4 },{title:"Mr Twin Sister - Blush", youtubeCode:"nk4P03R3Hts", trackNumber: 3 },{title:"Twin Sister - All Around And Away We Go (2010)", youtubeCode:"3yn0PISCGpg", trackNumber: 2 },{title:"Freddie Gibbs & Madlib - Bomb (Official) - Piñata", youtubeCode:"X1h26SvybDw", trackNumber: 1 }]);

      var testVid = new YoutubeVideo({ youtubeCode: "1DlXyONrkjc", trackNumber: 21});
      testcollection.add(testVid);

      var playlistView = new YoutubeVideoCollectionView({ collection: testcollection, el: $(".playlist") });

      console.log(testcollection.at(0).get('youtubeCode'));

      /* Event Dispatcher listeners */
      console.log();
      this.listenTo(EventDispatcher, 'playerLoaded', YTPlayer.playVideo('player', testcollection.at(0).get('youtubeCode')));

      /* */

      testcollection.at(0).set('currentTrack', true);
      // testcollection.at(0).el.attr( "class", "currentVid" );

      var testItem = testcollection.where({ currentTrack: true })
      var testIndex = testcollection.indexOf( testItem );

      console.log("testItem", testItem);

      console.log("testIndex", testIndex);

      console.log(testcollection);

      // and be able to get the next and previous models

      YTPlayer.testFunction();

    }
  });
  return AppView;
});
