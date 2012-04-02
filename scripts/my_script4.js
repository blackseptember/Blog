$(document).ready(function() {
	var v = false;

	/* If button Go Vegetarian has been pressed, removes from the menu
	 * all entries which are not vegetarian.
	*/
	$("button#vegOn").click(function() {
		if (v == false) {
			//Removes the fish and store it in a var so it can be accessed later
			$f = $(".fish").parent().parent().remove();

			//Replace hamburger with portobello
			$(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mushroom</em></li>");
			$(".portobello").parent().parent().addClass("leaf");

			//Insert li elem of the tofu class after the meat elem.
			$(".meat").after("<li class='tofu'><em>Tofu</em></li>");
			//Removes the meat and store it in a var so it can be accessed later
			$m = $(".meat").detach();
			$(".tofu").parent().parent().addClass("leaf");

			v = true;
		}

	});

	//Back to the basic menu
	$("button#restoreMe").click(function() {
		if (v == true) {
			$(".menu_entrees li").first().before($f);

			//Removing the leaf
			$(".tofu").parent().parent().removeClass("leaf");
			$(".portobello").parent().parent().removeClass("leaf");

			//Puts back the hamburger
			$(".portobello").replaceWith("<li class='hamburger'>hamburger</li>");

			//Puts back all the meat elements
			$(".tofu").each(function(i) {
				$(this).after($m[i]);
			});

			$(".tofu").remove();
			v = false;
		}
	});
});