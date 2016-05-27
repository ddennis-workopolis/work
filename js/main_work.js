(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.seeker-link').fadeOut(500);
        }
    });

    $(document).ready(function() {
        var clock = $('.counter').FlipClock(65000, {
            clockFace: 'Counter'
        });

        var count = 0;

        setTimeout(function() {
            setInterval(function() {
                clock.increment();
            }, 3000);
        });

    });

// Remove Odometer
    setTimeout(function(){
        odometer.innerHTML = 65100;
    }, 1000);

})(jQuery);
