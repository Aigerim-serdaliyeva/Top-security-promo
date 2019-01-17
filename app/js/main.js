//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/vue/dist/vue.js
//=include ../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js
//=include ../../node_modules/slick-carousel/slick/slick.js
//=include ../../node_modules/webp/modernizr-custom.js





var stepsVue = new Vue({
  el: '#sanj-steps',
  data: {
   leftWidth: 1,
   rightWidth: 1,
   leftShow: true,
   rightShow: true,
   lhShow: false,
   rhShow: false,
   lists: [
     { id: 1, class: 'content__img', img: 'assets/media/images/content/steps-before-image1.jpg' },
     { id: 2, class: 'content__svg', img: ''  },
     { id: 3, class: 'content__img', img: 'assets/media/images/content/steps-before-image2.jpg' },
     { id: 4, class: 'content__svg', img: '' },
     { id: 5, class: 'content__img', img: 'assets/media/images/content/steps-before-image3.jpg' },
     { id: 6, class: 'content__svg', img: '' },
     { id: 7, class: 'content__img', img: 'assets/media/images/content/steps-before-image4.jpg' },
     { id: 8, class: 'content__svg', img: '' },
     { id: 9, class: 'content__img', img: 'assets/media/images/content/steps-before-image5.jpg' },
     { id: 10, class: 'content__svg', img: '' },
     { id: 11, class: 'content__img', img: 'assets/media/images/content/steps-before-image6.jpg' },
     { id: 12, class: 'content__svg', img: '' },
     { id: 13, class: 'content__img', img: 'assets/media/images/content/steps-before-image7.jpg' },
     
   ]
  },
  methods: {
    changeLeftWidth() {
      this.leftWidth = 2; this.rightWidth = 1;
      this.leftShow =  false; this.rightShow = true;
      this.lhShow = true; this.rhShow = false
    },
    changeRightWidth() {
      this.leftWidth = 1; this.rightWidth = 2;
      this.leftShow =  true; this.rightShow = false;
      this.rhShow = true; this.lhShow = false;
    }
  }
})



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
        blockTop = $block.offset().top - 150;
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
  
  // (function hoverSteps() { 
  //   let tpLeft = document.getElementsByClassName('--left')[0];     
  //   let tpRight = document.getElementsByClassName('--right')[0];
  //   function directionHover(selHover,selHovered) {
  //     selHover.addEventListener('mouseover', () => {
  //       selHover.classList.add('tp-w55');
  //       selHovered.classList.add('tp-w45');
  //       selHover.querySelector('.overlay').classList.add('lr-opacity');
  //     });
  //     selHover.addEventListener('mouseout', () => {
  //       selHover.querySelector('.overlay').classList.remove('lr-opacity');
  //       selHover.classList.remove('tp-w55');
  //       selHover.classList.remove('tp-w45');
  //       selHovered.classList.remove('tp-w55');
  //       selHovered.classList.remove('tp-w45');
  //     });          
  //   }
  //   directionHover(tpLeft,tpRight);
  //   directionHover(tpRight,tpLeft); 
  // })();

  (function aboutPlay() {
    $('#about-iframe').click(function() {
      $('#about-iframe').css('pointer-events','all');
    });
  })();

  


    
 
  //  anime endlet
let jivoClick = document.querySelector('.top-jivo');
let jivoBool = true;
function jivoVisible() {
  // $('#jivo-iframe-container,#jivo_container,[class^="jivo"],[id^="jivo"]').css('visibility','visible')  ;
  $('.globalClass_ET').show();
}
function jivoInVisible() {
  // $('#jivo-iframe-container,#jivo_container,[class^="jivo"],[id^="jivo"]').css('visibility','hidden');
  $('.globalClass_ET').hide();
}


document.querySelectorAll('.services__block').forEach((el) => {
  el.addEventListener('click',() => {
    el.querySelector('.services__block__image').style.transform = 'translateX(0)';
    el.querySelector('.services__block__text').style.transform = 'translateX(0)';    
    el.querySelector('.services__block__text').classList.remove('op0');    
  })
});


function openLicense() {
  let first,second,overlay;
  first = document.querySelector('.first-hidden');
  second =  document.querySelector('.second-hidden');
  overlay = document.querySelector('.license-overlay');
  document.querySelector('.license').addEventListener('click', (e) => {
    e = event.target; 
    switch (e.id) {      
      case 'license-first':
        first.classList.toggle('dn');
        overlay.classList.toggle('dn');         
        break;
      case 'license-second':
        second.classList.toggle('dn');
        overlay.classList.toggle('dn');
        break;        
    }
  }) 
  document.querySelectorAll('.license-hidden > button').forEach((el) => {
    el.addEventListener('click',() =>{
      el.parentElement.classList.toggle('dn');
      overlay.classList.toggle('dn'); 
    })
  });
};

jivoClick.addEventListener('click', () => {    
      jivoVisible()
      jivo_api.open();           
      setTimeout(() => {
        document.querySelector('#jivo_close_button').addEventListener('click',() =>{
          jivoInVisible()
        })
      }, 500);
    });

    
    if(window.matchMedia("(min-width:960px)").matches) {
      document.querySelector('#license-first').addEventListener('click',() =>{
        window.open('assets/documents/license-first.pdf','_blank')
      })
      document.querySelector('#license-second').addEventListener('click',() =>{
        window.open('assets/documents/license-second.pdf','_blank')
      })
    }

    if(window.matchMedia("(max-width:960px)").matches) {
      $('.license p:nth-child(1)').insertAfter('#license-first');
      $('.license-icon').insertBefore('.license > .container > h2');
      openLicense();
      document.querySelectorAll('.services__button').forEach((el) => {
        el.addEventListener('click',() => {
          if(el.textContent === 'Скрыть') {
            el.textContent = 'Подробнее';
          } else {
            el.textContent = 'Скрыть'
          }          
          el.nextElementSibling.classList.toggle('text-dn');                 
        })
      });
    }
    
    $('.your-class').slick({
        arrows:false,
        dots:false
    });
  
})
