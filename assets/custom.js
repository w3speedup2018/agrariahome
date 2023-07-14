//let checkString = "5879773102230,5879821205654,5879821336726,5879821467798,5879821828246,5879821631638,5879822024854,5879822483606,5879822647446,6947988766870,6981640880278,6709849096342,7099131297942";

//this one is used
//let checkString = "5879773102230,5879821205654,5879821336726,5879821467798,5879821828246,5879821631638,5879822024854,5879822483606,5879822647446,7099131297942,6709849096342";
let checkString = "";
    
    
setTimeout(function() {
    function refreshCart(cart) {
        $('.cart_count').text(cart.item_count);
        if (cart.item_count == 0) {
            $('.cart-page-wrapper').addClass('empty-message');
        } else {
            $('.cart-page-wrapper').removeClass('empty-message');
        }
    }

    function addToCartSuccess(id) {
        if (checkString.indexOf(id) >= 0) {
            $(".oz_candles").fadeIn(200);
        } else {
            $.get("/cart?view=mini", function(data) {
                $('#minicart_content').html(data);
            });
        }
    }

    function main_cart() {
        $.get("/cart?view=full", function(data) {
            $('#main_cart').html(data);
        });
    }

    function closepopupfree() {
        $('.cart-slider-popup').removeClass("show");
        $('body').removeClass("noscroll");
        $('.cart-popup-overlay').removeClass("show");
        $("#get_1_for_all .slider-item").removeClass("slider-overlay");
        $("#get_1_for_all .slider-item .slider-item-inner").css("opacity", "1");
        $("#get_1_for_all .slider-item .input-checkbox").each(function() {
            if ($(this).prop("checked") == true) {
                $(this).trigger('click');
            }
        });
    }

    function check_discount() {}

    function check_full_qty() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-content .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function check_diff_qty() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-item.is_diffuser .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function check_e_diff_qty() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-item.is_e_diffuser .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function check_pe() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-item.is_PE .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function check_full_pe() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-item.free_PE .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function btn_overly() {
        var total_qty = check_full_qty();
        if (total_qty >= 1) {
            $('.cart-slider-popup-body').addClass("active-pro");
        } else {
            $('.cart-slider-popup-body').removeClass("active-pro");
        }
    }

    function btn_overly() {
        var total_qty = check_full_qty();
        if (total_qty >= 1) {
            $('.cart-slider-popup-body').addClass("active-pro");
        } else {
            $('.cart-slider-popup-body').removeClass("active-pro");
        }
    }

    function check_full_only_one_free() {
        var totalProduct = 0;
        $('.cart-slider-popup.show .slider-item.is_oz_free .item-quantity').each(function() {
            totalProduct = totalProduct + parseInt($(this).val());
        });
        return totalProduct;
    }

    function add_or_remove_overly(total_p, limit) {
        if ($('.cart-slider-popup.both_diffuser.show').length || $('.cart-slider-popup.diffuser_PE.show').length || $('.cart-slider-popup.diffuser_free_pe.show').length || $('.cart-slider-popup.e_diffuser_PE.show').length || $('.cart-slider-popup.e_diffuser_free_pe.show').length || $('.cart-slider-popup.PE_free_pe.show').length || $('.cart-slider-popup.diff_e_diffuser_PE.show').length || $('.cart-slider-popup.e_diffuser_PE_free_pe.show').length || $('.cart-slider-popup.PE_free_pe_diff.show').length || $('.cart-slider-popup.free_pe_diff_e_diffuser.show').length || $('.cart-slider-popup.all_four.show').length || $('.cart-slider-popup.oz-pro.show').length) {
            var diffuser_limit = $('.counter-value .free_qty').attr('data-val_diff');
            var free_one_for_all_diffuser_limit = $('.counter-value .free_qty').attr('data-val_free_one');
            var e_diffuser_limit = $('.counter-value .free_qty').attr('data-val_e_diff');
            var pe_limit = $('.counter-value .free_qty').attr('data-val_pe');
            var pe_full_limit = $('.counter-value .free_qty').attr('data-val_full_pe');
            var total_diff = check_diff_qty();
            var total_e_diff = check_e_diff_qty();
            var total_pe = check_pe();
            var total_full_pe = check_full_pe();
            var total_full_free_one = check_full_only_one_free();
            if (total_diff >= diffuser_limit) {
                $('.cart-slider-popup-body .slider-item.is_diffuser').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
                $('.cart-slider-popup-body .slider-item.is_diffuser .new_adjust.pluss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_diffuser').removeClass('slider-overlay');
                $('.cart-slider-popup-body .slider-item.is_diffuser .new_adjust.pluss').css("pointer-events", "auto");
            }
            if (total_full_free_one >= free_one_for_all_diffuser_limit) {
                $('.cart-slider-popup-body .slider-item.is_oz_free').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
                $('.cart-slider-popup-body .slider-item.is_oz_free .new_adjust.pluss').addClass("disable_button_promo");
            } else {
                $('.cart-slider-popup-body .slider-item.is_oz_free').removeClass('slider-overlay');
                $('.cart-slider-popup-body .slider-item.is_oz_free .new_adjust.pluss').removeClass("disable_button_promo");
            }
            if (total_diff <= 0) {
                $('.cart-slider-popup-body .slider-item.is_diffuser .new_adjust.minuss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_diffuser .new_adjust.minuss').css("pointer-events", "auto");
            }
            if (total_e_diff >= e_diffuser_limit) {
                $('.cart-slider-popup-body .slider-item.is_e_diffuser').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
                $('.cart-slider-popup-body .slider-item.is_e_diffuser .new_adjust.pluss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_e_diffuser').removeClass('slider-overlay');
                $('.cart-slider-popup-body .slider-item.is_e_diffuser .new_adjust.pluss').css("pointer-events", "auto");
            }
            if (total_e_diff <= 0) {
                $('.cart-slider-popup-body .slider-item.is_e_diffuser .new_adjust.minuss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_e_diffuser .new_adjust.minuss').css("pointer-events", "auto");
            }
            if (total_pe >= pe_limit) {
                $('.cart-slider-popup-body .slider-item.is_PE').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
                $('.cart-slider-popup-body .slider-item.is_PE .new_adjust.pluss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_PE').removeClass('slider-overlay');
                $('.cart-slider-popup-body .slider-item.is_PE .new_adjust.pluss').css("pointer-events", "auto");
            }
            if (total_pe <= 0) {
                $('.cart-slider-popup-body .slider-item.is_PE .new_adjust.minuss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.is_PE .new_adjust.minuss').css("pointer-events", "auto");
            }
            if (total_full_pe >= pe_full_limit) {
                $('.cart-slider-popup-body .slider-item.free_PE').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
                $('.cart-slider-popup-body .slider-item.free_PE .new_adjust.pluss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.free_PE').removeClass('slider-overlay');
                $('.cart-slider-popup-body .slider-item.free_PE .new_adjust.pluss').css("pointer-events", "auto");
            }
            if (total_pe <= 0) {
                $('.cart-slider-popup-body .slider-item.free_PE .new_adjust.minuss').css("pointer-events", "none");
            } else {
                $('.cart-slider-popup-body .slider-item.free_PE .new_adjust.minuss').css("pointer-events", "auto");
            }
        } else {
            if (total_p >= limit) {
                $('.cart-slider-popup-body .slider-item').each(function(i, v) {
                    if ($(this).find('.input-checkbox').prop("checked") == false) {
                        $(this).addClass('slider-overlay');
                    }
                });
            } else {
            }
        }
    }
    $('body').on('change', '.cart-slider-popup-body input.input-checkbox', function(e) {
        e.preventDefault();
        var total_p = check_full_qty();
        if ($(this).prop("checked") == true) {
            $(this).closest('.slider-item').find('.item-quantity').val(1);
            $('.qty_display').html(parseInt($('.qty_display').html()) + 1);
            total_p++;
        } else {
            var thi_qty = $(this).closest('.slider-item').find('.item-quantity').val();
            $(this).closest('.slider-item').find('.item-quantity').val(0);
            $('.qty_display').html(total_p - thi_qty);
            $(".new_adjust.pluss").css("pointer-events", "auto");
            total_p = total_p - thi_qty;
        }
        btn_overly();
        var limit = parseInt($('.free_qty').attr('data-val'));
        add_or_remove_overly(total_p, limit);
    });
    $('.new_adjust').on('click', function() {
        var total_p = check_full_qty();
        var limit = parseInt($('.free_qty').attr('data-val'));
        var input = $(this).parent().find('input');
        var ip = parseInt(input.val());
        if ($(this).hasClass('pluss')) {
            ip = ip + 1;
            total_p++;
        } else {
            ip = ip - 1;
            total_p--;
        }
        if (total_p > limit) {
            $(".new_adjust.pluss").css("pointer-events", "none");
            return false;
        } else {
            $(".new_adjust.pluss").css("pointer-events", "auto");
        }
        if (total_p >= 0) {
            $('.qty_display').html(total_p);
        }
        if (ip <= 0) {
            $(this).closest('.slider-item').find('.input-checkbox').prop('checked', false);
            input.val(0);
        } else {
            $(this).closest('.slider-item').find('.input-checkbox').prop('checked', true);
            input.val(ip);
        }
        add_or_remove_overly(total_p, limit);
        btn_overly();
    });
    $("body").on("click", '.add-to-bag-btn', function(e) {
        e.preventDefault();
        var data = [];
        $('.cart-slider-popup-body .slider-item').each(function(i, v) {
            if ($(this).find('.input-checkbox').prop("checked") == true) {
                var items = {};
                var prop = {};
                items.id = $(this).find('.item-quantity').attr('data-id');
                items.quantity = $(this).find('.item-quantity').val();
                if ($(this).hasClass('free_PE')) {
                    prop['_Promotion'] = 'PE Free';
                } else if ($(this).hasClass('is_PE')) {
                    prop['_Promotion'] = 'PE Half';
                } else if ($(this).hasClass('is_diffuser')) {
                    prop['_Promotion'] = 'DE Free';
                } else if ($(this).hasClass('is_e_diffuser')) {
                    prop['_Promotion'] = 'E-DE Free';
                } else if ($(this).hasClass('is_oz_free')) {
                    prop['_Promotion'] = 'free_one_Get_PEH';
                }
                items.properties = prop;
                data.push(items);
            }
        });
        $.post('/cart/add.js', {
            items: data
        }, function(c) {
            closepopupfree();
            addToCartSuccess();
            $.getJSON('/cart.js', function(cart) {
                refreshCart(cart);
            });
            $(".header-setting").removeClass("open-account");
            $('.header-search').removeClass('open-search');
            $('.cart-slider-popup-body input.input-checkbox').each(function() {
                if ($(this).prop("checked") == true) {
                    $(this).trigger('click');
                }
            });
            check_discount();
            if ($('body').hasClass('template-cart')) {
                window.location.reload(true);
            }
        }, 'JSON').fail(function(response) {
            console.log('In error');
        });
    });
    check_discount();
    $('.mobile-menu-wrapper .drop-btn').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('open-menu');
    });
    $("body").on("click", '.sorter-action.title-descending', function(e) {
        e.preventDefault();
        $('.sort-by').val("title-ascending").change();
    });
    $("body").on("click", '.sorter-action.title-ascending', function(e) {
        e.preventDefault();
        $('.sort-by').val("title-descending").change();
    });
    $("body").on("keyup", '.auto_search_input', function(e) {
        e.preventDefault();
        var form = $(this).closest('form');
        var href = '/search?' + form.serialize() + '&view=auto_search';
        $.get(href, function(data) {
            $('.auto_search_data').html(data);
            document.dispatchEvent(new CustomEvent("swym:collections-loaded"));
        });
    });
    $("body").on("click", '.close_icon_search', function(e) {
        e.preventDefault();
        $(this).closest('form').submit();
    });
    $("body").on("click", '.close_icon_search', function(e) {
        e.preventDefault();
        var form = $(this).closest('form');
        form.find('.search_parent').removeClass('active');
        $('.auto_search_button').show();
        $('.auto_search_data').hide();
    });
    $("body").on("click", '.auto_search_data .view_all', function(e) {
        e.preventDefault();
        $('.search-form.search-bar__form').submit();
    });

    $(window).scroll(function() {
        var sticky = $('.page-header'),
            scroll = $(window).scrollTop();
        var header_height = $('header').outerHeight();
        if (scroll >= header_height) {
            sticky.addClass('sticky-menu');
            $('body').addClass('show_top');
        } else {
            sticky.removeClass('sticky-menu');
            $('body').removeClass('show_top');
        }
    });
    $('body').on('click', '.toggle_filter', function(e) {
        $(this).closest('.expand-layered-nav').find('.filtersList').toggle('filter-open');
    });
    $(".toggle-bar").on("click", function(e) {
        e.preventDefault();
        $(".mobile-menu, body").addClass("active-menu");
    });
    $(".close-icon, .meu-overlay").on("click", function(e) {
        e.preventDefault();
        $(".mobile-menu, body").removeClass("active-menu");
    });
    if ($('.hero-slider').length) {
        $('.hero-slider').slick({
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        });
    }

    if ($('.hero-slider-history').length) {
      $('.hero-slider-history').slick({
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 6000,
      });
  }

    if ($('.product-slider').length) {
        $('.product-slider').slick({
            arrows: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 780,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 660,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 490,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
    }
    $(".header-search a").click(function(e) {
        e.preventDefault();
        $('.icon_cart').removeClass('is_open');
        $('.mini-cart').removeClass('open-cart');
        $(".header-setting").removeClass("open-account");
        $(".header-search").toggleClass("open-search");
    });

    $(".header-cart .icon_cart, .cart-close").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("is_open");
        $(".mini-cart").toggleClass("open-cart");
        $('.header-search').removeClass('open-search');
        $(".header-setting").removeClass("open-account");
    });

    $(".header-setting .setting_icon").click(function(e) {
        e.preventDefault();
        $('.icon_cart').removeClass('is_open');
        $('.mini-cart').removeClass('open-cart');
        $('.header-search').removeClass('open-search');
        $(".header-setting").toggleClass("open-account");
    });
    if ($('.product-img-slider').length) {
        $('.product-img-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.product-img-thumb',
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            }]
        });
    }
    if ($('.product-img-thumb').length) {
        $('.product-img-thumb').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            lazyLoad: 'ondemand',
            asNavFor: '.product-img-slider',
            dots: false,
            centerMode: false,
            arrows: true,
            focusOnSelect: true
        });
    }

    $('body').on('click', '.add_to_cart_ajax', function(e) {
        e.preventDefault();
        var btn = $(this);
        var form = $(this).closest('form');
        var id = $(this).prev().data("productid");
        btn.attr('disabled', 'disabled');
        btn.find('span').text('Adding...');
        form.find('.error').remove();
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: form.serialize(),
            dataType: 'json',
            error: function(jqXHR, textStatus, errorThrown) {
                if (btn.hasClass('is_pre_order')) {
                    btn.find('span').text(theme.strings.pre_order);
                } else {
                    btn.find('span').text(theme.strings.addToCart);
                }
                btn.removeAttr('disabled');
                $('.minicart_qty_error').removeClass('hidden');
            }
        }).done(function(data) {
            addToCartSuccess(id);
            if (btn.hasClass('is_pre_order')) {
                btn.find('span').text(theme.strings.pre_order);
            } else {
                btn.find('span').text(theme.strings.addToCart);
            }
            btn.removeAttr('disabled');
            $.getJSON('/cart.js', function(cart) {
                refreshCart(cart);
            });
            $(".header-setting").removeClass("open-account");
            $('.header-search').removeClass('open-search');
            check_discount();
        });
    });
    $("body").on('click', ".del_qty_error", function(r) {
        r.preventDefault();
        $('.minicart_qty_error').addClass('hidden');
    });
    $("body").on('click', ".update_minicart", function(r) {
        r.preventDefault();
        var input = $(this).parent().find('.item-quantity');
        var ip = parseInt(input.val());
        var available_qty = input.attr('data-available_variant');
        if (available_qty != 'countinue') {
            available_qty = parseInt(available_qty);
            if (ip > available_qty) {
                $(this).addClass('hidden');
                input.val(input.attr('data-cur_qty'));
                $('.minicart_qty_error').removeClass('hidden');
                return false;
            }
        }
        if (ip == 0) {
            return false;
        }
        var id = input.attr('data-id');
        $.ajax({
            type: 'POST',
            url: '/cart/change.js',
            dataType: 'json',
            async: false,
            data: {
                quantity: ip,
                id: id
            },
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
                var response = $.parseJSON(jqXHR.responseText);
                console.log('error');
                console.log(response.description);
                console.log('The requested qty exceeds the maximum qty allowed in shopping cart');
            },
            success: function success(cart) {
                addToCartSuccess();
                $.getJSON("/cart.js", function(cart) {
                    refreshCart(cart);
                });
                check_discount();
            }
        });
    });
    $('body').on('keyup', '.item-quantity', function() {
        var input = $(this).parent().find('.item-quantity');
        var cur_qty = parseInt(input.attr('data-cur_qty'));
        if (input.val() != '') {
            var changed = parseInt(input.val());
            if (changed == 0) {
                input.val(cur_qty);
                $(this).parent().find('.update_minicart').addClass('hidden');
            } else {
                if (cur_qty != changed) {
                    $(this).parent().find('.update_minicart').removeClass('hidden');
                } else {
                    $(this).parent().find('.update_minicart').addClass('hidden');
                }
            }
        } else {
            input.val(cur_qty);
            $(this).parent().find('.update_minicart').addClass('hidden');
        }
    });

    $("body").on('click', "a.remove_item", function(r) {
        r.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: '/cart/change.js',
            dataType: 'json',
            async: false,
            data: {
                quantity: 0,
                id: id
            },
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
                var response = $.parseJSON(jqXHR.responseText);
                console.log('error');
                console.log(response.description);
            },
            success: function success(cart) {
                addToCartSuccess();
                $.getJSON("/cart.js", function(cart) {
                    refreshCart(cart);
                });
                check_discount();
            }
        });
    });

    $('.user_pagination').on('change', function() {
        var url = $(this).val();
        window.location = url;
    });
    $("body").on('click', ".qty_change", function(r) {
        r.preventDefault();
        var form = $(this).closest('form');
        form.find('.error_msg').remove();
        var input = $(this).parent().find('.product-form__input--quantity');
        var ip = parseInt(input.val());
        if ($(this).hasClass('increase')) {
            ip++;
        } else {
            ip--;
        }
        if (ip == 0) {
            input.val(1);
        } else {
            input.val(ip);
        }
    });

    $("body").on('keyup', ".product-form__input--quantity", function(r) {
        r.preventDefault();
        var form = $(this).closest('form');
        form.find('.error_msg').remove();
        var input = $(this).parent().find('.product-form__input--quantity');
        if (input.val() == '' || parseInt(input.val()) == 0) {
            input.val(1);
        }
    });

    $('body').on('click', '#add', function(e) {
        e.preventDefault();
        $('.alert_note').empty();
        var btn = $(this);
        var form = $(this).closest('form');
        var input = form.find('.error_msg').remove();
        var input = form.find('.product-form__input--quantity');
        var id = form.data("productid");
        console.log(id);
        if (!btn.hasClass('is_pre_order')) {
            if (input.attr('data-available_variant') != 'countinue') {
                var available_qty = parseInt(input.attr('data-available_variant'));
                if (available_qty < parseInt(input.val())) {
                    form.append('<p class="error_msg">The maximum you may purchase is ' + available_qty + '.</p>');
                    return false;
                }
            }
        }
        btn.attr('disabled', 'disabled');
        btn.find('span').text('Adding...');
        form.find('.error').remove();
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: form.serialize(),
            dataType: 'json',
            error: function(jqXHR, textStatus, errorThrown) {
                if (btn.hasClass('is_pre_order')) {
                    btn.find('span').text(theme.strings.pre_order);
                } else {
                    btn.find('span').text(theme.strings.addToCart);
                }
                btn.removeAttr('disabled');
                $('.alert_note').html('<p class="error_msg"><span class="svg"><?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 488.451 488.451" style="enable-background:new 0 0 488.451 488.451;" xml:space="preserve"><g><path d="M484.125,412.013l-212.2-367.6c-12.3-21.3-43.1-21.3-55.4,0l-212.2,367.6c-12.3,21.3,3.1,48,27.7,48h424.4C481.025,460.013,496.425,433.313,484.125,412.013z M244.525,157.613c13.6,0,24.6,11.3,24.2,24.9l-4,139.6c-0.3,11-9.3,19.7-20.3,19.7s-20-8.8-20.3-19.7l-3.9-139.6C219.925,168.913,230.825,157.613,244.525,157.613zM244.225,410.113c-13.9,0-25.2-11.3-25.2-25.2c0-13.9,11.3-25.2,25.2-25.2s25.2,11.3,25.2,25.2S258.125,410.113,244.225,410.113z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span><span class="message">The requested qty exceeds the maximum qty allowed in shopping cart.</span></p>');
            }
        }).done(function(data) {
            addToCartSuccess(id);
            if (btn.hasClass('is_pre_order')) {
                btn.find('span').text(theme.strings.pre_order);
            } else {
                btn.find('span').text(theme.strings.addToCart);
            }
            btn.removeAttr('disabled');
            $.getJSON('/cart.js', function(cart) {
                refreshCart(cart);
            });
            $('.alert_note').html('<p class="success_msg"><span class="svg"><svg viewBox="0 -46 417.81333 417"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"></path></svg></span><span class="message">You added ' + data.title + ' to your <a href="/cart">shopping bag</a>.</span></p>');
            check_discount();
        });
    });

    $('body').on('click', '.sidebar-title', function() {
        if ($(window).width() <= 767) {
            $(this).closest('.customized-sidebar-categories').find('.categories-fst').toggle('open-categories');
        }
    });

    $('#ContactFooter_all_pages').submit(function() {
        var form = $(this);
        var x = true;
        var em = form.find('#email_footer');
        form.find('.error_msg').remove();
        var err_msg = 'This is a required field.';
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (em.val().trim() == '' || !regex.test(em.val())) {
            $(em).parent().append('<span class="error_msg">' + err_msg + '</span>');
            $(em).parent().addClass('haserror');
            x = false;
        } else {
            $(em).parent().removeClass('haserror');
        }
        if (x == false) {
            $('.haserror:eq(0) input').trigger('focus');
            return false;
        } else {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("customer_form", "footer");
            }
        }
    });

    function cart_page_ajax(input) {
        var ip = parseInt(input.val());
        var available_qty = input.attr('data-available_variant');
        if (available_qty != 'countinue') {
            available_qty = parseInt(available_qty);
            if (ip > available_qty) {
                input.val(input.attr('data-cur_qty'));
                $('.minicart_qty_error').removeClass('hidden');
                return false;
            }
        }
        if (ip == 0) {
            input.val(input.attr('data-cur_qty'));
            return false;
        }
        if ($('.cart-page-wrapper.hide_update').length == 0) {
            return false;
        }
        var id = input.attr('data-id');
        $.ajax({
            type: 'POST',
            url: '/cart/change.js',
            dataType: 'json',
            async: false,
            data: {
                quantity: ip,
                id: id
            },
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {
                var response = $.parseJSON(jqXHR.responseText);
                console.log('error');
                console.log(response.description);
                console.log('The requested qty exceeds the maximum qty allowed in shopping cart');
            },
            success: function success(cart) {
                main_cart();
                $.getJSON("/cart.js", function(cart) {
                    refreshCart(cart);
                });
                check_discount();
            }
        });
    }

    $("body").on('click', ".cart-page-wrapper a[data-cart-remove]", function(r) {
        r.preventDefault();
        if ($('.cart-page-wrapper.hide_update').length == 0) {
            window.location = $(this).attr('href');
        } else {
            var line = parseInt($(this).attr('data-line'));
            $.ajax({
                type: 'POST',
                url: '/cart/change.js',
                dataType: 'json',
                data: {
                    line: line,
                    quantity: 0
                },
                success: function() {
                    main_cart();
                    $.getJSON("/cart.js", function(cart) {
                        refreshCart(cart);
                    });
                    check_discount();
                }
            });
        }
    });
    $("body").on('keyup', ".item_quantity_cart", function(r) {
        r.preventDefault();
        var input = $(this);
        if (input.val() == '' || parseInt(input.val()) == 0) {
            input.val(input.attr('data-cur_qty'));
            return false;
        }
        cart_page_ajax(input);
    });
    $("body").on('click', ".qty_change_cart", function(r) {
        r.preventDefault();
        var input = $(this).parent().find('.item_quantity_cart');
        var ip = parseInt(input.val());
        if ($(this).hasClass('increase')) {
            ip++;
        } else {
            ip--;
        }
        if (ip == 0) {
            input.val(1);
        } else {
            input.val(ip);
        }
        cart_page_ajax(input)
    });

