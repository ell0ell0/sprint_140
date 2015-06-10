$( document ).ready(function() {
	var play = false;

	jQuery.extend( jQuery.easing,
	{
	    easeInOutQuad: function (x, t, b, c, d) {
	        if ((t/=d/2) < 1) return c/2*t*t + b;
	        return -c/2 * ((--t)*(t-2) - 1) + b;
	    },
	    easeInOut: function (x, t, b, c, d) {
	        return jQuery.easing.easeInOutQuad(x, t, b, c, d);
	    }
	});


	drawSVGPaths($('#outlines'), 250, 50);
	$('#outlines').fadeIn('slow');
	play = true;


	function drawSVGPaths(_parentElement, _duration, _timeDelay) {
        var paths = $(_parentElement).find('path');
        //for each PATH..
        $.each( paths, function(i) {
            //get the total length
            var totalLength = this.getTotalLength();
            //set PATHs to invisible
            $(this).css({
                'stroke-dashoffset': totalLength,
                'stroke-dasharray': totalLength + ' ' + totalLength
            });

            $(this).delay(_timeDelay*i).animate({
                'stroke-dashoffset': 0
            }, {
                duration: _duration,
                easing: 'easeInOutQuad',
                complete: function() {
                   $(this).attr('fill', $(this).attr('stroke')).fadeIn('slow');
                }
            });
        });
    }

});