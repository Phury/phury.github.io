// fade effects
var toFade = $('a.to-top');
toFade.delay(3000).fadeTo('slow', 0.2);
toFade.on({
	mouseenter: function () {
		toFade.fadeTo('fast', 1);
	},
	mouseleave: function () {
		toFade.fadeTo('fast', 0.2);
	}
});

var lastId = "",
	scrollItems = $('h3[id]');

// Bind to scroll
$(window).scroll(function(){
	// Get container scroll position
	var fromTop = $(this).scrollTop() + 50;

	// Get id of current scroll item
	var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop) {
			return $(this);
		}
	});
	// Get the id of the current element
	cur = cur[cur.length-1];
	var id = cur && cur.length ? cur[0].id : "";

	if (lastId !== id) {
		lastId = id;
		$('a[href^="#"]').parent().removeClass('active');
		$('a[href="#'+id+'"]').parent().toggleClass('active');
	}
});


/* smooth scroll */
$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
	}, 500);
});
