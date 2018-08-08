    var sliderElem = document.getElementById('range_slider');
    var thumbElem = sliderElem.children[0];

    thumbElem.onmousedown = function(e) {
    var thumbCoords = getCoords(thumbElem);
    var sliderCoords = getCoords(sliderElem);

	  const pointsCoords = {
		  first:getCoords(document.querySelector(".first")).left - sliderCoords.left,
		  second:getCoords(document.querySelector(".second")).left - sliderCoords.left,
		  third:getCoords(document.querySelector(".third")).left - sliderCoords.left
    };

	  const pointsCoordsArray = [];
	  for(let i in pointsCoords){
		  pointsCoordsArray.push(pointsCoords[i]);
	  }
	  
      var shiftX = e.pageX - thumbCoords.left;
      // shiftY здесь не нужен, слайдер двигается только по горизонтали

      document.onmousemove = function(e) {
        //  вычесть координату родителя, т.к. position: relative
        var newLeft = e.pageX - shiftX - sliderCoords.left;
        // курсор ушёл вне слайдера
        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
		
        thumbElem.style.left = newLeft + 'px';
      

      document.onmouseup = function() {
        newLeft = closestValue(newLeft,pointsCoordsArray);
        newLeft < 10 ? newLeft : newLeft = newLeft - thumbElem.offsetWidth;

        thumbElem.style.left = newLeft + 'px';
        sliderMove(newLeft,pointsCoordsArray);

        document.onmousemove = document.onmouseup = null;
      };
	  
	  }

      return false; // disable selection start (cursor change)
    };

    thumbElem.ondragstart = function() {
      return false;
    };

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
  
  function sliderMove(thumbCoord, pointsArray){
    switch(thumbCoord){
      case pointsArray[0]:
        swiperH.slideTo(0);
        break;
      case pointsArray[1]:
        swiperH.slideTo(1);
        break;
      case pointsArray[2]:
        swiperH.slideTo(2);
        break;
      default:
        new Error("no slides");
    }
  }