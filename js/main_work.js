(function($) {

    //Makes a cookie
    function createCookie(name, value, days) {
    	if (days) {
    		var date = new Date();
    		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    		var expires = "; expires=" + date.toGMTString();
    	}
    	else var expires = "";
    	document.cookie = name + "=" + value + expires + "; path=/";
    }
    //Observer for Source Sans Pro with each font-weight used declared
    var observer = new FontFaceObserver('Gotham', {
    	weight: 400,
    	weight: 600,
    	weight: 700
    });

    	if (document.cookie.indexOf("fonts-loaded") < 0) {
    		console.log('All of your fonts are ready');
    		document.documentElement.className += " fonts-loaded";
    		//set the cookie to expire in two weeks
    		createCookie("fonts-loaded", "true", "14");
    	}

    var height;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.seeker-link').fadeOut(500);
        }

        if(($('#header-secondary-outer').css('display') === 'none')) {
            var moveTop = document.getElementById('header-outer').style.marginTop;
            console.log(moveTop);
            var marginTop = moveTop - height;
            $('#header-outer').css('margin-top', marginTop);
        }

        if(($(window).width()) <= 1000 && ($(this).scrollTop() === 0)) {
            var moveTop = document.getElementById('header-outer').style.marginTop;
            console.log(moveTop);
            var marginTop = moveTop - height;
            $('#header-outer').css('margin-top', marginTop);
        }
    });

    $(document).ready(function() {

        $('.newsletter-button').click(function() {

            var emailRegex = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?";

            var name = $(this).closest('tr').siblings('tr').find('.name').val();
            console.log(name);
            var email = $(this).closest('tr').siblings('tr').find('.email').val();
            if( (email.length > 0 && !email.match(emailRegex)) || email.length <= 0 || name.length <= 0) {
                event.preventDefault();
                $(this).closest('form').addClass('input-validation-error').removeClass('valid');
            } else {
                $(this).closest('form').removeClass('input-validation-error').addClass('valid');
            }
        });

        $('form').one('submit', function() {
            $(this).find('button').attr('disabled','disabled');
        });

        // Hiding div when the .close is clicked.
        $('.close').click(function() {
            $('.chat-now').css('display', 'none');
        });

        // Display system messages at the very top of the web page
        $('.system-messages-close').click(function() {
            height = $('#header-secondary-outer').height();
            var moveTop = $('#header-outer').position().top;
            $('#header-secondary-outer').css('display', 'none');
            $('#header-outer').css({top: moveTop - height});
        });

        var clock = $('.counter').FlipClock(65000, {
            clockFace: 'Counter'
        });

        setTimeout(function() {
            setInterval(function() {
                clock.increment();
            }, 2000);
        });

        var customUrl = 'hiring.workopolis.com'; // production environment

        // tags - attraction, development, retention
        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=attraction',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.attract').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=attraction+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.attract-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        // Showing links for posts with tags containing 'development'
        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=development',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.develop').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=development+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.develop-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        // Showing links for posts with tags containing 'retain'
        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=retention',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.retain').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=retention+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.retain-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        // Sidebar filter for whitepapers, guides, ebooks
        $.ajax({
            url: 'http://' + customUrl + '/wp-json/wp/v2/posts/?filter[tag]=whitepaper,guides,ebooks',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });
        // English articles end

        // tags - attirez, perfectionnez, gardez
        $.ajax({
            url: 'http://' + customUrl + '/fr/wp-json/wp/v2/posts/?filter[tag]=attirez',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.attirez').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://' + customUrl + '/fr/wp-json/wp/v2/posts/?filter[tag]=perfectionnez',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.perfectionnez').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://' + customUrl + '/fr/wp-json/wp/v2/posts/?filter[tag]=gardez',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.gardez').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                console.log("error");
            }
        });
    });

})(jQuery);
