const swiperV = new Swiper('.swiper-container-v', {
	direction: 'vertical',
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},
	touchEventsTarget:"wrapper",
});

const swiperH = new Swiper(".swiper-container-h",{
	direction:"horizontal",
	allowTouchMove:false,
});
