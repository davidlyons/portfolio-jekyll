(function () {
  var options = {
    // delegate: 'a',
    type: 'image',
    image: {
      cursor: null,
      titleSrc: 'title',
    },
    gallery: {
      enabled: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      navigateByImgClick: true,
      arrowMarkup: `<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% mfp-chevron">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chevron-right mfp-prevent-close" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>`,
    },
    //http://dimsemenov.com/plugins/magnific-popup/documentation.html#iframe-type
    iframe: {
      patterns: {
        sketchfab: {
          index: 'sketchfab.com', // String that detects type of embed, via url.indexOf(index)
          id: 'models/', // String that splits URL into two parts, second part should be %id%
          src: 'https://sketchfab.com/models/%id%/embed', // URL that will be set as source for iframe
        },
      },
    },
    callbacks: {
      open: function () {
        $('html').addClass('lightbox');
      },
      close: function () {
        $('html').removeClass('lightbox');
      },
    },
  };

  $('.home-grid .mfp').magnificPopup(options);

  $('.gallery').magnificPopup({ ...options, delegate: 'a' });

  $('.gallery-separate').each(function () {
    $(this).magnificPopup({ ...options, delegate: 'a' });
  });
})();
