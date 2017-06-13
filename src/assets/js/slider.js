let win = window,
	touch = {},
	swipeTimer = null;

	function translate(elem,distance,duration) {
		if (elem.style.transform === undefined) {
			elem.style.webkitTransform = 'translateX(' + distance + '%)';
		} else {
			elem.style.transform = 'translateX(' + distance + '%)';
		}
		if (elem.style.transition === undefined) {
			elem.style.webkitTransitionDuration = duration+"ms";
		} else {
			elem.style.transitionDuration = duration+"ms";
		}
	}

	function swipeDirection(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) > Math.abs(y1 - y2) ? (x1 > x2 ? "left" : "right") : (y1 > y2 ? "up" : "down");
	}

	function cancelAll() {
		touch = {};
		swipeTimer && clearTimeout(swipeTimer);
	}
module.exports = slider = function(opts) {
		opts = opts || {};
		if (typeof opts.id != "string") {
			throw new Error("invalid id selector");
			return
		}
		swipeTimer && clearTimeout(swipeTimer);
		var containerELem = document.getElementById(opts.id),
			orderBarElem = containerELem.children[1],
			contentElem = containerELem.children[0],
			childLen = contentElem.children.length,
			childWidth = contentElem.firstElementChild.clientWidth,
			totalWidth = childLen * childWidth,
			index = 0,
			curIndex = 0,
			translateX = 0,
			diffX = 0,
			diffY = 0,
			isScrolling = false,
			duration = opts.duration || 300,
			follow = opts.follow || false,
			scrollDisabled = opts.scrollDisabled || false,
			distance = opts.distance || childWidth*0.4;

		orderBarElem.children[0].className += "current";

		contentElem.addEventListener("touchstart", function(e) {
			diffX = 0;
			diffY = 0;
			if (e.touches.length == 1) {
				var curTouch = e.touches[0];
				curIndex = Math.abs(translateX / childWidth) + 1;
				if (touch.x2) {
					touch.x2 = undefined;
					touch.y2 = undefined;
				}
				touch.x1 = curTouch.pageX;
				touch.y1 = curTouch.pageY;
				touch.time = +new Date();
			}
			this.addEventListener("touchmove",handleMove,false);
			this.addEventListener("touchend",handleEnd,false);
		})
		function handleMove(e) {
			if (e.changedTouches.length == 1) {
				if (scrollDisabled){
					e.preventDefault();
				}
				var curTouch = e.changedTouches[0];
				touch.x2 = curTouch.pageX;
				touch.y2 = curTouch.pageY;
				diffX = touch.x2 - touch.x1;
				diffY = touch.y2 - touch.y1;
				isScrolling = Math.abs(diffX) < Math.abs(diffY) ;
				if (!isScrolling) {
					e.preventDefault();
				}
				if (!isScrolling && follow) {
					var outOfBounds = curIndex <= 1 && diffX > 0 || curIndex == childLen && diffX < 0;
					diffX =  diffX/(outOfBounds ? (Math.abs(diffX) / childWidth + 1) : 1);
					var direction = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
					if (direction == "left") {
						translate(contentElem,(translateX + diffX)* 100 / totalWidth,0);
					} else if (direction == "right") {
						translate(contentElem,(translateX + diffX)* 100 / totalWidth,0);
					}
				}
			}
		}
		function handleEnd(e) {
			if (e.changedTouches.length == 1) {
				var period = +new Date() - touch.time;
        		var outOfBounds = curIndex <= 1 && diffX > 0 || curIndex == childLen && diffX < 0;
				if (!isScrolling){
					if ((Number(period) < 250 && Math.abs(diffX)> 20 || Math.abs(diffX)> distance) && !outOfBounds) {
							var direction = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
							if (direction == "left") {
								translateX -= childWidth;
								index = Math.abs(translateX / childWidth) || 0;
								translate(contentElem, translateX * 100 / totalWidth,duration);
								opts.callback && opts.callback(index);
							} else if (direction == "right") {
								translateX += childWidth;
								index = Math.abs(translateX / childWidth) || 0;
								translate(contentElem, translateX * 100 / totalWidth,duration);
								opts.callback && opts.callback(index);
							}
							orderBarElem.querySelector('.current').className = "";
							orderBarElem.children[index].className += "current";
					}else {
							index = Math.abs(translateX / childWidth) || 0;
							translate(contentElem, translateX * 100 / totalWidth,duration);
							opts.callback && opts.callback(index);
					}
				}
				
			}
			this.removeEventListener("touchmove",handleMove,false);
			this.removeEventListener("touchend",handleEnd,false);
		}
		contentElem.addEventListener("touchcancel", function(e) {
			translate(contentElem, translateX * 100 / totalWidth,duration);
			cancelAll();
		})
		win.addEventListener("scroll",cancelAll,false);
	}