$(document).ready(function() {

  $(".guess_box").click(checkForCode);

  //Returns a random number based on num
  function getRandom(num) {
    return Math.floor(Math.random() * num);
  }
  
  //hides the discount variable
  var hideCode = function() {
    var numRand = getRandom(4);
    $(".guess_box").each(function(index, value) {
      if (numRand == index) {
        $(this).append("<span id='has_discount'></span>");
        return false;
      }
    });
  }

  hideCode();

  //Displays the dicount when the user clicks one of the four images
  function checkForCode() {
    var discount;
    if ($.contains(this, document.getElementById("has_discount"))) {
      var my_num = getRandom(100);
      discount = "<p>Your Code: CODE" + my_num + "</p>";
    } else {
      discount = "<p>Sorry, no discount this time!</p>";
    }
      
    $(".guess_box").each(function() {
      if ($.contains(this,document.getElementById("has_discount"))) {
        $(this).addClass("discount");
      } else {
        $(this).addClass("no_discount");
      }
      $(this).unbind();
    });

    $("#result").append(discount);
  }

  //Changes the color of the border if the user hovers over it
  $(".guess_box").hover(
    function(){
      $(this).addClass("my_hover");
    },
    function() {
      $(this).removeClass("my_hover");
    }
  )
});
