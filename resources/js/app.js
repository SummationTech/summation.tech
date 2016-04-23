String.prototype.format = function () {
    var formattedString = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        formattedString = this.replace(reg, arguments[i]);
    }

    return formattedString;
};

// http://stackoverflow.com/questions/20644029/checking-if-a-div-is-visible-within-viewport-using-jquery
$.fn.isOnFullyScreen = function() {
    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (bounds.right <= viewport.right && bounds.left >= viewport.left && bounds.top >= viewport.top && bounds.bottom <= viewport.bottom);
};

var STW = {
    activeItem: 'pray',
    setActiveNavItem: function (name) {
        if (this.activeItem === name) { return; }

        this.activeItem = name;
        $('.nav-button').removeClass('active');
        $('.nav-button.{0}'.format(name)).toggleClass('active');
    },

    smoothScrollElIntoView: function (el) {
        console.log(el);
        window.el = el;

        console.log(el.outerHeight());
        $('html, body').animate({
            // TODO: Kinda hackish with the + 34, but it works for now.
            scrollTop: (el.offset().top + el.outerHeight()) - window.innerHeight,
        }, 1000);
    },
};

$(document).ready(function () {
    // Collapse the header when the user scrolls down the page.
    $(window).scroll(function () {
        var position = $(window).scrollTop();
        $('body').toggleClass('page-scrolled', position > 20);

        // Select the correct navigation button.
        var prayOnScreen = $('#pray').isOnFullyScreen(),
            featuresOnScreen = $('#features').isOnFullyScreen(),
            inspirationOnScreen = $('#inspiration').isOnFullyScreen();

        if (prayOnScreen && !featuresOnScreen || window.scrollY === 0) {
            STW.setActiveNavItem('pray');
        } else if (featuresOnScreen && !inspirationOnScreen) {
            STW.setActiveNavItem('features');
        } else if (inspirationOnScreen) {
            STW.setActiveNavItem('inspiration');
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
                    STW.smoothScrollElIntoView(target);
                    return false;
                }
            }
        });
    });
});
