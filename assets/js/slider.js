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
        let $tempoSlideMas = $('.reviews__mail__wrap__frame .reviews__mail__message');
        $reviewsContent.eq($reviewsCurr).clone().appendTo($reviewsSlid);
        $reviewsMassege.eq($reviewsCurr).clone().appendTo($reviewsMassegeFrame);
        fFixImg();
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
        fFixImg();
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