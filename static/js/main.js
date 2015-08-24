/*global location, jQuery, window, console, document, history */


var P2PU = window.P2PU || {};

(function ($, P2PU) {

    'use strict';

    function clean_data(data) {
        var data_arr = data.split("location="),
            data_arr_new = data_arr.filter(function (v) {
                return v !== '';
            });
        data = 'location=' + data_arr_new.join('location=');

        if (!data_arr_new.length) {
            data = '';
        }
        return data;
    }


    var init = function () {
        $(function () {
            // Smoth scrolling
            $('a[href*=#]:not([href=#],[href=#interest-extra],[data-toggle="collapse"])').click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 98
                        }, 1000);
                        return false;
                    }
                }
            });

            $('.filter-form-element').on('change', function (e) {
                var events = $('#faceted-search-events'),
                    container = $('#events-container'),
                    data = events.serialize(),
                    url = events.attr('action');

                if (!Modernizr.history) {
                    document.getElementById('faceted-search-events').submit();
                } else {
                    data = clean_data(data);
                    $.get(url, data, function (fragment) {
                        history.replaceState({}, document.title, '?' + data);
                        container.empty();
                        container.html(fragment);
                    });
                }
            });
        });
    };

    P2PU.Splash = {};
    P2PU.Splash.init = init;

}(jQuery, P2PU));
