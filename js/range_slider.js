const input = document.querySelector("input");
const stopPoints = [0,50,100];

input.onmousemove = function(e){
  let value = parseInt(this.value)
  
  if((value >= 0)&&(value <= 25)){
    swiperH.slideTo(0);
  }

  if((value >= 25)&&(value <= 75)){
    swiperH.slideTo(1);
  }

  if((value >= 75)&&(value <= 100)){
    swiperH.slideTo(2);
  }

}

input.onmouseup = function(e){
	let timer = setInterval(()=>{
		if(this.value == closestValue(this.value,stopPoints)){
			clearInterval(timer);
			return;
		}
		draw(this.value);
	},20)
	
	function draw(value){
		value > 0 && value < 25 ? input.value = parseInt(input.value) - 1:
		value > 25 && value < 50 ? input.value = parseInt(input.value) + 1:
		value > 50 && value < 75 ? input.value = parseInt(input.value) - 1:
		value > 75 && value < 100 ? input.value = parseInt(input.value) + 1: 0;
	}
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