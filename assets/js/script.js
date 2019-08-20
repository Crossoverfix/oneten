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
            tempoSlide.css('margin-left','-100%')
            tempoSlide.animate({'margin-left':'0'},1000,function () {
                $tempoSlide.detach();
            })
        }
    }
})