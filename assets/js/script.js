$(document).ready(function () {
    var $slideWelcome = $('[data-js-slide="welcome"]');
    if($slideWelcome.hasClass('welcome')){
        fSlide();
    }
    function fSlide() {
        var $sliderControl = $('[data-js-slide-point]');
        $sliderControl.on('click',function () {
            fSlideOne();
            return false;
        })
        fAutoPlay(true);
        function fAutoPlay($set) {
            if($set){
                setInterval(fSlideOne, 20000);
            }
        }
        function fSlideOne() {
            var $sliderFrame = $('.slide');
            var $index = $('.slide.active').index($sliderFrame);
            $sliderFrame.eq($index).animate({marginLeft:'-100%'},1000,function () {
                $sliderFrame.eq($index).css('margin-left','0');
                $sliderFrame.removeClass('active');
                $sliderFrame.eq($index + 1).addClass('active');
                $('[data-js-slide-point]').removeClass('active');
                $('[data-js-slide-point=' + $sliderFrame.eq($index + 1).attr('data-js-slide-frame') + ']').addClass('active');
                $slideWelcome.append($sliderFrame.eq($index));
            })
        }
    }
    var $reviewsSlid = $('.reviews__content__wrap');
    var $reviewsContent = $('.reviews__content__item__point');
    var $reviewsControl = $('[data-js-reviews]');
    var $reviewsCurr = 0;
    fInitReviews();
    function fInitReviews() {
        $reviewsContent.eq(0).clone().appendTo($reviewsSlid);
        fFixImg();
    }
    $reviewsControl.on('click',function () {
        fSlideReviews($(this).attr('data-js-reviews'));
        return false;
    })
    function fSlideReviews(direction) {
        if(direction == 'prev'){
            if($reviewsCurr <= 0){
                $reviewsCurr = $reviewsContent.length -1;
            } else {
                $reviewsCurr = $reviewsCurr -1;
            }
            let $tempoSlide = $('.reviews__content__wrap .reviews__content__item__point');
            $reviewsContent.eq($reviewsCurr).clone().appendTo($reviewsSlid);
            fFixImg();
            $tempoSlide.animate({'margin-left':'-100%'},1000,function () {
                $tempoSlide.detach();
            })
        } else if (direction == 'next'){
            if($reviewsCurr >= $reviewsContent.length -1){
                $reviewsCurr = 0;
            } else {
                $reviewsCurr = $reviewsCurr +1;
            }
            let $tempoSlide = $('.reviews__content__wrap .reviews__content__item__point');;
            let tempoSlide = $reviewsContent.eq($reviewsCurr).clone().prependTo($reviewsSlid);
            fFixImg();
            tempoSlide.css('margin-left','-100%')
            tempoSlide.animate({'margin-left':'0'},1000,function () {
                $tempoSlide.detach();
            })
        }
    }
    function fFixImg() {
        var $tempCol = $('.reviews__content__wrap .reviews__content__item__point');
        for(i=0;i < $tempCol.length;i++){
            let heightWrap = $tempCol.eq(i).outerHeight();
            let heightContent = $tempCol.eq(i).find('img').outerHeight();
            if(heightContent - 50 < heightWrap){
                $tempCol.eq(i).find('img').css({'height':'calc(100% - 50px)','width':'auto'})
            }
        }
    }
    var $clientControl = $('[data-js-client]');
    var $clientContent = $('.client__list__wrap__body');
    $clientControl.on('click',function () {
        let $direction = $(this).attr('data-js-client');
        if ($direction == 'up'){
            if($clientContent.css('bottom').slice(0,-2) <= ($clientContent.outerHeight() - $('.client__list__wrap').outerHeight())){
                $clientContent.animate({bottom: +$clientContent.css('bottom').slice(0,-2) + 100 +'px'},250);
            }
        } else if ($direction == 'down'){
            if($clientContent.css('bottom').slice(0,-2) > 0){
                $clientContent.animate({bottom: +$clientContent.css('bottom').slice(0,-2) - 100 +'px'},250);
            }
        }
        return false
    })
})