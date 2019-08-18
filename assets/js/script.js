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
})