//     $(".toggle_title").click(function() {
//         $(".cart_toggle").toggleClass("open-promo");
//     });
    $(".backtotop").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });

    $('.contact-form.subscribe_form').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var x = true;
        var em = form.find('#email_footer');
        form.find('.error_msg').remove();
        var err_msg = 'This is a required field.';
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (em.val().trim() == '' || !regex.test(em.val())) {
            $(em).parent().append('<span class="error_msg">' + err_msg + '</span>');
            $(em).parent().addClass('haserror');
            x = false;
        } else {
            $(em).parent().removeClass('haserror');
        }
        if (x == false) {
            $('.haserror:eq(0) input').trigger('focus');
            return false;
        }
        if (x) {
            $.ajax({
                type: "GET",
                url: form.attr("action"),
                data: form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c",
                contentType: "application/json; charset=utf-8",
                error: function(error) {
                },
                success: function(data) {
                    if (data.result != "success") {
                        var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                        }
                        $(em).parent().append('<span class="error_msg">' + message + '</span>');
                    } else {
                        form[0].reset();
                        $(em).parent().append('<span class="error_msg">Thank you for subscription!</span>');
                    }
                }
            });
        }
    });

    $('body').on('click', '.cart-popup-overlay, .cart-slider-popup-outer .action-close', function(e) {
        e.preventDefault();
        closepopupfree();
    });
    $('.input-checkbox').on('click', function(e) {
        $('.cart-slider-popup-body').toggleClass("active-pro");
    });
    if ($('.cart-item-slider').length) {
        $('.cart-item-slider').each(function(i, vv) {
            var show = 3;
            var scroll = 2;
            if ($(this).hasClass('is_four')) {
                show = 4;
                scroll = 4;
            }
            if ($(vv).length) {
                $(vv).slick({
                    slidesToShow: show,
                    slidesToScroll: scroll,
                    dots: true,
                    arrows: true,
                    infinite: false,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        });
    }

    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    $('body').on('click', '.is_gift_header .gift_header_icon', function(e) {
        e.preventDefault();
        check_discount();
    });
    $('body').on('submit', '#ContactForm_popup', function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("customer_form", "popup");
        }
    });
    $('.cart-slider-popup').each(function(i, v) {
        if ($(this).find('.slick-dots li').length <= 1) {
            $(this).find('.slick-dots').css('display', 'none !important');
        }
    });
});

