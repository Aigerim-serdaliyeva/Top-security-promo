//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js
//=include ../../node_modules/slick-carousel/slick/slick.js


jQuery(document).ready(function($) {
  // smooth scroll to anchor
  $('.js-scroll-to').on('click', function(event) {
    event.preventDefault();
    if($(this).attr("href") != '/'){
      $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 100 }, 1000);
    } else {
      $("html, body").animate({ scrollTop: 0}, 1000);
    }
    $(this).addClass('active').parent().siblings().find('.js-scroll-to').removeClass('active')
    $('.mobile, .navbar, .navbar-burger').removeClass('active');
  })
  $('.screenshot-btn').on('click', (event) => {
    $(event.target).toggleClass('active');
    $('.screenshot').toggleClass('active');
  })
  // smooth scroll to anchor
  // popup
  function popup () {
    $('.js-open-callback').on('click', (event) => {
      $('.popup-overlay').toggleClass('active');
      event.preventDefault();
      const anchor = $(event.target).attr('href');
      const modal = $(anchor);
      modal.toggleClass('active');
    });
    $('.popup-close').on('click', () => {
      $('.popup-overlay').removeClass('active');
      $('.popup').removeClass('active')
    })
  }
  popup();
  // popup
  // inputs label logic
  function inputLabel () {
    $('.input-value').on('focus', (event) => {
      $(event.target).parent().find('label').addClass('focus')
    })
    $('.input-value').on('blur', (event) => {
      $(event.target).parent().find('label').removeClass('focus')
    })
    $('.input-value').on('input', (event) => {
      if (event.target.value.length) {
        $(event.target).addClass('has-value');
        $(event.target).parent().find('label').addClass('has-value');
      } else {
        $(event.target).removeClass('has-value');
        $(event.target).parent().find('label').removeClass('has-value');
      }
    });
  }
  inputLabel();
  // inputs label logic
  // mobile menu
  function mobileMenu() {
    $('.navbar-burger').on('click', (event) => {
      $(event.target).toggleClass('active');
      $('.mobile').toggleClass('active');
      $('.navbar').toggleClass('active');
    })
  }
  mobileMenu();
  // mobile menu
  // scroll in elements activation
  function scrollIn(block, x, $class) {
      const wTop = $(window).scrollTop(),
        wHeight = $(window).height(),
        dist = x || 100,
        $classN = $class || "fade-in";

      block.each(function() {
        const bTop = $(this).offset().top;
        let playAt = 0;
        if ($(this).data('delay')) {
            playAt = bTop - wHeight + dist + parseInt($(this).data('delay'), 10);
        } else {
            playAt = bTop - wHeight + dist
        }
        playAt < wTop ? $(this).addClass($classN) : false;
      });
  };
  scrollIn($('.anim'), 100, 'active');
  // scroll in elements activation
  // spy crawler
  function spyCrawler() {
    const wTop = $(window).scrollTop(),
      bheight = $('body').height(),
      wheight = $(window).height(),
      $spyTo = $('.spy-it');
    
    $spyTo.each(function() {
      const $block = $(this),
        blockTop = $block.offset().top - 100;
      if(wTop >= blockTop) {
        $('.spy[href="#'+$block.attr('id')+'"]')
        .addClass('active')
        .parent()
        .siblings()
        .find('.spy')
        .removeClass('active');
      } else if(wTop < 100) {
        $('.spy').removeClass('active')
      } else if((bheight - wTop) <= wheight + 40) {
        $('.navbar-menu-item').last().find('.navbar-menu-link').addClass('active')
        .parent()
        .siblings()
        .find('.spy')
        .removeClass('active')
      }
    })
  }
  spyCrawler()
  $(window).on('scroll', () => {
    spyCrawler()
    scrollIn($('.anim'), 100, 'active');
  });
  // ajax-form
  $(".ajax-form").submit((event) => { //устанавливаем событие отправки для формы с id=form
    event.preventDefault();
    const form = $(this);
    const form_data = $(this).serialize(); //собераем все данные из формы

    $(".ajax-form").submit(function (event) {
      //устанавливаем событие отправки для формы с id=form
      event.preventDefault();
      var form = $(event.target);
      var form_data = $(event.target).serialize(); //собераем все данные из формы
      $.ajax({
        type: "POST", //Метод отправки
        url: "/mailer.php", //путь до php фаила отправителя
        data: form_data,
        success: function success() {
          //код в этом блоке выполняется при успешной отправке сообщения
          form.addClass('submitted');
          form.find('.input').fadeOut(500);
          setTimeout(function () {
            form.find('.callback-form-message').fadeIn(), 600;
          }, 600);
        }
      });
    });
  });
  // ajax-form
  // team-carousel
  var teamSumm = $('.team-carousel').find('.team-mate').length;
  $('.team-carousel').slick({
    arrows: false,
    centerMode: true,
    variableWidth: true,
    infinite: false,
    focusOnSelect: true,
    initialSlide: Math.round(teamSumm/2) - 1
  });
  // team-carousel
  // testimonials carousel
  $('.testimonials-carousel').on('init', () => {
    $('.testimonials-nav').eq(0).addClass('active')
  });
  $('.testimonials-carousel').slick({
    slidesToShow: 1,
    infinite: false,
    arrows: false,
  });
  $('.testimonials-carousel').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    $('.testimonials-nav').eq(nextSlide).addClass('active').siblings().removeClass('active')
  });
  $('.testimonials-arrow--left').click(() => {
    $('.testimonials-carousel').slick('slickPrev')
  });
  $('.testimonials-arrow--right').click(() => {
    $('.testimonials-carousel').slick('slickNext')
  });
  $('.testimonials-nav').click((event) => {
    const $this = $(event.target);
    const index = $('.testimonials-nav').index($this);
    console.log(index)
    $this.addClass('active').siblings().removeClass('active');
    $('.testimonials-carousel').slick('slickGoTo', index);
  });
  // testimonials carousel
  window.onload = () => {

  };
})
