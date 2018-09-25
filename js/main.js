$(window).on('scroll', function(){
    if($(window).scrollTop()){
        $('nav').addClass('blue');
    }
    else {
        $('nav').removeClass('blue');
    }
});

$(document).on('click', '.card.questions', function(){
  $('.questions-container').animate({
    width: '450px'
  }, 500);
  $('.my-questions').animate({
    width: '380px'
  }, 500)
  $('.question-answers').fadeIn(600);
  $(this).addClass('blue');
  $('.card.questions').not(this).removeClass('blue');
 
}
);


 $(document).ready( function(){

    $('.popup').on('click', function(){
      if($(event.target).is("#close")){
        $(".cover").fadeOut('slow');
        $(".popup").fadeOut('slow');
      }
    });
  
    $('.cover').on('click', function(){
      $(".cover").fadeOut('slow');
      $(".popup").fadeOut('slow');
    });

    $('.container.edit').on('click', function(){
        if($(event.target).is("#close")){
          $(".cover").fadeOut('slow');
          $(".container.edit").fadeOut('slow');
          }
          });
      
          $('.cover').on('click', function(){
          $(".cover").fadeOut('slow');
          $(".container.edit").fadeOut('slow');
          });
    });

