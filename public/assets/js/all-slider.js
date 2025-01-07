$(document).ready(function () {
  $(".testimonial-slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          fade: true,
        },
      },
    ],
  });
});
$(document).ready(function () {
  $(".product_slider").slick({
    dots: false, 
    arrows: true, 
    prevArrow: $(".custom_prev_arrow"), 
    nextArrow: $(".custom_next_arrow"), 
    infinite: true, 
    speed: 300, 
    slidesToShow: 4,
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});


