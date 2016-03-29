String.prototype.format = function () {
    var formattedString = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        formattedString = this.replace(reg, arguments[i]);
    }

    return formattedString;
};

$(document).ready(function () {
    // Collapse the header when the user scrolls down the page.
    $(window).scroll(function () {
        var position = $(window).scrollTop();
        $('body').toggleClass('page-scrolled', position > 20);
    });

    // Automatically insert the correct copyright date.
    // TODO: This should be done on the server. Consider PHP.
    var now = new Date();
    if (now.getFullYear() > 2016) {
        $('.copyright-year').text('2016 - {0}'.format(now.getFullYear()));
    }
});
