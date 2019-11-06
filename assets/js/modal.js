$(document).ready(function () {
    var $modallTriger = $('[data-js-modal-trigger]');
    var $modallContent = $('[data-js-modal-content]');
    $modallTriger.on('click',function () {
        let target = $(this).attr('data-js-modal-trigger');
        $('[data-js-modal-content="'+ target +'"]').addClass('active');
        $('.modal').addClass('active');
        $('body').addClass('modal-mod');
        return false
    })
    $(document).mouseup(function (e) {
        var $object = $modallContent; // тут указываем ID элемента
        if (!$object.is(e.target) // если клик был не по нашему блоку
            && $object.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.modal').removeClass('active');
            $modallContent.removeClass('active');
            $('body').removeClass('modal-mod');
        }
    })
    window.addEventListener("keydown", function(e){
        if (e.keyCode == 27) {
            $('.modal').removeClass('active');
            $modallContent.removeClass('active');
            $('body').removeClass('modal-mod')
            ;}
    }, true);
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
    var $reviewsMassege = $('.reviews__mail__message');
    var $reviewsMassegeFrame = $('.reviews__mail__wrap__frame');
    fInitReviews();
    function fInitReviews() {
        $reviewsContent.eq(0).clone().appendTo($reviewsSlid);
        $reviewsMassege.eq(0).clone().appendTo($reviewsMassegeFrame);
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
            let $tempoSlideMas = $('.reviews__mail__wrap__frame .reviews__mail__message');
            $reviewsContent.eq($reviewsCurr).clone().appendTo($reviewsSlid);
            $reviewsMassege.eq($reviewsCurr).clone().appendTo($reviewsMassegeFrame);
            $tempoSlide.animate({'margin-left':'-100%'},1000,function () {
                $tempoSlide.detach();
            })
            $tempoSlideMas.animate({'margin-left':'-100%'},1000,function () {
                $tempoSlideMas.detach();
            })
        } else if (direction == 'next'){
            if($reviewsCurr >= $reviewsContent.length -1){
                $reviewsCurr = 0;
            } else {
                $reviewsCurr = $reviewsCurr +1;
            }
            let $tempoSlide = $('.reviews__content__wrap .reviews__content__item__point');
            let $tempoSlideMas = $('.reviews__mail__wrap__frame .reviews__mail__message');
            let tempoSlide = $reviewsContent.eq($reviewsCurr).clone().prependTo($reviewsSlid);
            let tempoSlideMas = $reviewsMassege.eq($reviewsCurr).clone().prependTo($reviewsMassegeFrame);
            tempoSlide.css('margin-left','-100%')
            tempoSlideMas.css('margin-left','-100%')
            tempoSlide.animate({'margin-left':'0'},1000,function () {
                $tempoSlide.detach();
            })
            tempoSlideMas.animate({'margin-left':'0'},1000,function () {
                $tempoSlideMas.detach();
            })
        }
    }
    function fFixImg() {
        var $tempCol = $('.reviews__content__wrap .reviews__content__item__point');
        for(i=0;i < $tempCol.length;i++){
            let heightWrap = $tempCol.eq(i).outerHeight();
            let heightContent = $tempCol.eq(i).find('img').outerHeight();
            if(heightContent > heightWrap){
                $tempCol.eq(i).find('img').css({'height':'100%','width':'auto'})
            }
            let widthWrap = $tempCol.eq(i).outerWidth();
            let widthContent = $tempCol.eq(i).find('img').outerWidth();
            if(widthContent > widthWrap){
                $tempCol.eq(i).find('img').css({'width':'100%','height':'auto'})
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
    var $mobilCollapse = $('[data-js-collapse]');
    $mobilCollapse.on('click',function () {
        $mobilCollapse.toggleClass('active');
        $('.header__nav__first').toggleClass('active');
        $('.header__nav__second').toggleClass('active');
    })
    var $auditTabs = $('[data-js-tabs]');
    $auditTabs.on('click',function () {
        let $numb = $(this).attr('data-js-tabs');
        $('[data-js-tab]').removeClass('active');
        $('[data-js-tabs]').removeClass('active');
        $('[data-js-tabs="'+ $numb +'"]').addClass('active');
        $('[data-js-tab="'+ $numb +'"]').addClass('active');
        return false;
    })
    var $questionAcardions = $('.question__wrap li');
    $questionAcardions.on('click',function () {
        $(this).toggleClass('active');
    })
    var $priceShow = $('[data-js-price]');
    $priceShow.on('click',function () {
        $(this).siblings('.price__white__info__card__option__more__content').toggleClass('active');
        return false;
    })
    var $priceDrop = $('[data-js-drop]');
    $priceDrop.on('click',function () {
        $(this).toggleClass('active');
    })
    var $priceSlidBtn = $('[data-js-slide-price]');
    var $priceSlidContainer = $('.price__white__info');
    $priceSlidBtn.on('click',function () {
        let direction = $(this).attr('data-js-slide-price');
        fSlidePrice(direction);
        return false;
    })
    function fSlidePrice(directions) {
        let slideWidth = $('.price__white__info__card').eq(0).outerWidth() + 10;
        if(directions == 'next'){
            $('.price__white__info__card').eq(0).animate({marginLeft:'-' + slideWidth + 'px'},500,function(){
                $('.price__white__info__card').eq(0).css('margin-left','10px');
                $('.price__white__info__card').eq(0).appendTo($priceSlidContainer);
            });
        } else if(directions == 'prev'){
            $('.price__white__info__card').eq(-1).css('margin-left',- slideWidth);
            $('.price__white__info__card').eq(-1).prependTo($priceSlidContainer);
            $('.price__white__info__card').eq(0).animate({marginLeft:'10px'},500);
        }
    }
    var $mapSlidBtn = $('[data-js-contact-slider]');
    var $mapSlidContainer = $('.contact__slider__wrap__content');
    $mapSlidBtn.on('click',function () {
        let direction = $(this).attr('data-js-contact-slider');
        fSlideContact(direction);
        return false;
    })
    function fSlideContact(directions) {
        let slideWidth = $('.contact__slider__wrap__content__item').eq(0).outerWidth() + 10;
        if(directions == 'next'){
            $('.contact__slider__wrap__content__item').eq(0).animate({marginLeft:'-' + slideWidth + 'px'},500,function(){
                $('.contact__slider__wrap__content__item').eq(0).css('margin-left','10px');
                $('.contact__slider__wrap__content__item').eq(0).appendTo($mapSlidContainer);
            });
        } else if(directions == 'prev'){
            $('.contact__slider__wrap__content__item').eq(-1).css('margin-left',- slideWidth);
            $('.contact__slider__wrap__content__item').eq(-1).prependTo($mapSlidContainer);
            $('.contact__slider__wrap__content__item').eq(0).animate({marginLeft:'10px'},500);
        }
    }

})