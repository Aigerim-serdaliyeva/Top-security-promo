let t1 = anime.timeline({
    easing: 'linear',
    autoplay: false
  });

  let svgAnimTop = document.querySelector('.tp-step-left .svg-anim-top path'),
  svgAnimBot = document.querySelector('.tp-step-left .svg-anim-bottom path'),
  imageDuration = 1000;       
  t1
  .add({
   targets: '#left-svg1',
   opacity: {
     value: 1,
     duration:1000
   },
   scale: [1, 1.1, 1],
   duration: imageDuration 
  })
  .add({
    targets: svgAnimTop,
    d: ['M0 4H0', 'M0 4H180'],
    duration: 500          
  })       
  .add({
    targets: '#left-svg2',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: imageDuration          
  })
  .add({
    targets: svgAnimTop,
    d: ['M0 4H360', 'M0 4H520'],
    duration: 500          
  })    
  .add({
    targets: '#left-svg3',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: imageDuration          
  })
  .add({
    targets: '.tp-step-left .content-right-svg path',
    strokeDashoffset: [anime.setDashoffset, 0],                  
    duration: 1000,
    delay: function(el, i) { return i * 150 },          
    complete: function(el) {
      document.querySelector('.tp-step-left .content-right-svg').classList.add('svg-anim-right')
    }
  })                
  .add({
    targets: '#left-svg4',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: imageDuration          
  })
  .add({
    targets: svgAnimBot,
    translateX: ['100%', '67%'],
    duration: 500          
  })   
  .add({
    targets: '#left-svg5',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: imageDuration          
  }) 
  .add({
    targets: svgAnimBot,
    translateX: ['40%', '0'],
    duration: 500          
  })  
  .add({
    targets: '#left-svg6',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: imageDuration          
  })
  .add({
    targets: '.tp-step-left .content-left-svg path',
    strokeDashoffset: [anime.setDashoffset, 0],                  
    duration: 1000,
    delay: function(el, i) { return i * 150 },          
    complete: function(el) {
      document.querySelector('.tp-step-left .content-left-svg').classList.add('svg-anim-left')
    }
  })  
  .add({
    targets: '#left-svg7',
    opacity: {
      value: 1,
      duration:1000
    },
    scale: [1, 1.1, 1],
    duration: 1500          
  })                        