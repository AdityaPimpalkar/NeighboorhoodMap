 function navopen() {
    if ($('.search-box').hasClass('close')) {
      $('.search-box').removeClass('close').toggleClass('open');
    } else if($('.search-box').hasClass('open')) {
      $('.search-box').removeClass('open').toggleClass('close');
    }

    if ($('.results').hasClass('close')) {
      $('.results').removeClass('close').toggleClass('open');
    } else if($('.results').hasClass('open')) {
      $('.results').removeClass('open').toggleClass('close');
    }
}