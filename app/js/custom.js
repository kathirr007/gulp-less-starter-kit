"use strict";

define(['jquery', 'jquery/ui', 'slick', 'mage/translate'], function ($) {
  'use strict';

  $(document).ready(function () {
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
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      }]
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
    setTimeout(function () {
      $('#ui-id-1 .level0.nav-3').find('a').attr('href', '/newsinspiration');
      $('#ui-id-1 li.About').find('a').attr('href', 'https://www.hbftextiles.com/about/abouthbftextiles');
      $('#ui-id-1 li.About').find('a').attr('target', '_blank');
      $('#ui-id-1 li.Showrooms').find('a').attr('href', 'https://www.hbftextiles.com/about/showrooms');
      $('#ui-id-1 li.Showrooms').find('a').attr('target', '_blank');
      $('#ui-id-1 li.Find.Rep').find('a').attr('href', 'https://www.hbftextiles.com/about/findarep');
      $('#ui-id-1 li.Find.Rep').find('a').attr('target', '_blank');
      $('#ui-id-1 li.FAQ').find('a').attr('href', '/faq-hbft');
      $('#ui-id-1 li.Designers').find('a').attr('href', '/designers');
      $('#ui-id-1 li.Contact').find('a').attr('href', '/contact');
      $('#ui-id-1 li.Visit.HBF').find('a').attr('href', 'https://www.hbf.com/');
      $('#ui-id-1 li.Visit.HBF').find('a').attr('target', '_blank');
      $('.Sustainability.Certifications').find('a').attr('href', '/sustainability'); // $('.Sustainability.Certifications').find('a').attr('target','_blank');

      $('.Performance.Options.level1').find('a').attr('href', '/performance'); // $('.Performance.Options.level1').find('a').attr('target','_blank');

      $('.Price.Lists.level1.nav-1').find('a').attr('href', '/pricelists'); // $('.Price.Lists.level1.nav-1').find('a').attr('target','_blank');

      $('.Furniture.Partners.level1').find('a').attr('href', '/pricelists/index/furniturepartners'); // $('.Furniture.Partners.level1').find('a').attr('target','_blank');

      $('.Corporate.Social.Responsibility').find('a').attr('href', '/corporate-social-responsibility');
    }, 2000);
  });

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

  var itemAmount = parseInt($('#total_number_of_products').val());

  if (itemAmount) {
    $('.catalog-category-view').removeClass('no-result-found');
  } else {
    $('.catalog-category-view').addClass('no-result-found');
  }

  var existCondition2 = setInterval(function () {
    if ($('#toolbar-amount').length) {
      clearInterval(existCondition2);

      var _itemAmount = parseInt($('#total_number_of_products').val());

      $('#total_number_cate_product').text(_itemAmount + ' results');
      $('#total_number_of_products').text(_itemAmount + ' results');
      $('#page-title-heading').show();
      $("#layered-filter-block").show();
    } else {
      cat_title_no_product();
      $('#total_number_cate_product').text('0 result');
      $('#total_number_of_products').text('0 result');
    }
  }, 100);

  function cat_title_no_product() {
    $('#page-title-heading').hide();
    $("#layered-filter-block").hide();
  }

  function cookieIntegration() {
    if (document.cookie.indexOf('banner_removed=1') !== -1) {
      $('#closeCookieBtn').parent().hide();
    }

    $('#closeCookieBtn').click(function () {
      $(this).parent().hide();
      document.cookie = 'banner_removed=1';
    });
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
        var autoplaytime = 15000;

        if (window.autoplaytime) {
          autoplaytime = window.autoplaytime;
        }

        var sliderEl = $(".banner-slider");
        sliderEl.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          $('video').each(function () {
            $(this).get(0).pause();
          });
        });
        sliderEl.on('afterChange', function (event, slick, currentSlide, nextSlide) {
          if ($('.slick-slide.slick-current').find('video').length !== 0) {
            $('.banner-slider .video-wrapper video')[0].play();
          }
        });
        $('.icon-wrapper').on('click', function () {
          if ($('.icon-play').is(':hidden')) {
            $('.icon-pause').hide();
            $('.icon-play').show();
            $('.slick-slider').slick('slickPause');
          } else {
            $('.icon-pause').show();
            $('.icon-play').hide();
            $('.slick-slider').slick('slickPlay');
          }
        });
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
          pauseOnHover: false,
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
        });
      }
    }, 1000);
  }
  /* Homepage Banner Slider ends*/


  $(document).on('click', '.mob_subtotal_cart .mob_cart', function (e) {
    $('.opc-sidebar.opc-summary-wrapper').toggleClass('summary_mobile');
  });
  $(document).on('click', '.summary_mobile .action-close', function () {
    $('.opc-sidebar.opc-summary-wrapper').removeClass('summary_mobile');
  });
});
//# sourceMappingURL=maps/custom.js.map
