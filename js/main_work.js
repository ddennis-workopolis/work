(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.seeker-link').fadeOut(500);
        }
    });
})(jQuery);
