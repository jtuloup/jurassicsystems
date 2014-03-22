(function($) {

   var magicWord;

   // HTML5 audio element detection
   if (Modernizr.audio.mp3 || Modernizr.audio.wav || Modernizr.audio.ogg) {
      var magicWordHTML5 = $('<audio preload="auto"/>');

      magicWordHTML5.append('<source src="/snd/magicWord.mp3">');

      magicWord = {
         play: function() {
            magicWordHTML5[0].load();
            magicWordHTML5[0].play();
         }
      };

      magicWordHTML5.bind('ended', function() {
         magicWord.play();
      });

   }  else {
      sm.setup({
         url: '/swf/soundManager/',
         onready: function() {
            magicWord = sm.createSound({
               id: 'magicWord',
               autoLoad: true,
               url: '/snd/magicWord.mp3'
            });
         },
         onfinish: function() {
            sm.play('magicWord');
         }
      });
   }

   $(['theKingBlur.jpg',
      'macHDBlur.jpg',
      'macHDFocus.jpg']).each(function() {
         $('<img />')[0].src = '/img/' + this;
      });

   $('#the-king-window').draggable();

   $('#the-king-window').ready(function() {
      setTimeout(function() {
         $('#mac-hd-window').css('background-image', 'url(/img/macHDBlur.jpg)');
         $('#the-king-window').show();

         magicWord.play();

         if ($(window).width() < 1200) {
            setTimeout(function() {
               $('#home-key').css('z-index', '64000');
            }, 10000);
         }

      }, 2500);
   });

   var flicker = function(altId, interval, duration) {
      var visible = true,
          alt = $('#' + altId),
          flickering = setInterval(function() {
             if (visible) {
                alt.css('opacity', '1');
             } else {
                alt.css('opacity', '0');
             }

             visible = !visible;
          }, interval);

      setTimeout(function() {
         clearInterval(flickering);
         alt.css('opacity', '0');
      }, duration);
   }

   $('#apple-desktop').click(function(e){
      if (e.target.id !== 'the-king-window' && e.target.id !== 'king-animation') {
         flicker('the-king-blur', 50, 450);
      }
   });
}(jQuery));
