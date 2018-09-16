$(window).on('scroll', function(){
    if($(window).scrollTop()){
        $('nav').addClass('blue');
    }
    else {
        $('nav').removeClass('blue');
    }
})

$(document).ready(function(){
    $("button.delete.question").on('click', function(){
        $(".popup").fadeIn('slow');
    });
});