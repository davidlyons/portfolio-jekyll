
(function() {

	var $grid = $('.row').masonry({
		itemSelector: '.col-6',
		columnWidth: '.col-6',
		percentPosition: true
	});

	$grid.imagesLoaded().progress( function() {
		$grid.masonry('layout');
	});

})();