$(".open_custom-popup_cl").click(function() {
    $("#get_1_for_all").addClass("show");
    $(".cart-popup-overlay").addClass("show");
});

$('.input-checkbox').change(function() {
    if ($(this).prop('checked')) {
        $(this).addClass('slider-overlay_aa');
        var selectedProductPrice = $(this).val();
        if (selectedProductPrice != '')
            selectedProductPrice = selectedProductPrice - selectedProductPrice;
        $('li.header-cart.is_gift_header').css("display", "none");
        $('.custom_pop_cl').addClass('cl_4_d_opacity');

    } else {
        $('.slider-item-inner').css("opacity", ".7");
        $('li.header-cart.is_gift_header').css("display", "list-item");
    }
});
$('.input-checkbox').change(function() {
});

$('.is_gift_header').click(function() {
    setTimeout(function() {
        $('.oz-pro').addClass('show');
        $(".cart-popup-overlay").addClass("show");
    }, 1000);
});

  // const btnBundles = document.querySelectorAll('.add_to_cart_ajax ')
  // const mediaQueryBundles = window.matchMedia( "(max-width: 375px)" );
  //
  //   if (mediaQueryBundles.matches) {
  //     btnBundles.forEach(element => {
  //       if(element.children[1].textContent == 'View Product') {
  //         element.children[1].textContent = 'View'
  //       }
  //     });
  //   }