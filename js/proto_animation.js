// Easing excerpt from George McGinley Smith 
// http://gsgd.co.uk/sandbox/jquery/easing/
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

var duration = 3000;

$( 'body' ).keypress(function() {  

    function SVG(tag) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }

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
                progress: function() {
                    $('.outline').css({
                        'width': 0.5 * $('#animation_container').width() + 'px',
                        'marginLeft': 0.25 * $('#animation_container').width() + 'px'
                    });
                },
                complete: function() {
                   $(this).fadeOut('slow');
                }
            });
        });
    }

    function fillSVG(_parentElement, _duration, _timeDelay) {
        var paths = _parentElement.find('path');
        /*
            I need to draw the blue square last, so it appears in front of the other square,
            but I want to fade in the blue square first. So run through the 
            paths backwards but apply the delay in the opposite order (a linear count ++)
        */
        var count = 0;
        for (var i = paths.length - 1; i >= 0; i--) {
            $(paths[i]).delay(_duration + (_timeDelay*count)).animate({
                'opacity': 1,
                'width': 0.5 * $('#animation_container').width() + 'px',
                'marginLeft': 0.25 * $('#animation_container').width() + 'px'
            }, {
                duration: _duration,
                easing: 'easeInOutQuad', 
            });
            count++;
        };
    }

    //animate the logo
    drawSVGPaths($('.outline'), duration, 500);
    fillSVG($('.fill'), 800, 400);
    //animate the logo words
    $('#animation_container img').delay(800).animate({
        'opacity': 1
    }, {
        duration: duration,
        easing: 'easeInOutQuad', 
        progress: function() {
            $('.fill').css({
                'width': 0.5 * $('#animation_container').width() + 'px',
                'marginLeft': -0.5 * $('#animation_container').width() + 'px'
            });
        }
    });

    //ANIMATE THE CONTAINER
    $('#animation_container').animate({
        'width': 0.4 * $(window).width() + 'px',
        'marginLeft': 0.3 * $(window).width() + 'px',
        'marginTop': 0.15 * $(window).height() + 'px'
    }, 2300, 'easeInOut', function() {
        //$('.animation_wrapper').delay(1000).fadeOut('slow');
    });

    //on initial load sometime you see a brief flash of svg's 
    //so we keep everything invisible until evervthing is set in motion
    $('#animation_container').css('visibility', 'visible');
});