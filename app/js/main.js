//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js
//=include ../../node_modules/slick-carousel/slick/slick.js
//=include ../../node_modules/animejs/anime.min.js


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
  $(".ajax-form").submit((event) => {
    event.preventDefault();
    const form = $(event.target);
    const form_data = form.serialize();

    form.addClass('loading')

    $.ajax({
      type: "POST",
      url: "/mailer.php",
      data: form_data,
      success: function success() {
        form.removeClass('loading').addClass('submitted');
        form.find('.input').fadeOut(500);
        setTimeout(function () {
          form.find('.callback-form-message--success').fadeIn(), 600;
        }, 600);
      },
      error: function error() {
        form.removeClass('loading');
        form.find('.callback-form-message--error').fadeIn(), 600;
      }
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


  // sanzhar changes
  (function stepLeft() {
    let stepBool = true;
    let stepBool2 = true;
    // STEP LEFT
    
    let stepLMain = document.querySelector('.--left');
    let stepLFirst = document.querySelector('.steps-item__left-1');
    let stepLSecond = document.querySelector('.steps-item__left-2');
    //  STEP RIGHT
    let stepRMain = document.querySelector('.--right');
    let stepRFirst = document.querySelector('.steps-item__right-1');
    let stepRSecond = document.querySelector('.steps-item__right-2');
    // event listeners
    stepLMain.addEventListener('click', () => {
    // change width
    stepLMain.querySelector('.overlay').style.opacity = '1';
    stepRMain.querySelector('.overlay').style.opacity = '0';
    stepLMain.classList.remove('change-width-20');
     stepLMain.classList.add('change-width-80');
     stepRMain.classList.add('change-width-80');
     stepRMain.classList.add('change-width-20');
    // change left steps    
    stepLFirst.classList.add('beabsolute');
    stepLSecond.classList.remove('beabsolute');
    // change right steps 
    stepRFirst.classList.remove('beabsolute');
    stepRSecond.classList.add('beabsolute');
    if(stepBool) {
    (function animateSvg() {

      var basicTimeline = anime.timeline();
      var basicTimeline2 = anime.timeline();
      var basicTimeline3 = anime.timeline();
      basicTimeline
      .add({
        targets: ['#svg-left-1', '#svg-left-2','#svg-left-3'],
        opacity: 1,       
        scale: [         
          {value: 1.1, elasticity: 100},
          {value: 1, elasticity: 100}
        ],
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
      .add({
        targets: ['#svg-left-4', '#svg-left-5','#svg-left-6','#svg-left-7'],
        opacity: 1,       
        scale: [         
          {value: 1.1, elasticity: 100},
          {value: 1, elasticity: 100}
        ],
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
     
      basicTimeline2
      .add({
        targets: ['#p-left-1','#p-left-2','#p-left-3'],
        opacity: 1,       
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
      .add({
        targets: ['#p-left-4','#p-left-5','#p-left-6','#p-left-7'],
        opacity: 1,       
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })

      basicTimeline3
      .add({
        targets: ['#vg-left-1','#vg-left-2'],
        opacity: 1,
        translateX: '0',
        width: {
          value: '200'
        },
        easing: 'easeInOutQuad',
        delay: function(el,i,l) {
          return (1300 * (1 + i));
        },
        offset: '-=600'
      })
      .add({
        targets: ['#vg-left-3','#vg-left-4','#vg-left-5','#vg-left-6'],
        opacity: 1,
        translateX: '0',
        width: {
          value: '200'
        },
        easing: 'easeInOutQuad',
        delay: function(el,i,l) {
          return (1100 * (1 + i));
        },
        offset: '-=600'
      })
    
      var stepLH2 = anime({
        targets: '.steps-item__left-2__animation h2',
        opacity: 1,       
        delay: 200,
        easing: 'easeInOutQuad',
      });
    
 
      
    })(); stepBool = false;  }
  
  
    });  

    stepRMain.addEventListener('click', () => {
      // change width
      stepRMain.querySelector('.overlay').style.opacity = '1';
      stepLMain.querySelector('.overlay').style.opacity = '0';
      stepRMain.classList.remove('change-width-20');
      stepRMain.classList.add('change-width-80');
      stepLMain.classList.remove('change-width-80');
      stepLMain.classList.add('change-width-20');
     // change right steps    
     stepRFirst.classList.add('beabsolute');
     stepRSecond.classList.remove('beabsolute');    
     // change left steps  
     stepLFirst.classList.remove('beabsolute');
    stepLSecond.classList.add ('beabsolute');
    if(stepBool2) {
    (function animateSvg2() {
      var basicTimeline = anime.timeline();
      var basicTimeline2 = anime.timeline();
      var basicTimeline3 = anime.timeline();
      basicTimeline
      .add({
        targets: ['#svg-right-1', '#svg-right-2','#svg-right-3'],
        opacity: 1,       
        scale: [         
          {value: 1.1, elasticity: 100},
          {value: 1, elasticity: 100}
        ],
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
      .add({
        targets: ['#svg-right-4', '#svg-right-5','#svg-right-6'],
        opacity: 1,       
        scale: [         
          {value: 1.1, elasticity: 100},
          {value: 1, elasticity: 100}
        ],
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
     
      basicTimeline2
      .add({
        targets: ['#p-right-1','#p-right-2','#p-right-3'],
        opacity: 1,       
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })
      .add({
        targets: ['#p-right-4','#p-right-5','#p-right-6'],
        opacity: 1,       
        delay: function(el,i) {
          return 1000 * (1 + i);
        },
        easing: 'easeInOutQuad',
        offset: '-=600'
      })

      basicTimeline3
      .add({
        targets: ['#vg-right-1','#vg-right-2'],
        opacity: 1,
        translateX: '0',
        width: {
          value: '200'
        },
        easing: 'easeInOutQuad',
        delay: function(el,i,l) {
          return (1300 * (1 + i));
        },
        offset: '-=600'
      })
      .add({
        targets: ['#vg-right-3','#vg-right-4','#vg-right-5'],
        opacity: 1,
        translateX: '0',
        width: {
          value: '200'
        },
        easing: 'easeInOutQuad',
        delay: function(el,i,l) {
          return (1100 * (1 + i));
        },
        offset: '-=600'
      })

      var stepRH2 = anime({
        targets: '.steps-item__right-2__animation h2',
        opacity: 1,       
        delay: 200,
        easing: 'easeInOutQuad',
      });

    })(); stepBool2 = false; }
      
    });

    
    


  })();
  
})
