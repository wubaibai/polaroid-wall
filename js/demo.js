var winW;
var winH;
var ratio = 4;
var allRow;

$(document).ready(function(){
	winW = $(window).width();
	winH = $(window).height();
	allRow = $('#exhibitwall .row');
});

$(window).load(function(){
	var loading = $('#loading');
	setTimeout(function(){
		$('#loading').fadeOut('slow');
		showRoom();
	},2000);
});

$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
});

function showRoom () {
	var photos = $('.photo');
	var photoArr = [];
	var i = 0;
	while(i < photos.length){ photoArr.push(i); i++; }
	photoArr = shuffle(photoArr);
	$.each(photoArr,function(k,val){
		// if(k%7 == 0){
			setTimeout(function(){
				makeParoid(photos.eq(val),k%8);
			},k*50);
		// }
	});
}

function makeParoid(ele,rowNum){
	var theTop = randomDigit(100,winH-100);
	var theLeft = randomDigit(100,winW-100);
	// ele.css({"top":theTop,"left":theLeft});

	var myImage = new Image();
	myImage.onload = function(){
		var theW = myImage.width;
		var theH = myImage.height;

		myImage.width = theW/ratio;
		myImage.height = theH/ratio;

		var rotateClass = 'rotate'+randomDigit(1,8);
		var marginLrand = randomDigit(-15,15);
		var marginTrand = randomDigit(-15,15);
		ele.append(myImage);
		ele.addClass('active '+rotateClass);
		ele.css({"margin-left":marginLrand,"margin-top":marginTrand});

		allRow.eq(rowNum).append(ele);
		// ele.css({"margin-left":-(theW/(ratio*2)),"margin-top":-(theH/(ratio*2))});
		
		
	};
	myImage.src = ele.attr('rel');

}

function randomDigit(min,max){
	var rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
	return rndNum;
}

function shuffle(array) {
	var newArr = [], n = array.length, i;
	while (n) {
		i = Math.floor(Math.random() * n--);
		newArr.push(array.splice(i, 1)[0]);
	}
	return newArr;
}