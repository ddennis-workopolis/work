(function($) {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.seeker-link').fadeOut(500);
        }
    });

    $(document).ready(function() {

        // Hiding div when the .close is clicked.
        $('.close').click(function() {
            $('.chat-now').css('display', 'none');
        })

        var clock = $('.counter').FlipClock(65000, {
            clockFace: 'Counter'
        });

        setTimeout(function() {
            setInterval(function() {
                clock.increment();
            }, 2000);
        });

        // Showing links for posts with tags containing 'attract'
        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=attract',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
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
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=attract+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.attract-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        // Showing links for posts with tags containing 'develop'
        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=develop',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.develop').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=develop+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.develop-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        // Showing links for posts with tags containing 'retain'
        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=retain',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.retain').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=retain+whitepaper',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.retain-whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });

        // Sidebar filter for whitepapers, guides, ebooks
        $.ajax({
            url: 'http://127.0.0.1/wordpress/workopolis/wp-json/wp/v2/posts/?filter[tag]=whitepaper,guides,ebooks',
            data: {
                filter: {
                    'posts_per_page': 4
                }
            },
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                // On success, display the data
                console.log(data);
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                        $('.whitepaper').append('<div class="title"><a href="' + data[key].link + '">'+ data[key].title.rendered + '</a></div>');
                    }
                }
            },
            error: function() {
                // error code
                console.log("error");
            }
        });
    });

})(jQuery);
