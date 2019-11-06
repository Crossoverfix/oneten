$(document).ready(function () {
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
})