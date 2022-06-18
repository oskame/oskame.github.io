/*
Name: 			View - Shop
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.4.0
*/

(function($) {

	'use strict';
	/*
	* Quantity
	*/
    $( document ).on('click', '.quantity .plus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });

    $( document ).on('click', '.quantity .minus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });
    $('form.cart .btn').on('click', function(e){
        //e.preventDefault();
        var _product_name = $(".summary h1").text(),
            _product_color = $(".summary .form-select[name='color']").val(),
            _product_quantity = $(".summary .quantity .qty").val(),
            _product_size = $(".summary .form-select[name='size']").val(),
            _product_price = $(".summary .price span:first-child").text().replace(" L.E", "").replace(",", "");
        localStorage.setItem('product_name', ""+ _product_name);
        localStorage.setItem('product_color', _product_color);
        localStorage.setItem('product_quantity', _product_quantity);
        localStorage.setItem('product_size', _product_size);
        localStorage.setItem('product_price', _product_price);
        console.log(localStorage.getItem('product_name') +" "+ localStorage.getItem('product_color') +" "+ localStorage.getItem('product_quantity') +" "+ localStorage.getItem('product_price') +" "+ localStorage.getItem('product_size'));
        window.history.pushState({}, '', $(this).attr('href'));
        return false;
    });

    $("a").each(function(){
        $(this).attr("href", $(this).attr('href').replace("https://www.okler.net", "#"));
    });

    $('form .card .btn').on('click', function(e){
        //e.preventDefault();
        var _client_first_name = $("input[name='firstName']").val(),
            _client_last_name = $("input[name='lastName']").val(),
            _client_country = $("input[name='country']").val(),
            _client_address1 = $("input[name='address1']").val(),
            _client_address2 = $("input[name='address2']").val(),
            _client_city = $("input[name='city']").val(),
            _client_state = $("select[name='state']").val(),
            _client_zip = $("input[name='zip']").val(),
            _client_phone = $("input[name='phone']").val(),
            _client_email = $("input[name='email']").val();
        localStorage.setItem('_client_first_name', ""+ _client_first_name);
        localStorage.setItem('_client_last_name', _client_last_name);
        localStorage.setItem('_client_country', 'Egypt');
        localStorage.setItem('_client_address1', _client_address1);
        localStorage.setItem('_client_address2', _client_address2);
        localStorage.setItem('_client_city', _client_city);
        localStorage.setItem('_client_state', _client_state);
        localStorage.setItem('_client_zip', _client_zip);
        localStorage.setItem('_client_phone', _client_phone);
        localStorage.setItem('_client_email', _client_email);
        console.log(localStorage.getItem('_client_first_name') +" "+ localStorage.getItem('_client_second_name') +" "+ localStorage.getItem('_client_address1') +" "+ localStorage.getItem('_client_address2') +" "+ localStorage.getItem('_client_city'));
        window.history.pushState({}, '', $(this).attr('href'));
        return false;
    });

    $("._client_info").each(function(){
        $("._client_info ._client_name").text(localStorage.getItem('_client_first_name') +" "+ localStorage.getItem('_client_last_name'));
        $("._client_info ._client_address").text(localStorage.getItem('_client_address1') +" "+ localStorage.getItem('_client_address2') +", "+ localStorage.getItem('_client_city'));
        $("._client_info ._client_state").text(localStorage.getItem('_client_state') +" "+ localStorage.getItem('_client_zip'));
        $("._client_info ._client_phone").text(localStorage.getItem('_client_phone'));
        $("._client_info ._client_email").text(localStorage.getItem('_client_email'));
        $(".top_client_email").text(localStorage.getItem('_client_email'));
        $(".top_client_price").text(Number((localStorage.getItem('product_price')) * Number(localStorage.getItem('product_quantity'))) + " L.E");
    });

    $(".shop_table.cart-totals").each(function(){
        $("._product-info .product-title").text(localStorage.getItem('product_name'));
        $("._product-info .product-qty").text("x"+localStorage.getItem('product_quantity'));
        $("._product-info > span").text(localStorage.getItem('product_color'));
        $("._product-price .amount").text(localStorage.getItem('product_price'));
        $(".cart-subtotal .amount").text(Number((localStorage.getItem('product_price')) * Number(localStorage.getItem('product_quantity'))) + " L.E");
        $(".total .amount").text(Number((localStorage.getItem('product_price')) * Number(localStorage.getItem('product_quantity'))) + " L.E");
        console.log(localStorage.getItem('product_name') +" "+ localStorage.getItem('product_color') +" "+ localStorage.getItem('product_quantity') +" "+ localStorage.getItem('product_price') +" "+ localStorage.getItem('product_size'));
    });

    /*
    * Image Gallery Zoom
    */
    if($.fn.elevateZoom) {
        if( $('[data-zoom-image]').get(0) ) {
            $('[data-zoom-image]').each(function(){
                var $this = $(this);

                $this.elevateZoom({
                    responsive: true,
                    zoomWindowFadeIn: 350,
                    zoomWindowFadeOut: 200,
                    borderSize: 0,
                    zoomContainer: $this.parent(),
                    zoomType: 'inner',
                    cursor: 'grab'
                });
            });
        }
    }

    /*
    * Quick View Lightbox/Popup With Ajax
    */
    $('.quick-view').magnificPopup({
        type: 'ajax',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: '',
        callbacks: {
            open: function() {
                $('html').addClass('lightbox-opened');
            },
            close: function() {
                $('html').removeClass('lightbox-opened');
                setTimeout(function(){
                    $('html').removeClass('lightbox-beforeclose');
                }, 500);
            },
            beforeClose: function() {
                $('html').addClass('lightbox-beforeclose');
            },
            ajaxContentAdded: function() {

                /*
                Thumb Gallery
                */
                $('.thumb-gallery-wrapper').each(function(){
                    var $thumbGalleryDetail = $(this).find('.thumb-gallery-detail'),
                        $thumbGalleryThumbs = $(this).find('.thumb-gallery-thumbs'),
                        flag = false,
                        duration = 300;

                    $thumbGalleryDetail
                        .owlCarousel({
                            items: 1,
                            margin: 10,
                            nav: true,
                            dots: false,
                            loop: false,
                            autoHeight: true,
                            navText: [],
                            rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                        })
                        .on('changed.owl.carousel', function(e) {
                            if (!flag) {
                                flag = true;
                                $thumbGalleryThumbs.trigger('to.owl.carousel', [e.item.index-1, duration, true]);

                                $thumbGalleryThumbs.find('.owl-item').removeClass('selected');
                                $thumbGalleryThumbs.find('.owl-item').eq( e.item.index ).addClass('selected');
                                flag = false;
                            }
                        });

                    
                    $thumbGalleryThumbs
                        .owlCarousel({
                            margin: 15,
                            items: $(this).data('thumbs-items') ? $(this).data('thumbs-items') : 4,
                            nav: false,
                            center: $(this).data('thumbs-center') ? true : false,
                            dots: false,
                            rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                        })
                        .on('click', '.owl-item', function() {
                            $thumbGalleryDetail.trigger('to.owl.carousel', [$(this).index(), duration, true]);
                        })
                        .on('changed.owl.carousel', function(e) {
                            if (!flag) {
                                flag = true;
                                $thumbGalleryDetail.trigger('to.owl.carousel', [e.item.index, duration, true]);
                                flag = false;
                            }
                        });

                    $thumbGalleryThumbs.find('.owl-item').eq(0).addClass('selected');
                        

                });

                /*
                * Image Gallery Zoom
                */
                if($.fn.elevateZoom) {
                    if( $('[data-zoom-image]').get(0) ) {
                        $('[data-zoom-image]').each(function(){
                            var $this = $(this);

                            $this.elevateZoom({
                                responsive: true,
                                zoomWindowFadeIn: 350,
                                zoomWindowFadeOut: 200,
                                borderSize: 0,
                                zoomContainer: $this.parent(),
                                zoomType: 'inner',
                                cursor: 'grab'
                            });
                        });
                    }
                }

                /*
                * Star Rating
                */ 
                if ($.isFunction($.fn['themePluginStarRating'])) {

                    $(function() {
                        $('[data-plugin-star-rating]:not(.manual)').each(function() {
                            var $this = $(this),
                                opts;

                            var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                            if (pluginOptions)
                                opts = pluginOptions;

                            $this.themePluginStarRating(opts);
                        });
                    });

                }

            }
        }
    });

    if($(".summary, .masonry-loader").length > 0){
        product_related();
    }

    function generateRandomIntegerInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function product_related(){
        const _href = window.location.href.split('/');
        let _current =  _href[_href.length - 1],
            _current_cat = _current.split("-")[0],
            _category = _current.split(".")[0];
        let _data = [
            {
                _img : ['img/products/l/1/1.jpg','img/products/l/2/1.jpg','img/products/l/3/1.jpg','img/products/l/4/1.jpg','img/products/l/5/1.jpg','img/products/l/6/1.jpg','img/products/l/7/1.jpg','img/products/l/8/1.jpg','img/products/l/9/1.jpg','img/products/l/10/1.jpg','img/products/l/11/1.jpg','img/products/l/12/1.jpg','img/products/l/13/1.jpg','img/products/l/14/1.jpg'],
                _title : ['Lenovo V15-IML','DELL Vostro 15','DELL Vostro 3500','DELL Vostro 3510','Lenovo IdeaPad 3 ', 'Asus Vivobook X571LH-BQ007T',
                        "Lenovo IdeaPad L3 15-ITL6", "Lenovo ThinkPad X1 Carbon G9", "Lenovo Ideapad S145-15API", "Lenovo Legion 5 Pro 16ACH6H Gaming", 
                        "DELL G3 15-3500 Gaming", "Asus TUF Dash F15 FX516PM", "Asus Zenbook 13 UX325EA", "Asus Zenbook 14 UX434FLC"],
                _url : ['-1','-2','-3','-4','-5','-6','-7','-8','-9','-10','-11','-12','-13','-14'],
                _price : ['8,888.00', '10,330.00', '15,249.00', '16,599.00', '11,222.00', '19,059.00', '12,909.00', '48,148.00', '8,988.00', '34,747.00', '16,332.00', '29,000.00', '22,999.00', '20,000.00'],
                _prefex : ['l']
            },
            {
                _img : ['img/products/s/1/1.jpg','img/products/s/2/1.jpg','img/products/s/3/1.jpg','img/products/s/4/1.jpg','img/products/s/5/1.jpg','img/products/s/6/1.jpg','img/products/s/7/1.jpg','img/products/s/8/1.jpg'],
                _title : ['Western Digital 4TB','Western Digital 2TB','Western Digital 1TB','Seagate 1TB Expansion','Transcend 2 TB', 'Transcend 4TB StoreJet 25H3', 'Iconix 32GB MICRO SE-9', 'NewBlue 2.5" HDD Expansion'],
                _url : ['-1','-2','-3','-4','-5','-6','-7','-8'],
                _price : ['1,598.00', '1,109.00', '849.00', '777.00', '1,349.00', '2,249.00','49.50','835.00'],
                _prefex : ['s']
            },
            {
                _img : ['img/products/t/1/1.jpg','img/products/t/2/1.jpg','img/products/t/3/1.jpg','img/products/t/4/1.jpg','img/products/t/5/1.jpg','img/products/t/6/1.jpg','img/products/t/7/1.jpg','img/products/t/8/1.jpg'],
                _title : ['Apple IPad Air 4th','Apple IPad Air (4th Generation)','Huawei MatePad T 10s','Samsung Galaxy Tab A7 Lite','Samsung Galaxy Tab A7 Lite', 'Lenovo Tab3 710 - 7"', 'Samsung Galaxy Tab S8', 'Huawei MatePad - 10.4'],
                _url : ['-1','-2','-3','-4','-5','-6','-7','-8'],
                _price : ['19,900.00', '17,999.00', '3,699.00', '3,555.00', '3,555.00', '1,633.00', '16,999.00', '5,899.00'],
                _prefex : ['t']
            },
            {
                _img : ['img/products/m/1/1.jpg','img/products/m/2/1.jpg','img/products/m/3/1.jpg','img/products/m/4/1.jpg','img/products/m/5/1.jpg','img/products/m/6/1.jpg','img/products/m/7/1.jpg','img/products/m/8/1.jpg','img/products/m/9/1.jpg','img/products/m/10/1.jpg'],
                _title : ['IPhone 13 Pro Max - 512GB','Samsung Galaxy A52','XIAOMI Redmi 10','IPhone 13 Pro Max - 256GB','XIAOMI 11T', 
                'IPhone 11 - 128GB', 'IPhone 13 Pro Max - 512GB Gold', 'Samsung Galaxy A12', 'XIAOMI Redmi Note 10S', 'Infinix Hot 11s'],
                _url : ['-1','-2','-3','-4','-5','-6','-7','-8','-9','-10'],
                _price : ['29,500.00', '7,275.00', '4,625.00', '36,999.00', '8,250.00', '16,999.00', '31,500.00', '3,737.00', '5,375.00', '3,650.00'],
                _prefex : ['m']
            },
            {
                _img : ['img/products/c/1/1.jpg','img/products/c/2/1.jpg','img/products/c/3/1.jpg','img/products/c/4/1.jpg','img/products/c/5/1.jpg','img/products/c/6/1.jpg'],
                _title : ['Fujifilm X-S10 Mirrorless','Nikon COOLPIX B500','Canon 6D Mark ii Body','Canon EOS 850D + 18-55mm IS STM','Canon XA15 Compact Full HD Camcorder', 
                        'Canon 5D Mark IV Body'],
                _url : ['-1','-2','-3','-4','-5','-6'],
                _price : ['27,500.00', '5,500.00', '26,000.00', '18,500.00', '36,500.00', '49,500.00'],
                _prefex : ['c']
            },
            {
                _img : ['img/products/a/1/1.jpg','img/products/a/2/1.jpg','img/products/a/3/1.jpg','img/products/a/4/1.jpg','img/products/a/5/1.jpg','img/products/a/6/1.jpg','img/products/a/7/1.jpg','img/products/a/8/1.jpg'],
                _title : ['GIGAHERTZ X2 Usb Speaker','ZERO Wireless Mouse Zero ZR','SGK 15.6-inch Laptop Carrying Bag Sgk','Force 14-inch Laptop Backpack','Aula S602 - Computer Gaming Headset RGB', 
                        'SODO SD-1004 Bluetooth Wired/Wireless', 'SF - 666 Microphone', '3 In 1 USB Hubs 2.0 180 Degree Rotatable'],
                _url : ['-1','-2','-3','-4','-5','-6','-7','-8'],
                _price : ['123.75', '50.00', '134.10', '159.00', '215.10', '229.50', '100.00', '53.00'],
                _prefex : ['a']
            }
        ]
        var _content = ``,
            _html = ``,
            _numb = 0,
            _page_prefx = "";
        switch(_current_cat) {
            case 'l':
                _numb = 0
            break;
            case 's':
                _numb = 1
            break;
            case 't':
                _numb = 2;
                $(".breadcrumb li:last-child").text('Tablets');
            break;
            case 'm':
                _numb = 3
            break;
            case 'c':
                _numb = 4
            break;
            case 'a':
                _numb = 5
            break;
            default:
            // code block
        }
        switch(_category) {
            case 'laptops':
                _numb = 0;
                _page_prefx = "l";
            break;
            case 'storages':
                _numb = 1;
                _page_prefx = "s";
            break;
            case 'tablets':
                _numb = 2;
                _page_prefx = "t";
            break;
            case 'smartphones':
                _numb = 3;
                _page_prefx = "m";
            break;
            case 'cameras':
                _numb = 4;
                _page_prefx = "c";
            break;
            case 'accessories':
                _numb = 5;
                _page_prefx = "a";
            break;
            default:
            // code block
        }
        var arrayLength = _data[_numb]._img.length;
        if($(".products .owl-carousel").length > 0){
            for (var i = 0; i < arrayLength; i++) {
                _content = `
                    <div class="product mb-0">
                        <div class="product-thumb-info border-0 mb-3">
                            <a href="${_current_cat}${_data[_numb]._url[i]}.html">
                                <div class="product-thumb-info-image">
                                    <img alt="" class="img-fluid" src="${_data[_numb]._img[i]}">
                                </div>
                            </a>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <a href="#" class="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1">electronics</a>
                                <h3 class="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0"><a href="${_current_cat}${_data[_numb]._url[i]}.html" class="text-color-dark text-color-hover-primary">${_data[_numb]._title[i]}</a></h3>
                            </div>
                            <a href="#" class="text-decoration-none text-color-default text-color-hover-dark text-4"><i class="far fa-heart"></i></a>
                        </div>
                        <div title="Rated 5 out of 5">
                            <input type="text" class="d-none" value="5" title="" data-plugin-star-rating data-plugin-options="{'displayOnly': true, 'color': 'default', 'size':'xs'}">
                        </div>
                        <p class="price text-5 mb-3">
                            <span class="amount">${_data[_numb]._price[i]} L.E</span>
                        </p>
                    </div>`
                _html += _content;
                //Do something
            }
            $(".products .owl-carousel").html(_html);
        }

        if($("body:not(.home) .masonry-loader .products").length > 0){
            for (var i = 0; i < arrayLength; i++) {
                _content = `
                    <div class="col-sm-6">
                        <div class="product mb-0">
                            <div class="product-thumb-info border-0 mb-3">
                                <a href="${_page_prefx}${_data[_numb]._url[i]}.html">
                                    <div class="product-thumb-info-image">
                                        <img alt="" class="img-fluid" src="${_data[_numb]._img[i]}">
                                    </div>
                                </a>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 class="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0"><a href="shop-product-sidebar-right.html" class="text-color-dark text-color-hover-primary">${_data[_numb]._title[i]}</a></h3>
                                </div>
                                <a href="${_page_prefx}${_data[_numb]._url[i]}.html" class="text-decoration-none text-color-default text-color-hover-dark text-4"><i class="far fa-heart"></i></a>
                            </div>
                            <div title="Rated 5 out of 5">
                                <input type="text" class="d-none" value="5" title="" data-plugin-star-rating data-plugin-options="{'displayOnly': true, 'color': 'default', 'size':'xs'}">
                            </div>
                            <p class="price text-5 mb-3">
                                <span class="amount">${_data[_numb]._price[i]} L.E</span>
                            </p>
                        </div>
                    </div>`
                _html += _content;
            }
            $(".masonry-loader .products").html(_html);
        }
        
        var _side_cat_numb = 0,
            _side_product_numb = 0;
        
        if($(".latest-products").length > 0){
            side_products(".latest-products");
            side_products(".recent-products");
            side_products(".top-products");
        }
        function side_products(_selector){
            setTimeout(function(){
                for (var i = 0; i < 3; i++) {
                    _side_cat_numb = parseInt(generateRandomIntegerInRange(1, 5), 10);
                    _side_product_numb = parseInt(generateRandomIntegerInRange(1, 5), 10);
                    _content = `
                        <div class="product row row-gutter-sm align-items-center mb-4">
                            <div class="col-5 col-lg-5">
                                <div class="product-thumb-info border-0">
                                    <a href="${_data[_side_cat_numb]._prefex[0]}${_data[_side_cat_numb]._url[_side_product_numb]}.html">
                                        <div class="product-thumb-info-image">
                                            <img alt="" class="img-fluid" src="${_data[_side_cat_numb]._img[_side_product_numb]}">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="col-7 col-lg-7 ms-md-0 ms-lg-0 ps-lg-1 pt-1">
                                <h3 class="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0"><a href="${_data[_side_cat_numb]._prefex[0]}${_data[_side_cat_numb]._url[_side_product_numb]}.html" class="text-color-dark text-color-hover-primary text-decoration-none">${_data[_side_cat_numb]._title[_side_product_numb]}</a></h3>
                                <div title="Rated 5 out of 5">
                                    <input type="text" class="d-none" value="5" title="" data-plugin-star-rating data-plugin-options="{'displayOnly': true, 'color': 'dark', 'size':'xs'}">
                                </div>
                                <p class="price text-4 mb-0">
                                    <span class="amount">${_data[_side_cat_numb]._price[_side_product_numb]} L.E</span>
                                </p>
                            </div>
                        </div>`
                    _html = _content;
                    $(_selector).append(_content);
                }
            },150);
        }
        if($("body.home .masonry-loader .products").length > 0){
            home_products(".masonry-loader .products");
        }
        function home_products(_selector){
            for (var i = 0; i < 18; i++) {
                _side_cat_numb = parseInt(generateRandomIntegerInRange(1, 5), 10);
                _side_product_numb = parseInt(generateRandomIntegerInRange(1, 5), 10);
                _content = `
                    <div class="col-sm-6 col-lg-4">
                        <div class="product mb-0">
                            <div class="product-thumb-info border-0 mb-3">

                                <div class="addtocart-btn-wrapper">
                                    <a href="${_data[_side_cat_numb]._prefex[0]}${_data[_side_cat_numb]._url[_side_product_numb]}.html" class="text-decoration-none addtocart-btn" title="Add to Cart">
                                        <i class="icons icon-bag"></i>
                                    </a>
                                </div>
                                <a href="${_data[_side_cat_numb]._prefex[0]}${_data[_side_cat_numb]._url[_side_product_numb]}.html">
                                    <div class="product-thumb-info-image">
                                        <img alt="" class="img-fluid" src="${_data[_side_cat_numb]._img[_side_product_numb]}">
                                    </div>
                                </a>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 class="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0"><a href="${_data[_side_cat_numb]._prefex[0]}${_data[_side_cat_numb]._url[_side_product_numb]}.html" class="text-color-dark text-color-hover-primary">${_data[_side_cat_numb]._title[_side_product_numb]}</a></h3>
                                </div>
                                <a href="#" class="text-decoration-none text-color-default text-color-hover-dark text-4"><i class="far fa-heart"></i></a>
                            </div>
                            <div title="Rated 5 out of 5">
                                <input type="text" class="d-none" value="5" title="" data-plugin-star-rating data-plugin-options="{'displayOnly': true, 'color': 'default', 'size':'xs'}">
                            </div>
                            <p class="price text-5 mb-3">
                                <span class="amount">${_data[_side_cat_numb]._price[_side_product_numb]} L.E</span>
                            </p>
                        </div>
                    </div>`
                _html = _content;
                $(_selector).append(_content);
            }
        }
    }

}).apply(this, [jQuery]);