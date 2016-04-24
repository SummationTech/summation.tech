String.prototype.format = function() {
    var formattedString = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        formattedString = this.replace(reg, arguments[i]);
    }

    return formattedString;
};

// http://stackoverflow.com/questions/20644029/checking-if-a-div-is-visible-within-viewport-using-jquery
$.fn.isOnScreen = function() {
    var win = $(window);

    var viewport = {
        top: win.scrollTop() + $('header').outerHeight(),
        left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height() - $('header').height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth(true);
    bounds.bottom = bounds.top + this.outerHeight(true);

    return (!(viewport.right <= bounds.left || viewport.left >= bounds.right || viewport.bottom <= bounds.top || viewport.top >= bounds.bottom));
};

$.fn.isFullyOnScreen = function() {
    var win = $(window);

    var viewport = {
        top: win.scrollTop() + $('header').height(),
        left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth(true);
    bounds.bottom = bounds.top + this.outerHeight(true);

    return (bounds.right <= viewport.right && bounds.left >= viewport.left && bounds.top >= viewport.top && bounds.bottom <= viewport.bottom);
};

var STW = {
    activeItem: 'pray',
    _doSetActiveNavItem: function(name) {
        if (this.activeItem === name) {
            return;
        }

        this.activeItem = name;
        $('.nav-button').removeClass('active');
        $('.nav-button.{0}'.format(name)).toggleClass('active');
    },

    smoothScrollElIntoView: function(el) {
        var headerHeight = $('header').outerHeight(),
            offsetForHeaderHeightChange = headerHeight === 120 ? 40 : 0,
            scrollLocation = (el.offset().top + el.outerHeight()) - window.innerHeight - offsetForHeaderHeightChange;

        if ((window.innerHeight - headerHeight) < el.outerHeight()) {
            scrollLocation = el.offset().top - headerHeight;
        }

        $('html, body').animate({
            scrollTop: scrollLocation,
        }, 1000);
    },

    setActiveNavItem: function() {
        // Select the correct navigation button.
        var prayDiv = $('#pray'),
            featuresDiv = $('#features'),
            inspirationDiv = $('#inspiration'),

            prayOnScreen = prayDiv.isOnScreen(),
            featuresOnScreen = featuresDiv.isOnScreen(),
            inspirationOnScreen = inspirationDiv.isOnScreen(),

            prayFullyOnScreen = prayDiv.isFullyOnScreen(),
            featuresFullyOnScreen = featuresDiv.isFullyOnScreen(),
            inspirationFullyOnScreen = inspirationDiv.isFullyOnScreen(),

            itemToActivate;

        if (prayFullyOnScreen && !featuresFullyOnScreen && !inspirationFullyOnScreen) {
            itemToActivate = 'pray';
        } else if (featuresFullyOnScreen && !prayFullyOnScreen && !inspirationFullyOnScreen) {
            itemToActivate = 'features';
        } else if (inspirationFullyOnScreen) {
            itemToActivate = 'inspiration';
        } else if (prayOnScreen && !featuresOnScreen && !inspirationOnScreen) {
            itemToActivate = 'pray';
        } else if (featuresOnScreen && !prayOnScreen && !inspirationOnScreen) {
            itemToActivate = 'features';
        } else if (inspirationOnScreen && !prayOnScreen && !featuresOnScreen) {
            itemToActivate = 'inspiration';
        } else if (prayOnScreen && !featuresFullyOnScreen && !inspirationOnScreen) {
            itemToActivate = 'pray';
        } else if (featuresOnScreen && !prayFullyOnScreen && !inspirationFullyOnScreen) {
            itemToActivate = 'features';
        } else if (inspirationOnScreen && !prayFullyOnScreen && !featuresFullyOnScreen) {
            itemToActivate = 'inspiration';
        } else if (featuresOnScreen && inspirationOnScreen) {
            itemToActivate = 'features';
        }

        this._doSetActiveNavItem(itemToActivate);
    },
};

$(document).ready(function() {
    $(window).scroll(function() {
        // Collapse the header when the user scrolls down the page.
        var position = $(window).scrollTop();
        $('body').toggleClass('page-scrolled', position > 20);

        STW.setActiveNavItem();
    });

    // Automatically insert the correct copyright date.
    // TODO: This should be done on the server. Consider PHP.
    var now = new Date();
    if (now.getFullYear() > 2016) {
        $('.copyright-year').text('2016 - {0}'.format(now.getFullYear()));
    }

    // Smooth Scrolling to anchors
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    STW.smoothScrollElIntoView(target);
                    return false;
                }
            }
        });
    });
});