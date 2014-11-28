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

      var testcollection = new YoutubeVideoCollection([{youtubeCode:"mnE9UjyLnHs",trackNumber:1,title:"The Bacao Rhythm & Steel Band - P I M P",currentTrack:false},{youtubeCode:"YSPQfjgC8Os",trackNumber:2,title:"Two Tons O' Fun - Just Us",currentTrack:false},{youtubeCode:"eMQmzLFd7JU",trackNumber:3,title:"Double Exposure - My Love Is Free (12' Special Disco Mix)",currentTrack:false},{youtubeCode:"df0rlvjxl_A",trackNumber:4,title:"Meli'sa Morgan - Still In Love (House version)",currentTrack:false},{youtubeCode:"l4A_L6Bs0o8",trackNumber:5,title:"Made In U.S.A. - Melodies 1977",currentTrack:false},{youtubeCode:"6f_Ze-Ul0uo",trackNumber:6,title:"Benoit & Sergio - Not In Your Nature (Original Mix)",currentTrack:false},{youtubeCode:"bsWha6yoeWs",trackNumber:7,title:"Roberta Flack & Donny Hathaway - Back Together Again [Extended Version]",currentTrack:false},{youtubeCode:"Ho2LTuQBEV8",trackNumber:8,title:"Shintaro Sakamoto - You Just Decided (Official Video)",currentTrack:false},{youtubeCode:"3DvFnp00n9U",trackNumber:9,title:"Letta Mbulu - Nomalizo",currentTrack:false},{youtubeCode:"_g__PaW0ibQ",trackNumber:10,title:"SHARON REDD- NEVER GIVE YOU UP",currentTrack:false},{youtubeCode:"atc2_C-rW3s",trackNumber:11,title:"SZA - Julia / (Tender)",currentTrack:false},{youtubeCode:"s_8KR-n2fBQ",trackNumber:12,title:"Hall and Oates - Out of Touch",currentTrack:false},{youtubeCode:"GsBukS5mrQY",trackNumber:13,title:"Ecstasy, Passion & Pain - Touch and Go",currentTrack:false},{youtubeCode:"ISjyiI_sruI",trackNumber:14,title:"PAM TODD & LOVE EXCHANGE - LET'S GET TOGETHER",currentTrack:false},{youtubeCode:"E-xzoSzTZpY",trackNumber:15,title:"Loleatta Holloway - Hit And Run",currentTrack:false},{youtubeCode:"XKp3VdRSYkA",trackNumber:16,title:"Three degrees - Dirty old man",currentTrack:false},{youtubeCode:"yWtlrLvrWR0",trackNumber:17,title:"Salsoul Orchestra - You're just the right size",currentTrack:false},{youtubeCode:"6HH08x6Mkg8",trackNumber:18,title:"The Originals - Down To Love Town 1976 ( Disco )",currentTrack:false},{youtubeCode:"1DlXyONrkjc",trackNumber:20,title:"Teedra Moses - Be Your Girl",currentTrack:false},{youtubeCode:"CIU66esH3js",trackNumber:25,title:"Mc Lyte - Everyday",currentTrack:false},{youtubeCode:"S8K31tTV554",trackNumber:26,title:"Spice 1 - Welcome To The Ghetto",currentTrack:false},{youtubeCode:"a4u8WPX7JZU",trackNumber:27,title:"If This World Were Mine - Marvin Gaye & Tammi Terrell",currentTrack:false},{youtubeCode:"2RpkXyhbMLA",trackNumber:28,title:"Royce Da 5'9 - Let's Grow",currentTrack:false},{youtubeCode:"7O_l7O4PpDI",trackNumber:29,title:"Zé Rodrix - Xamego Da Nega.",currentTrack:false},{youtubeCode:"JBXfyCXlzz0",trackNumber:30,title:"Frankie Knuckles Live From the Warehouse Chicago in 1977",currentTrack:false},{youtubeCode:"JBXfyCXlzz0",trackNumber:30,title:"Frankie Knuckles Live From the Warehouse Chicago in 1977",currentTrack:false},{youtubeCode:"UxPEmLu1-Go",trackNumber:31,title:"DJ Screw - Stressed Out (Side A & B)",currentTrack:false},{youtubeCode:"GmKjTC8yDFM",trackNumber:32,title:"Chingy Featuring Ludacris And Snoop Dogg - Holidae In",currentTrack:false},{youtubeCode:"avFq9errZCk",trackNumber:33,title:"ILOVEMAKONNEN (FEAT. DRAKE) - TUESDAY",currentTrack:false},{youtubeCode:"CkROyQ4mCtQ",trackNumber:34,title:"iLoveMakonnen - Maneuvering [prod. Metro Boomin]",currentTrack:false},{youtubeCode:"Ljd7h8ovEow",trackNumber:35,title:"ILOVEMAKONNEN - I DONT SELL MOLLY NO MORE",currentTrack:false},{youtubeCode:"j1T_NGBlr0Q",trackNumber:36,title:"Dej Loaf - Try Me / We Good | Shot by @JerryPHD",currentTrack:false},{youtubeCode:"CRoeRt54IWM",trackNumber:37,title:"Yung Lean - Motorola",currentTrack:false},{youtubeCode:"tMgkt9jdjTU",trackNumber:38,title:"Yung Lean - Kyoto",currentTrack:false},{youtubeCode:"vrQWhFysPKY",trackNumber:39,title:"Yung Lean ♦ Ginseng Strip 2002 ♦",currentTrack:false},{youtubeCode:"OvN9YwiveXc",trackNumber:40,title:"Lady - Yankin (Prod. by WMGI/BC)",currentTrack:false},{youtubeCode:"TUj0otkJEBo",trackNumber:41,title:"Ty Dolla $ign - Or Nah ft. The Weeknd, Wiz Khalifa & DJ Mustard [Music Video]",currentTrack:false},{youtubeCode:"fZapGyzIwvE",trackNumber:42,title:"~ Yung Lean - 5th Element ~",currentTrack:false},{youtubeCode:"nGt_JGHYEO4",trackNumber:43,title:"Rich Gang - Lifestyle ft. Young Thug, Rich Homie Quan",currentTrack:false},{youtubeCode:"etfIdtm-OC8",trackNumber:44,title:"T.I. - About The Money ft. Young Thug",currentTrack:false},{youtubeCode:"qdsTUfDTEhQ",trackNumber:45,title:"T.I. - No Mediocre (Explicit) ft. Iggy Azalea",currentTrack:false},{youtubeCode:"ILCNAln_7Z4",trackNumber:46,title:"Trick Daddy - I'm A Thug (Video Version)",currentTrack:false},{youtubeCode:"6GXfDyLlTWs",trackNumber:47,title:"Trick Daddy - In Da Wind (ft. Cee-Lo & Big Boi)  HD [Dirty]",currentTrack:false},{youtubeCode:"_iTfoFLz5nA",trackNumber:48,title:"DJ DMD ft. Lil' Keke & Fat Pat - 25 Lighters",currentTrack:false},{youtubeCode:"WYTBsN-KeNE",trackNumber:49,title:"Mike Jones Feat. Slim Thug & Paul Wall - Still Tippin' (HQ / Dirty)",currentTrack:false},{youtubeCode:"Sd0S0LwhEDU",trackNumber:50,title:"Mike Jones - Back Then (Video)",currentTrack:false},{youtubeCode:"SfPLcQhXpCc",trackNumber:51,title:"Paul Wall - Sittin' Sidewayz (Nice Quality)",currentTrack:false},{youtubeCode:"yWRvko4vvk4",trackNumber:52,title:"EAZY-E - Boyz in the Hood (Official video)",currentTrack:false},{youtubeCode:"RwPMKozHPCM",trackNumber:53,title:"Eazy E - Boyz N' Tha Hood",currentTrack:false},{youtubeCode:"jgh10of6DKA",trackNumber:54,title:"Raekwon - Ice Cream",currentTrack:false},{youtubeCode:"WWMjRMJ0dTI",trackNumber:55,title:"Big L - Put It On",currentTrack:false},{youtubeCode:"e_GM6w4MZww",trackNumber:56,title:"Ill Al Skratch - I'll Take Her ft. Brian McKnight",currentTrack:false},{youtubeCode:"0AOVf9p9ht4",trackNumber:57,title:"Set Adrift On Memory Bliss  -  PM Dawn  (HQ Audio)",currentTrack:false},{youtubeCode:"okBgAWW6wUU",trackNumber:58,title:"Bone Thugs N Harmony - Resurrection (Paper, Paper)",currentTrack:false},{youtubeCode:"muAt4evb7Sk",trackNumber:59,title:"P.M. Dawn - Set Adrift On Memory Bliss (16:9 HD) /1991/",currentTrack:false},{youtubeCode:"okBgAWW6wUU",trackNumber:60,title:"Bone Thugs N Harmony - Resurrection (Paper, Paper)",currentTrack:false},{youtubeCode:"3s9pYcTPrqM",trackNumber:61,title:"Bone Thugs N Harmony & Phil Collins - Home",currentTrack:false},{youtubeCode:"-ZTLgRn6uBk",trackNumber:62,title:"Bone Thugs ft. Phil Collins - Home (by All3yB)",currentTrack:false},{youtubeCode:"fLCf-URqIf0",trackNumber:63,title:"A$AP Rocky - Goldie",currentTrack:false},{youtubeCode:"liZm1im2erU",trackNumber:64,title:"A$AP ROCKY - F**kin' Problems ft. Drake, 2 Chainz, Kendrick Lamar",currentTrack:false},{youtubeCode:"pV4ZUbXRltM",trackNumber:65,title:"Juicy J - Talkin' Bout ft. Chris Brown, Wiz Khalifa",currentTrack:false},{youtubeCode:"oSMegJ6oXfU",trackNumber:66,title:"Drake - Trophies (Explicit Version)",currentTrack:false},{youtubeCode:"wzMrK-aGCug",trackNumber:67,title:"Rae Sremmurd - No Type",currentTrack:false},{youtubeCode:"Ij6eAxkn5Rw",trackNumber:68,title:"Royce Rizzy - Gah Damn (Explicit) ft. Jermaine Dupri, K Camp, Twista, Lil Scrappy",currentTrack:false},{youtubeCode:"HwctEiWLe84",trackNumber:69,title:"Chris Brown feat. Usher & Rick Ross - New Flame (Explicit Version)",currentTrack:false},{youtubeCode:"FTYtsvuur6s",trackNumber:70,title:"Rick Ross - Supreme (Explicit)",currentTrack:false},{youtubeCode:"IhEIWaZQKqs",trackNumber:71,title:"Un homme et une femme (1966) Bande Originale Soundtrack - Francis Lai",currentTrack:false},{youtubeCode:"eqtqIBSMjkw",trackNumber:72,title:"Evinha- Esperar pra ver",currentTrack:false},{youtubeCode:"sc7OgcUr-NE",trackNumber:73,title:"Isaiah Rashad - Soliloquy",currentTrack:false},{youtubeCode:"9vp3jOtPfxQ",trackNumber:75,title:"Jake One - Stimulus Outro (Instrumental)",currentTrack:false},{youtubeCode:"D3NoKFmBN9Y",trackNumber:76,title:"Kanye West - Theraflu (Official Instrumental) *HQ Mastered*",currentTrack:false},{youtubeCode:"EGirm0smtLo",trackNumber:77,title:"Ahmad Jamal - No Greater Love",currentTrack:false},{youtubeCode:"K4Rx4gbMN08",trackNumber:78,title:"Mark Gonzales \"Video Days\" Blind (1991)",currentTrack:false},{youtubeCode:"4aksf8gcLNE",trackNumber:79,title:"ITS A SECRET CHRIS MILIC",currentTrack:false},{youtubeCode:"MY8AQ5TpYDs",trackNumber:80,title:"Mike York - Chocolate - Las Nueve Vidas De Paco",currentTrack:false},{youtubeCode:"CF3lRjN8_MQ",trackNumber:81,title:"Keenan Milton - Las Nueve Vidas De Paco",currentTrack:false},{youtubeCode:"2oqfHD59PDE",trackNumber:82,title:"Gabriel Rodriguez - Chocolate- Las Nueve Vidas De Paco",currentTrack:false},{youtubeCode:"CfbGx9Zd9ig",trackNumber:84,title:"The DC Video - Stevie Williams - HD",currentTrack:false},{youtubeCode:"rxiWPXC3Qmg",trackNumber:85,title:"Josh Kalis - Alien Workshop Photosynthesis",currentTrack:false},{youtubeCode:"VB30F1cuZm8",trackNumber:86,title:"Stevie Williams - Transworld Skateboarding The Reason '99",currentTrack:false},{youtubeCode:"Z-AdmyjC1JE",trackNumber:87,title:"Mike Carroll in TWS - 'Modus Operandi' [2000]",currentTrack:false},{youtubeCode:"TQU10wApsBQ",trackNumber:88,title:"Antwuan Dixon part from baker 3",currentTrack:false},{youtubeCode:"ra7tUWp7wHo",trackNumber:89,title:"TV GIRL - On Land",currentTrack:false},{youtubeCode:"EY6sWifUbrI",trackNumber:90,title:"Shintaro Sakamoto -- \"You Can Be A Robot, Too (feat Kamome Children's Choir)\" (OFFICIAL VIDEO)",currentTrack:false},{youtubeCode:"RPVAipmV7jY",trackNumber:91,title:"Badly Drawn Boy -  'Once Around The Block'",currentTrack:false},{youtubeCode:"IuGO6WHcruU",trackNumber:92,title:"Tycho - \"Hours\"",currentTrack:false},{youtubeCode:"_R2E8MdYkag",trackNumber:93,title:"50 Cent - Piggy Bank - HQ",currentTrack:false},{youtubeCode:"7sdvjhMGoJk",trackNumber:94,title:"Young Thug - Old English Feat. A$AP Ferg & Freddie Gibbs [ Explicit ]",currentTrack:false},{youtubeCode:"mehLx_Fjv_c",trackNumber:95,title:"Tycho - A Walk",currentTrack:false},{youtubeCode:"Yd4ZU7kWLQE",trackNumber:96,title:"andhim - Hausch (Dürerstuben Remix Alenoise feat. Annabelle)",currentTrack:false},{youtubeCode:"CjKXWFqax_Y",trackNumber:97,title:"Onra - Gonna Make You Mine",currentTrack:false},{youtubeCode:"4Ga93sYZG6w",trackNumber:98,title:"Rome Fortune - \"Ice Cream Man\" (Official Video)",currentTrack:false},{youtubeCode:"4fFM7KFeZGQ",trackNumber:99,title:"Majid Jordan - Hold Tight",currentTrack:false},{youtubeCode:"Kl0mtyPe7mw",trackNumber:100,title:"01 Chris Watson & BJNilsen - No Man's Land [Touch]",currentTrack:false},{youtubeCode:"fcv0X4PL2vw",trackNumber:101,title:"Helen Merrill & Piero Umiliani - \"My Only Man\" from \"Smog\", 1962",currentTrack:false},{youtubeCode:"GOhjaIQ7k18",trackNumber:102,title:"Mavis John - Use My Body",currentTrack:false},{youtubeCode:"aD0utb8kuWc",trackNumber:103,title:"Cléa Vincent - Château Perdu",currentTrack:false},{youtubeCode:"cVTiXadH4VY",trackNumber:104,title:"Pupkulies & Rebecca - Juvinal",currentTrack:false},{youtubeCode:"niqbNwG4B3M",trackNumber:105,title:"Christophe - The Girl From Salina",currentTrack:false},{youtubeCode:"FIs3uZ49Oy4",trackNumber:107,title:"Shamir - If It Wasn't True - GODMODE [Official Music Video]",currentTrack:false},{youtubeCode:"t_3OO7CIDlk",trackNumber:108,title:"Silk Rhodes - Face 2 Face",currentTrack:false},{youtubeCode:"F-2uG2QWWy0",trackNumber:109,title:"Tender Games - In A Mess (Original Mix)",currentTrack:false},{youtubeCode:"NrgcRvBJYBE",trackNumber:110,title:"Noir Désir - Le Vent Nous Portera",currentTrack:false},{youtubeCode:"FnjjdigQMys",trackNumber:111,title:"paqua - we came far",currentTrack:false},{youtubeCode:"M1LQHVpcnJE",trackNumber:112,title:"Deadstock 33's - Drifting On a Wave (The Mainstem Remix)  [Is It Balearic - IIBCOM 001]",currentTrack:false},{youtubeCode:"29pKNr8eMHY",trackNumber:113,title:"Empty Walls - Marie-Flore",currentTrack:false},{youtubeCode:"I__9yvyFB4o",trackNumber:114,title:"Hauschka - Wind",currentTrack:false},{youtubeCode:"kWkfhVZbbyo",trackNumber:115,title:"CTM - Elsa Palma",currentTrack:true},{youtubeCode:"MxcA5yyR5rc",trackNumber:116,title:"Hanni El Khatib - Nobody Move",currentTrack:false},{youtubeCode:"CG5kfIfNC6M",trackNumber:117,title:"Navid Izadi - Last Song of the Dance ( Tanner Ross & Deniz Kurtel remix ) [feat. PillowTalk]",currentTrack:false},{youtubeCode:"-18J8lGJeLo",trackNumber:118,title:"Blood Orange - Time Will Tell",currentTrack:false},{youtubeCode:"nO6y1-erVEw",trackNumber:119,title:"",currentTrack:false}]);

      // var testcollection = new YoutubeVideoCollection([{youtubeCode:"l4A_L6Bs0o8", trackNumber:5, title:"Made In U.S.A. - Melodies 1977", currentTrack:false},{youtubeCode:"eMQmzLFd7JU", trackNumber:3, title:"Double Exposure - My Love Is Free (12' Special Disco Mix)", currentTrack:false},{youtubeCode:"df0rlvjxl_A", trackNumber:4, title:"Meli'sa Morgan - Still In Love (House version)", currentTrack:false},{youtubeCode:"CIU66esH3js", trackNumber:25, title:"Mc Lyte - Everyday", currentTrack:false},{youtubeCode:"S8K31tTV554", trackNumber:26, title:"Spice 1 - Welcome To The Ghetto", currentTrack:false},{youtubeCode:"a4u8WPX7JZU", trackNumber:27, title:"If This World Were Mine - Marvin Gaye & Tammi Terrell", currentTrack:false},{youtubeCode:"2RpkXyhbMLA", trackNumber:28, title:"Royce Da 5'9 - Let's Grow", currentTrack:false},{youtubeCode:"7O_l7O4PpDI", trackNumber:29, title:"Zé Rodrix - Xamego Da Nega.", currentTrack:false}, {youtubeCode:"JBXfyCXlzz0", trackNumber:30, title:"Frankie Knuckles Live From the Warehouse Chicago in 1977", currentTrack:false},{youtubeCode:"UxPEmLu1-Go", trackNumber:31, title:"DJ Screw - Stressed Out (Side A & B)", currentTrack:false}, {youtubeCode:"YSPQfjgC8Os",trackNumber:2,title:"Two Tons O' Fun - Just Us","currentTrack":false},{youtubeCode:"JBXfyCXlzz0",trackNumber:30,title:"Frankie Knuckles Live From the Warehouse Chicago in 1977","currentTrack":false},{youtubeCode:"GsBukS5mrQY",trackNumber:13,title:"Ecstasy, Passion & Pain - Touch and Go","currentTrack":false},{youtubeCode:"ISjyiI_sruI",trackNumber:14,title:"PAM TODD & LOVE EXCHANGE - LET'S GET TOGETHER","currentTrack":false},{youtubeCode:"E-xzoSzTZpY",trackNumber:15,title:"Loleatta Holloway - Hit And Run","currentTrack":false},{youtubeCode:"XKp3VdRSYkA",trackNumber:16,title:"Three degrees - Dirty old man","currentTrack":false},{youtubeCode:"yWtlrLvrWR0",trackNumber:17,title:"Salsoul Orchestra - You're just the right size","currentTrack":false},{youtubeCode:"6HH08x6Mkg8",trackNumber:18,title:"The Originals - Down To Love Town 1976 ( Disco )","currentTrack":false},{youtubeCode:"bsWha6yoeWs",trackNumber: 7,title:"Roberta Flack & Donny Hathaway - Back Together Again [Extended Version]","currentTrack":false},{youtubeCode:"6f_Ze-Ul0uo",trackNumber:6,title:"Benoit & Sergio - Not In Your Nature (Original Mix)","currentTrack":false},{youtubeCode:"Ho2LTuQBEV8",trackNumber:8,title:"Shintaro Sakamoto - You Just Decided (Official Video)","currentTrack":false},{youtubeCode:"3DvFnp00n9U",trackNumber:9,title:"Letta Mbulu - Nomalizo","currentTrack":false},{youtubeCode:"_g__PaW0ibQ",trackNumber:10,title:"SHARON REDD- NEVER GIVE YOU UP","currentTrack":false},{youtubeCode:"atc2_C-rW3s",trackNumber:11,title:"SZA - Julia / (Tender)","currentTrack":false},{youtubeCode:"s_8KR-n2fBQ",trackNumber:12,title:"Hall and Oates - Out of Touch","currentTrack":false},{youtubeCode:"mnE9UjyLnHs",trackNumber: 1,title:"The Bacao Rhythm & Steel Band - P I M P","currentTrack":true}]);



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
