    $(document).ready(function(){
  $('.bxslider').bxSlider({
    adaptiveHeight:true,
    minSlides: 3,
  maxSlides: 3,
  slideWidth: 300,
  slideMargin: 5,
  speed: 2000,
 pager:false
});
$('#s1').cycle({
    fx:     'toss',
    speed:  1000,
    next:   '#s1',
    timeout: 0
});
$('#s2').cycle({
    fx:     'fade',
    speed:  1000,
    next:   '#s2',
    timeout: 0
});
$('#s3').cycle({
    fx:     'fade',
    speed:  1000,
    next:   '#s3',
    timeout: 0
});
});

