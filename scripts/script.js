$(document).ready(function() {

	if (typeof(Storage) !== "undefined") {
    	console.log("local storage");
	} else {
    	console.log("no web storage");
	}

	prepValues();

	$('#resistCount').text(good);
	$('#giveInCount').text(bad);
	if (ratio > 0) {
		$('#ratio').text(ratio+'%');
	} else {
		$('#ratio').text('\u221e');
	}

    $("#resistButton").click(function(){
    	good++;
        $('#resistCount').text(good);
        localStorage.setItem("good", good);
        updatePercentage();
    }); 

	$("#giveInButton").click(function(){
    	bad++;
        $('#giveInCount').text(bad);
        localStorage.setItem("bad", bad);
        updatePercentage();
    }); 

	$('#clear').click(function () {
		localStorage.removeItem("good");
		localStorage.removeItem("bad");
		localStorage.removeItem("ratio");

		prepValues();

		$('#resistCount').text(good);
		$('#giveInCount').text(bad);
		$('#ratio').text(ratio);
	})

});

function updatePercentage() {
	ratio = ((good/(good+bad))*100).toFixed(0);
	$('#ratio').text(ratio+'%');
	localStorage.setItem("ratio", ratio);
	if (ratio <= 30) {
		$('#ratio').addClass('inTrouble');
	} else {
		$('#ratio').removeClass('inTrouble');
	}
}

function updateRatio() {
	if(bad == 0) {
		$('#ratio').text('\u221e');
	} else {
		ratio = (good/bad).toFixed(2);
		$('#ratio').text(ratio);
		localStorage.setItem("ratio", ratio);
	}
}

function prepValues() {
	good = localStorage.getItem("good");
	if (good == undefined) { good = 0 }

	bad = localStorage.getItem("bad");
	if (bad == undefined) { bad = 0 }

	ratio = localStorage.getItem("ratio");
	if (ratio == undefined) {
		if (good == undefined || bad == undefined) {
			ratio = 0;
			good = 0;
			bad = 0;
		} else if (bad == 0) {
			ratio = '\u221e';
		} else {
			ratio = ((good/(good+bad))*100).toFixed(0);;
		}
	} 
}