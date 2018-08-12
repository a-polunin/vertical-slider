const thumbImage = document.querySelector(".thumb-image");
const sliderInput = document.querySelector(".slider_input");
sliderInput.value = 0;
const stopPoints = [0,50,100];

thumbImage.ontouchstart = function(e){
  const thumbCoords = getCoords(thumbImage);
  
  const touch = e.changedTouches[0];
  let endSwipeX = touch.pageX;
 
  const shiftX = endSwipeX - thumbCoords.left;

    const sliderCoords = getCoords(sliderInput);
  
    thumbImage.ontouchmove = (e)=>{
    const touch = e.changedTouches[0];
    let endSwipeX = touch.pageX;
    let newLeft = endSwipeX - shiftX - sliderCoords.left;

       if (newLeft < -25) {
         newLeft = -25;
       }
       let rightEdge = sliderInput.offsetWidth - 50;
       if (newLeft > rightEdge) {
         newLeft = rightEdge;
       }
   
       thumbImage.style.left = newLeft + 'px';

   sliderInput.value = (newLeft + 25) / 6.26;
   sliderMove(sliderInput.value);
  }
  
  thumbImage.ontouchend = function() {
   let timer = setInterval(()=>{
   if(sliderInput.value == closestValue(sliderInput.value,stopPoints)){
     clearInterval(timer);
     return;
   }
   draw(sliderInput.value);
   },20)
 
   function draw(value){
     value = parseInt(value);
     if((value >= 0)&&(value <= 25)){
       sliderInput.value = parseInt(sliderInput.value) - 1;
     }
     
     if((value >= 26)&&(value <= 50)){
       sliderInput.value = parseInt(sliderInput.value) + 1;
     }
     
     if((value >= 50)&&(value <= 75)){
       sliderInput.value = parseInt(sliderInput.value) - 1;
     }
     
     if((value >= 76)&&(value <= 100)){
       sliderInput.value = parseInt(sliderInput.value) + 1;
     }
     
     if(value >= 76){
       thumbImage.style.left = (parseInt(sliderInput.value) * 6.26) -20 + 'px';
     }else{
       thumbImage.style.left = (parseInt(sliderInput.value) * 6.26) -25 + 'px';
     }
     
   }
    
       document.onmousemove = document.onmouseup = null;
     };
}

    thumbImage.ondragstart = function() {
     return false;
   };

   function sliderMove(value){
     value = parseInt(value)
  
    if((value >= 0)&&(value <= 25)){
      swiperH.slideTo(0);
    }
  
    if((value >= 26)&&(value <= 75)){
      swiperH.slideTo(1);
    }
  
    if((value >= 76)&&(value <= 100)){
      swiperH.slideTo(2);
    }
   }

   function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

 }

function closestValue(num,array){
  let curr = array[0];
  let diff = Math.abs(num - curr);
  for(let i = 0;i < array.length;i++){
    let newDiff = Math.abs(num - array[i]);
    if(newDiff < diff){
      diff = newDiff;
      curr = array[i];
    }
  }
  return curr;
}