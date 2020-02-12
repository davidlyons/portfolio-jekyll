(function() {

	var options = {
		delegate: 'a',
		type: 'image',
		image: {
			cursor: null,
			titleSrc: 'title'
		},
		gallery: {
			enabled: true,
			preload: [0,1], // Will preload 0 - before current, and 1 after the current image
			navigateByImgClick: true,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% mfp-chevron"><i class="fas fa-chevron-right fa-3x mfp-prevent-close"></i></button>'
		},
		//http://dimsemenov.com/plugins/magnific-popup/documentation.html#iframe-type
		iframe: {
			patterns: {
				sketchfab: {
					index: 'sketchfab.com', // String that detects type of embed, via url.indexOf(index)
					id: 'models/', // String that splits URL into two parts, second part should be %id%
					src: 'https://sketchfab.com/models/%id%/embed' // URL that will be set as source for iframe
				}
			}
		},
		callbacks: {
			open: function() {
				$('body').addClass('lightbox');
			},
			close: function() {
				$('body').removeClass('lightbox');
			}
		}
	};

	$('.gallery').magnificPopup(options);

	$('.gallery-separate').each(function(){
		$(this).magnificPopup(options);
	});

})();