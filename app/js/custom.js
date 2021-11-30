"use strict";

define(['jquery', 'jquery/ui', 'slick', 'mage/translate'], function ($) {
  'use strict';

  $(document).ready(function () {
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

      $('.Furniture.Partners.level1').find('a').attr('href', '/pricelists/index/gradedinpartners'); // $('.Furniture.Partners.level1').find('a').attr('target','_blank');

      $('.Corporate.Social.Responsibility').find('a').attr('href', '/corporate-social-responsibility');
    }, 2000); // $('#ui-id-1 .level0.nav-3').find('a').attr('href','/newsinspiration');
    // $('#ui-id-1 li.About').find('a').attr('href','https://www.hbftextiles.com/about/abouthbftextiles');
    // $('#ui-id-1 li.About').find('a').attr('target','_blank');
    // $('#ui-id-1 li.Showrooms').find('a').attr('href','https://www.hbftextiles.com/about/showrooms');
    // $('#ui-id-1 li.Showrooms').find('a').attr('target','_blank');
    //   $('#ui-id-1 li.Find.Rep').find('a').attr('href','https://www.hbftextiles.com/about/findarep');
    // $('#ui-id-1 li.Find.Rep').find('a').attr('target','_blank');
    // $('#ui-id-1 li.FAQ').find('a').attr('href','/faq-hbft');
    // $('#ui-id-1 li.Designers').find('a').attr('href','/designers');
    // $('#ui-id-1 li.Contact').find('a').attr('href','/contact');
    // $('#ui-id-1 li.Visit.HBF').find('a').attr('href','https://www.hbf.com/');
    // $('#ui-id-1 li.Visit.HBF').find('a').attr('target','_blank');
    // $('.Sustainability.Certifications').find('a').attr('href','/sustainability');
    // $('.Sustainability.Certifications').find('a').attr('target','_blank');
    // $('.Performance.Options.level1').find('a').attr('href','/performance');
    // $('.Performance.Options.level1').find('a').attr('target','_blank');
    // $('.Price.Lists.level1.nav-1').find('a').attr('href','/pricelists');
    // $('.Price.Lists.level1.nav-1').find('a').attr('target','_blank');
    // $('.Furniture.Partners.level1').find('a').attr('href','/pricelists/index/gradedinpartners');
    // $('.Furniture.Partners.level1').find('a').attr('target','_blank');
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

  function cookieIntegration() {
    if (document.cookie.indexOf('banner_removed=1') !== -1) {
      $('#closeCookieBtn').parent().hide();
    }

    $('#closeCookieBtn').click(function () {
      $(this).parent().hide();
      document.cookie = 'banner_removed=1';
    });
  }
});
//# sourceMappingURL=maps/custom.js.map
