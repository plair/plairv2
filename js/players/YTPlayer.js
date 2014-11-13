define([
 'jquery',
 'utils/EventDispatcher'
], function(
 $,
 EventDispatcher
) {
 var player = null;
 var YTPlayer = {
   playVideo: function (container, videoId) {
     if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
       window.onYouTubeIframeAPIReady = function() {
         YTPlayer.loadPlayer(container, videoId);
       };

       $.getScript('https://www.youtube.com/iframe_api');
     } else {
       YTPlayer.loadPlayer(container, videoId);
     }
   },

   loadPlayer: function (container, videoId) {
     player = new YT.Player(container, {
       videoId: videoId,
       width: '640',
       height: '390',
       events: {
         'onReady': function() {
           EventDispatcher.trigger('playerLoaded');
           $('li.youtube-item').click(function(){
              var currentVid = $('li.currentVid');
              var nextCode = $(this).data("youtube");
              $(this).addClass("currentVid");
              currentVid.removeClass("currentVid");
              YTPlayer.cueVideoWithId(nextCode);
              YTPlayer.startPlayback();
            });

            $('button.next').click(function(){
              var currentVid = $('li.currentVid');
              var nextCode = currentVid.next().data("youtube");
              console.log( "nextCode", nextCode);
              // player.cueVideoById({videoId: nextCode});
              currentVid.next().addClass("currentVid");
              currentVid.removeClass("currentVid");
              YTPlayer.cueVideoWithId(nextCode);
              YTPlayer.startPlayback();
            });

            $('button.prev').click(function(){
              var currentVid = $('li.currentVid');
              var nextCode = currentVid.prev().data("youtube");
              YTPlayer.cueVideoWithId(nextCode);
              currentVid.prev().addClass("currentVid");
              currentVid.removeClass("currentVid");
              YTPlayer.startPlayback();
            });
         },
          'onStateChange': function(){
            if(YTPlayer.getPlayerState() === 0){
              var currentVid = $('li.currentVid');
              var nextCode = currentVid.next().data("youtube");
              currentVid.next().addClass("currentVid");
              currentVid.removeClass("currentVid");
              YTPlayer.cueVideoWithId(nextCode);
              YTPlayer.startPlayback();
            }
          }
       }
     });
   },

   /** All of the following are shims of YouTube's JavaScript API.
    *  For more info see: https://developers.google.com/youtube/iframe_api_reference
    *  The view should check for the 'playerLoaded' event
    *  from the EventDispatcher. */
   getTime: function () {
     if (player) {
       player.getCurrentTime();
     }
   },

   seekTo: function (seconds, allowSeekAhead) {
     if (player) {
       player.seekTo(seconds, allowSeekAhead);
     }
   },

   cueVideoWithId: function (videoId) {
     if (player) {
       player.cueVideoById({videoId: videoId});
     }
   },

   startPlayback: function(){
    if (player) {
       player.playVideo();
     }
   },

   getPlayerState: function () {
     if (player) {
       player.getPlayerState();
     }
   },
 };

 return YTPlayer;
});
