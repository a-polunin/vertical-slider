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

swiperH.slideTo(0);

const rangeSliderContainer = document.querySelector(".input_container")
swiperV.on("slideChange",function(){
	swiperV.realIndex == 2 ? rangeSliderContainer.style.visibility = "visible" : 
							 rangeSliderContainer.style.visibility = "hidden";
})