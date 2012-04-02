$(document).ready(function() {

	//if the button Click to Add is pressed change the border color to red
	$("#btn1").click( function(){
		$("#header").addClass("hover");
		$("#header").removeClass("no_hover");
	});

	//if the Click to Remove button is pressed change the border color to black
	$("#btn2").click( function(){
		$("#header").removeClass("hover");
		$("#header").addClass("no_hover");
	});
});