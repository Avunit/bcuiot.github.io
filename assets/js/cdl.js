if ($('html').hasClass('ie6') || $('html').hasClass('ie7') || $('html').hasClass('ie8') || $('html').hasClass('ie9')) {

    $('body').prepend('<div class="brand-primary-bg-yellow-light"><div class="page pvm clear-fix"><h2 class="mbm"><span class="icon-info-circled mrm delta"></span> This browser is not fully supported.</h2><p class="mbs">Some features may not work as expected. For the best experience, please <a href="http://www.computerhope.com/issues/ch001388.htm">update your browser</a>.</p><p>If you are using a BCU PC, contact <a href="https://icity.bcu.ac.uk/IT">IT helpdesk</a> for help</p></div></div>');

}
var cdl = {}

//Click Event - Slide Out
cdl.doSlideReveal = function () {
    $('body').on('click', '.j-slide-reveal', function (e) {
        //e.preventDefault();
        
        var openReveals = $(this).closest('.slide-reveal-group').find('.open').length;

        $(this).toggleClass('closed open');
        $(this).next('.j-slide-reveal-content').stop().slideToggle();
        $(this).find('abbr').toggleClass('icon-plus-squared icon-minus-squared');

        if (openReveals > 0) {
            $(this).closest('.slide-reveal-group').find('.slide-reveal-all').text('Close all sections');
        }
        else {
            $(this).closest('.slide-reveal-group').find('.slide-reveal-all').text('Open all sections');
        }
       
    });

    $('body').on('click', '.slide-reveal-all', function (e) {
        e.preventDefault();

        var $this = $(this).closest('.slide-reveal-group');

        var closedReveals = $(this).closest('.slide-reveal-group').find('.closed').length;

        if (closedReveals > 1) {
            $this.find('.slide-reveal-all').text('Close all sections');
            $this.find('.j-slide-reveal').addClass('open').removeClass('closed');
            $this.find('.j-slide-reveal-content').slideDown();
            $this.find('abbr').removeClass('icon-plus-squared').addClass('icon-minus-squared');
        } else {
            $this.find('.slide-reveal-all').text('Open all sections');
            $this.find('.j-slide-reveal').addClass('closed').removeClass('open');
            $this.find('.j-slide-reveal-content').slideUp();
            $this.find('abbr').addClass('icon-plus-squared').removeClass('icon-minus-squared');
        }
    });
}

// Click Reveal function used to replace Hover Reveal for touch devices
cdl.doClickReveal = function () {
    
    $('header[role=banner], #main').on('click', function () {
    // A click anywhere outside the target should close the menu
        var clickTarget = $('.hover-reveal');
        clickTarget.removeClass('active');
        clickTarget.find('.hover-reveal-content').addClass('hidden').attr('aria-expanded', 'false');
    });

    $('.hover-reveal-content').find('a').on('click', function () {
        // Force links inside touch area to follow link
        window.location = $(this).attr('href');
    });

    $('body').on('click', '.hover-reveal', function (e) {
        // This is the generic click event to toggle menu on/off
        if (!$('html').hasClass('js-nav-active')) {
        //This outer statement allows the corporate site top level links to work when in mobile view
            e.preventDefault();
            //e.stopPropagation();
            $('.hover-reveal').not(this).removeClass('active');
            $('.hover-reveal-content').not(this).addClass('hidden').attr('aria-expanded', 'false');

            if ($(this).hasClass('active')) {

                // Standard method to close menu
                $(this).removeClass('active');
                $(this).find('.hover-reveal-content').addClass('hidden');
                $(this).find('.hover-reveal-content').attr('aria-expanded', function (i, attr) {
                    return attr === 'true' ? 'false' : 'true';
                });
                $(this).find('.hover-reveal-content').attr('aria-hidden', function (i, attr) {
                    return attr === 'false' ? 'true' : 'false';
                });

            } else {

                // Standard method to open menu
                $(this).addClass('active');
                $(this).find('.hover-reveal-content').removeClass('hidden');
                $(this).find('.hover-reveal-content').attr('aria-expanded', function (i, attr) {
                    return attr === 'true' ? 'false' : 'true';
                });
                $(this).find('.hover-reveal-content').attr('aria-hidden', function (i, attr) {
                    return attr === 'false' ? 'true' : 'false';
                });
            }
            if ($(this).find('a').attr('href') !== '#') {
                // This is a normal link so treat as such
            } else {
                // This is a faux link/# so don't follow link
                e.preventDefault();
            }           
        }        
    });
}

//Hover Event
cdl.doHoverReveal = function () {
    function hoverReveal() {
        $(this).addClass('active').children('.hover-reveal-content').removeClass('hidden');

        $(this).find('.hover-reveal-content').attr('aria-expanded', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
        });
        $(this).find('.hover-reveal-content').attr('aria-hidden', function (i, attr) {
            return attr === 'false' ? 'true' : 'false';
        });
    };

    function hoverHide() {

        $(this).removeClass('active').children('.hover-reveal-content').addClass('hidden');

        $(this).find('.hover-reveal-content').attr('aria-expanded', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
        });
        $(this).find('.hover-reveal-content').attr('aria-hidden', function (i, attr) {
            return attr === 'false' ? 'true' : 'false';
        });

    };


    var hoverSettings = {
        sensitivity: 3,
        interval: 100,
        timeout: 300,
        over: hoverReveal,
        out: hoverHide
    };

    $('.hover-reveal').hoverIntent(hoverSettings);
};

//Hover Event
cdl.doHoverFade = function () {
    $('.hover-fader').fadeTo(50, 0.6).hover(function () {
        $(this).stop().fadeTo(50, 1);
    }, function () {
        $(this).stop().fadeTo(50, 0.6);
    });
};


$(document)
    .ready(function () {

        var isTouchDevice = ('ontouchstart' in window || navigator.msMaxTouchPoints);

        if (isTouchDevice) {
            cdl.doClickReveal();
        } else {
            cdl.doHoverReveal();
            cdl.doHoverFade();

        }
        cdl.doSlideReveal();
    });