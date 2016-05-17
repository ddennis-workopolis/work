(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.seeker-link').fadeOut(500);
        }
    });
})(jQuery);
