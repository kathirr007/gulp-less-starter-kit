define([
    'jquery',
    'jquery/ui',
    'slick',
    'mage/translate'
],
function ($) {
    'use strict'
    $(document).ready(function () {
        remapUrl();
        cat_title_no_product();
        heroBannerReInit();
        cookieIntegration();
        $(".liked-product-slider").slick({
            arrows: true,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1.3,
                        slidesToScroll: 1
                    }
                },
            ]
        });
        $('body').click(function () {
            $('.submenu').removeClass('show');
            $('.category-item').removeClass('active');
        });


        $(window).load(function () {
            serchBox();
        });
        $(window).resize(function () {
            serchBox();
        });
    });

    function remapUrl() {
        $('.Price.Lists.level1.nav-1 a').attr('href', '/pricelists');
        $('.Performance.Options.level1 a').attr('href', '/performance');
        $('.Sustainability.Certifications a').attr('href', '/sustainability');
        $('.Furniture.Partners.level1 a').attr('href', '/pricelists/index/furniturepartners');
        $('li.FAQ a').attr('href', '/faq-hbft');
        $('a.level-top[aria-label="News + Inspiration"]').attr('href', '/newsinspiration');
        $('li.About.Us a').attr({'href': 'https://www.hbftextiles.com/about/abouthbftextiles', 'target':'_blank'});
        $('li.Designers a').attr('href', '/designers');
        $('.Corporate.Social.Responsibility a').attr('href', '/corporate-social-responsibility');
        $('li.Find.a.Rep a').attr({'href': 'https://www.hbftextiles.com/about/findarep', 'target':'_blank'});
        $('li.Contact a').attr('href', '/contact');
        $('li.Showrooms a').attr({'href': 'https://www.hbftextiles.com/about/showrooms', 'target':'_blank'});
        $('li.Visit.HBF a').attr({'href': 'https://www.hbf.com/', 'target':'_blank'});
    }

    function serchBox() {
        if ($(window).width() <= 767) {
            if ($('.page-header .center-search').length > 0) {
                $('.page-header .center-search').insertBefore($('[id="store.menu"] .navigation'));
            }
            if ($('.page-header .block.block-search').length > 0) {
                $('.page-header .block.block-search').insertBefore($('[id="store.menu"] .navigation'));
            }
        } else {
            if ($('[id="store.menu"] .block.block-search').length > 0) {
                $('[id="store.menu"] .block.block-search').insertAfter($('.page-header .panel.header > .quote-link'));
            }
            if ($('[id="store.menu"] .center-search').length > 0) {
                $('[id="store.menu"] .center-search').insertAfter($('.page-header .panel.header > .quote-link'));
            }
        }
    }

    const itemAmount = parseInt($('#total_number_of_products').val())
    if (itemAmount) {
        $('.catalog-category-view').removeClass('no-result-found')
    } else {
        $('.catalog-category-view').addClass('no-result-found')
    }

    const existCondition2 = setInterval(function () {
        if ($('#toolbar-amount').length) {
            clearInterval(existCondition2)
            const itemAmount = parseInt($('#total_number_of_products').val())
            $('#total_number_cate_product').text(itemAmount + ' results')
            $('#total_number_of_products').text(itemAmount + ' results')
            $('#page-title-heading').show();
            $("#layered-filter-block").show();

        } else {
            cat_title_no_product();
            $('#total_number_cate_product').text('0 result')
            $('#total_number_of_products').text('0 result')
        }
    }, 100)


    function cat_title_no_product() {
        $('#page-title-heading').hide();
        $("#layered-filter-block").hide();

    }



    function cookieIntegration() {
        if (document.cookie.indexOf('banner_removed=1') !== -1) {
            $('#closeCookieBtn').parent().hide()
        }
        $('#closeCookieBtn').click(function () {
            $(this).parent().hide()
            document.cookie = 'banner_removed=1'
        })
    }

    /* Homepage Banner Slider */
    /* function homeBannerReInit() {
        if ($(".cms-hbft-homepage .pagebuilder-slider.banner-slider").length > 0) {
            let sliderEl = $(".pagebuilder-slider.banner-slider");
            let {
                showDots,
                infiniteLoop,
                autoplay,
                autoplaySpeed,
                showArrows,
                fade,
            } = sliderEl.data();

            if(sliderEl.hasClass('slick-initialized')) {
                sliderEl.slick('unslick');
            }

            sliderEl.slick({
                dots: showDots,
                infinite: infiniteLoop,
                autoplay: autoplay,
                autoplaySpeed: autoplaySpeed,
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                pauseOnFocus: false,
                pauseOnHover: false,
                arrows: showArrows,
                adaptiveHeight: true,
                fade,
            });

        }
    } */

    function heroBannerReInit() {
        setTimeout(function () {
          if ($(".banner-slider").length > 0) {
            let autoplaytime = 15000
            if (window.autoplaytime) {
              autoplaytime = window.autoplaytime
            }
            let sliderEl = $(".banner-slider");

            sliderEl.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              $('video').each(function () {
                $(this).get(0).pause()
              })
            })
            sliderEl.on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if ($('.slick-slide.slick-current').find('video').length !== 0) {
                $('.banner-slider .video-wrapper video')[0].play()
              }
            })

            $('.icon-wrapper').on('click', function () {
              if ($('.icon-play').is(':hidden')) {
                $('.icon-pause').hide()
                $('.icon-play').show()
                $('.slick-slider').slick('slickPause')
              } else {
                $('.icon-pause').show()
                $('.icon-play').hide()
                $('.slick-slider').slick('slickPlay')
              }
            })

            sliderEl.slick({
              dots: true,
              infinite: true,
              autoplay: true,
              speed: 300,
              autoplaySpeed: autoplaytime,
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              pauseOnFocus: false,
              pauseOnHover: true,
              arrows: false,
              adaptiveHeight: true,
              responsive: [{
                breakpoint: 786,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  draggable: true
                }
              }]
            })
          }

        }, 1000);

      }
    /* Homepage Banner Slider ends*/
  $(document).on('click', '.mob_subtotal_cart .mob_cart', function (e) {

    $('.opc-sidebar.opc-summary-wrapper').toggleClass('summary_mobile')
  })

  $(document).on('click', '.summary_mobile .action-close', function () {
    $('.opc-sidebar.opc-summary-wrapper').removeClass('summary_mobile')
  })

});
