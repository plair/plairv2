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

      // set scrollable side playlist
      $(document).ready(function(){
        var height = $(window).height() -300;
        console.log("height", height);
        $('div.scrollable').css('height', height);
      });

      window.onresize = function(event) {
        var height = $(window).height() -300;
        console.log("height", height);
        $('div.scrollable').css('height', height);
      }

      var testcollection = new YoutubeVideoCollection([{youtubeCode:"l4A_L6Bs0o8", trackNumber:5, title:"Made In U.S.A. - Melodies 1977", currentTrack:false},{youtubeCode:"eMQmzLFd7JU", trackNumber:3, title:"Double Exposure - My Love Is Free (12' Special Disco Mix)", currentTrack:false},{youtubeCode:"df0rlvjxl_A", trackNumber:4, title:"Meli'sa Morgan - Still In Love (House version)", currentTrack:false},{youtubeCode:"CIU66esH3js", trackNumber:25, title:"Mc Lyte - Everyday", currentTrack:false},{youtubeCode:"S8K31tTV554", trackNumber:26, title:"Spice 1 - Welcome To The Ghetto", currentTrack:false},{youtubeCode:"a4u8WPX7JZU", trackNumber:27, title:"If This World Were Mine - Marvin Gaye & Tammi Terrell", currentTrack:false},{youtubeCode:"2RpkXyhbMLA", trackNumber:28, title:"Royce Da 5'9 - Let's Grow", currentTrack:false},{youtubeCode:"7O_l7O4PpDI", trackNumber:29, title:"Zé Rodrix - Xamego Da Nega.", currentTrack:false}, {youtubeCode:"JBXfyCXlzz0", trackNumber:30, title:"Frankie Knuckles Live From the Warehouse Chicago in 1977", currentTrack:false},{youtubeCode:"UxPEmLu1-Go", trackNumber:31, title:"DJ Screw - Stressed Out (Side A & B)", currentTrack:false}, {youtubeCode:"YSPQfjgC8Os",trackNumber:2,title:"Two Tons O' Fun - Just Us","currentTrack":false},{youtubeCode:"JBXfyCXlzz0",trackNumber:30,title:"Frankie Knuckles Live From the Warehouse Chicago in 1977","currentTrack":false},{youtubeCode:"GsBukS5mrQY",trackNumber:13,title:"Ecstasy, Passion & Pain - Touch and Go","currentTrack":false},{youtubeCode:"ISjyiI_sruI",trackNumber:14,title:"PAM TODD & LOVE EXCHANGE - LET'S GET TOGETHER","currentTrack":false},{youtubeCode:"E-xzoSzTZpY",trackNumber:15,title:"Loleatta Holloway - Hit And Run","currentTrack":false},{youtubeCode:"XKp3VdRSYkA",trackNumber:16,title:"Three degrees - Dirty old man","currentTrack":false},{youtubeCode:"yWtlrLvrWR0",trackNumber:17,title:"Salsoul Orchestra - You're just the right size","currentTrack":false},{youtubeCode:"6HH08x6Mkg8",trackNumber:18,title:"The Originals - Down To Love Town 1976 ( Disco )","currentTrack":false},{youtubeCode:"bsWha6yoeWs",trackNumber: 7,title:"Roberta Flack & Donny Hathaway - Back Together Again [Extended Version]","currentTrack":false},{youtubeCode:"6f_Ze-Ul0uo",trackNumber:6,title:"Benoit & Sergio - Not In Your Nature (Original Mix)","currentTrack":false},{youtubeCode:"Ho2LTuQBEV8",trackNumber:8,title:"Shintaro Sakamoto - You Just Decided (Official Video)","currentTrack":false},{youtubeCode:"3DvFnp00n9U",trackNumber:9,title:"Letta Mbulu - Nomalizo","currentTrack":false},{youtubeCode:"_g__PaW0ibQ",trackNumber:10,title:"SHARON REDD- NEVER GIVE YOU UP","currentTrack":false},{youtubeCode:"atc2_C-rW3s",trackNumber:11,title:"SZA - Julia / (Tender)","currentTrack":false},{youtubeCode:"s_8KR-n2fBQ",trackNumber:12,title:"Hall and Oates - Out of Touch","currentTrack":false},{youtubeCode:"mnE9UjyLnHs",trackNumber: 1,title:"The Bacao Rhythm & Steel Band - P I M P","currentTrack":true}]);



      // var testcollection = new YoutubeVideoCollection([{title:"Zé Rodrix - Xamego Da Nega.", youtubeCode:"7O_l7O4PpDI", trackNumber: 20},{title:"Only Real - Cadillac Girl", youtubeCode:"-q5nFR-EW7U", trackNumber: 19},{title:"Marvin Gaye - Anna's Song", youtubeCode:"tADtj3idaQ8", trackNumber: 18},{title:"Detroit Spinners - How Could I Let You Get Away.wmv", youtubeCode:"AsGbETlosPo", trackNumber: 17},{title:"Dennis Brown - How Could I Let You Get Away-Trojan Reggae", youtubeCode:"TqARD0rNHqY", trackNumber: 16},{title:"How Could I Let You Get Away - Barry Biggs", youtubeCode:"O0cihXmhbjs", trackNumber: 15},{title:"william bell - I Forgot to be Your Lover", youtubeCode:"jAv_P2Z-5LU", trackNumber: 14},{title:"Havoc - Be There (Instrumental)", youtubeCode:"6EWIawHfMZM", trackNumber: 13},{title:"Piero Umiliani - Atmosphere", youtubeCode:"3XdT2ZEC3Go", trackNumber: 12},{title:"Twin Sister - 'Daniel' (Live at WFUV)", youtubeCode:"jkPAeOpLSrI", trackNumber: 11},{title:"Stevie Wonder - SuperWoman/Where Where You When I Needed You", youtubeCode:"0xxWBigyovY", trackNumber: 10},{title:"P Reign feat. Drake & Future - DnF (Explicit)", youtubeCode:"rtodyi12q-4", trackNumber: 9},{title:"Freddie Gibbs & Madlib - Piñata (FULL ALBUM)", youtubeCode:"98nUZ938oiU", trackNumber: 8 },{title:"2 Chainz - Dresser ft. Young Thug", youtubeCode:"s_u6RCIfe80", trackNumber: 7},{title:"Twin Sister - Daniel", youtubeCode:"lup_mAtL7zY", trackNumber: 6 },{title:"Twin Sister - Stop (Yours Truly Session)", youtubeCode:"QbjLa9vbZe0", trackNumber: 5 },{title:"Twin Sister - Lady Daydream", youtubeCode:"HohnlWnQPvs", trackNumber: 4 },{title:"Mr Twin Sister - Blush", youtubeCode:"nk4P03R3Hts", trackNumber: 3 },{title:"Twin Sister - All Around And Away We Go (2010)", youtubeCode:"3yn0PISCGpg", trackNumber: 2 },{title:"Freddie Gibbs & Madlib - Bomb (Official) - Piñata", youtubeCode:"X1h26SvybDw", trackNumber: 1 }]);

      var testVid = new YoutubeVideo({ youtubeCode: "1DlXyONrkjc", trackNumber: 20});
      testcollection.add(testVid);

      var playlistView = new YoutubeVideoCollectionView({ collection: testcollection, el: $(".playlist") });

      /* Event Dispatcher listeners */


      //this.listenTo(EventDispatcher, 'playNext', console.log("wow") );
      require(['utils/EventDispatcher'], function (EventDispatcher) {
          EventDispatcher.on('playerLoaded', function () {
            console.log("the player is loaded");
          });

          EventDispatcher.on('cueNextTrack', function () {
            var currentItem = testcollection.where({ currentTrack: true })[0];
            var currentIndex = testcollection.indexOf( currentItem );
            var nextTrack = testcollection.at( currentIndex+1);
            console.log("this is the currentIndex", currentIndex);
            if(currentIndex < testcollection.length - 1 ){
              currentItem.set('currentTrack', false);
              nextTrack.set('currentTrack', true);
              EventDispatcher.trigger('playTrack', nextTrack.get('youtubeCode') );
            }else{
              console.log("this is the end!");
            }

          });

          EventDispatcher.on('cuePrevTrack', function () {
            var currentItem = testcollection.where({ currentTrack: true })[0];
            var currentIndex = testcollection.indexOf( currentItem );
            var prevTrack = testcollection.at( currentIndex-1);

            // implement error handling here
            if(currentIndex != 0){
              console.log("not zero");
              currentItem.set('currentTrack', false);
              prevTrack.set('currentTrack', true);
              EventDispatcher.trigger('playTrack', prevTrack.get('youtubeCode') );
            }else{
              console.log("this is zero!");
            }

          });

          EventDispatcher.on('selectTrack', function (trackCode) {
            console.log("track code", trackCode);
            var currentItem = testcollection.where({ currentTrack: true })[0] ? testcollection.where({ currentTrack: true })[0] : null ;
            var selectedTrack = testcollection.where({ youtubeCode: trackCode })[0];

            console.log("selectedTrack",selectedTrack);
            if(currentItem){
              currentItem.set('currentTrack', false);
            }

            selectedTrack.set('currentTrack', true);

            EventDispatcher.trigger('playTrack', selectedTrack.get('youtubeCode') );
          });

          EventDispatcher.on('addTrack', function (value) {
            var trackNumber = (testcollection.at(testcollection.length - 1).get('trackNumber')) + 1;
            var newVid = new YoutubeVideo({ youtubeCode: value, trackNumber: trackNumber });
            testcollection.add(newVid);
            console.log("test collection", JSON.stringify(testcollection));
          });
      });

      YTPlayer.playVideo('player', testcollection.at(0).get('youtubeCode'));

      /* */

      testcollection.at(0).set('currentTrack', true);
      // testcollection.at(0).el.attr( "class", "currentVid" );

      var testItem = testcollection.where({ currentTrack: true })
      var testIndex = testcollection.indexOf( testItem );

      console.log("testItem", testItem);

      console.log("testIndex", testIndex);

      console.log(testcollection);

      // and be able to get the next and previous models

    }
  });
  return AppView;
});
