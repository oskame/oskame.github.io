(function($) {

	'use strict';
    $('.header-nav-top ul li').eq(1).children('a').attr('href', 'about.html');
    $('.header-nav-top ul li').eq(2).children('a').attr('href', 'contact.html');

}).apply(this, [jQuery]);