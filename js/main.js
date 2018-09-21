$(window).on('scroll', function(){
    if($(window).scrollTop()){
        $('nav').addClass('blue');
    }
    else {
        $('nav').removeClass('blue');
    }
});


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

