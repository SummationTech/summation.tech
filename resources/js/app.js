String.prototype.format = function () {
    var formattedString = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        formattedString = this.replace(reg, arguments[i]);
    }

    return formattedString;
};

// http://stackoverflow.com/questions/20644029/checking-if-a-div-is-visible-within-viewport-using-jquery
$.fn.isOnScreen = function(){
    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var STW = {
    activeItem: 'pray',
    setActiveNavItem: function(name) {
        if (this.activeItem === name) { return; }

        this.activeItem = name;
        console.log(name);
        $('.nav-button').removeClass('active');
        $('.nav-button.{0}'.format(name)).toggleClass('active');
    },
};

$(document).ready(function () {
    // Collapse the header when the user scrolls down the page.
    $(window).scroll(function () {
        var position = $(window).scrollTop();
        $('body').toggleClass('page-scrolled', position > 20);

        // Select the correct navigation button.
        var prayOnScreen = $('#pray').isOnScreen(),
            aboutOnScreen = $('#about').isOnScreen(),
            contactOnScreen = $('#contact').isOnScreen();

        if (contactOnScreen) {
            STW.setActiveNavItem('contact');
        } else if (aboutOnScreen) {
            STW.setActiveNavItem('about');
        } else {
            STW.setActiveNavItem('pray');
        }
    });

    // Automatically insert the correct copyright date.
    // TODO: This should be done on the server. Consider PHP.
    var now = new Date();
    if (now.getFullYear() > 2016) {
        $('.copyright-year').text('2016 - {0}'.format(now.getFullYear()));
    }

    // Smooth Scrolling
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top,
                    }, 1000);

                    return false;
                }
            }
        });
    });
});
