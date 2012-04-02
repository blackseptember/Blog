$(document).ready(function(){

	var deck = [
		new card('Ace', 'Hearts',11),
		new card('Two', 'Hearts',2),
		new card('Three', 'Hearts',3),
		new card('Four', 'Hearts',4),
		new card('Five', 'Hearts',5),
		new card('Six', 'Hearts',6),
		new card('Seven', 'Hearts',7),
		new card('Eight', 'Hearts',8),
		new card('Nine', 'Hearts',9),
		new card('Ten', 'Hearts',10),
		new card('Jack', 'Hearts',10),
		new card('Queen', 'Hearts',10),
		new card('King', 'Hearts',10),
		new card('Ace', 'Diamonds',11),
		new card('Two', 'Diamonds',2),
		new card('Three', 'Diamonds',3),
		new card('Four', 'Diamonds',4),
		new card('Five', 'Diamonds',5),
		new card('Six', 'Diamonds',6),
		new card('Seven', 'Diamonds',7),
		new card('Eight', 'Diamonds',8),
		new card('Nine', 'Diamonds',9),
		new card('Ten', 'Diamonds',10),
		new card('Jack', 'Diamonds',10),
		new card('Queen', 'Diamonds',10),
		new card('King', 'Diamonds',10),
		new card('Ace', 'Clubs',11),
		new card('Two', 'Clubs',2),
		new card('Three', 'Clubs',3),
		new card('Four', 'Clubs',4),
		new card('Five', 'Clubs',5),
		new card('Six', 'Clubs',6),
		new card('Seven', 'Clubs',7),
		new card('Eight', 'Clubs',8),
		new card('Nine', 'Clubs',9),
		new card('Ten', 'Clubs',10),
		new card('Jack', 'Clubs',10),
		new card('Queen', 'Clubs',10),
		new card('King', 'Clubs',10),
		new card('Ace', 'Spades',11),
		new card('Two', 'Spades',2),
		new card('Three', 'Spades',3),
		new card('Four', 'Spades',4),
		new card('Five', 'Spades',5),
		new card('Six', 'Spades',6),
		new card('Seven', 'Spades',7),
		new card('Eight', 'Spades',8),
		new card('Nine', 'Spades',9),
		new card('Ten', 'Spades',10),
		new card('Jack', 'Spades',10),
		new card('Queen', 'Spades',10),
		new card('King', 'Spades',10)
	];

	var used_cards = new Array();

	function card(name, suit, value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	}

	function deal() {
		for (var i = 0; i < 2; i++) {
			hit();
		}
	}

	//Returns a random number
	function getRandom(num) {
		var n = Math.floor(Math.random() * num);
		return n;
	}

var hand = {
		cards : new Array(),
		current_total : 0,
		
		sumCardTotal: function(){
			this.current_total = 0;
			for(var i=0;i<this.cards.length;i++){
				var c = this.cards[i];
				this.current_total += c.value;
			}
			$("#hdrTotal").html("Total: " + this.current_total );
			
			//Checks if the sum of current cards is greater than 21
			if (this.current_total > 21) {
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/x2.png');
				$("#hdrResult").html("BUST!")
							   .attr('class', 'lose');
			//Checks if it's equal to 21
			} else if (this.current_total == 21) {
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/check.png');
				$("#hdrResult").html("BlackJack!")
							   .attr('class', 'win');
			//Checks if it's less or equal to 21 and if 5 card have been passed
			} else if (this.current_total <= 21 && this.cards.length == 5) {
				$("#btnStick").trigger("click");
				$("#imgResult").attr('src','images/check.png');
				$("#hdrResult").html("BlackJack - 5 card trick!")
							   .attr('class', 'win');
			} else { 
				//If none of the above then keep playing
			}
		}
	};


	function hit() {
		var good_card = false;
		do {
			var index = getRandom(52);

			//Check if the card has been already used 
			if (!$.inArray(index, used_cards) > -1) {
				good_card = true;
				//Get the card from the array
				var c = deck[index];
				//Mark the card as used
				used_cards[used_cards.length] = index;
				hand.cards[hand.cards.length] = c;
				var $d = $("<div>");
				$d.addClass("current_hand").appendTo("#my_hand");

				$("<img>").attr('alt', c.name + ' of ' + c.suit )
						  		.attr('title', c.name + ' of ' + c.suit )
						  		.attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
						  		.appendTo($d)
						  		.fadeOut('slow')
						  		.fadeIn('slow');
			}
		//Keep looping until gets a good card
		} while (!good_card);

		good_card = false;

		//Get the total
		hand.sumCardTotal();
	}

	$("#btnDeal").click(function() {
		//Deal the two cards
		deal();

		//Hide the deal button but show the hit or stick button
		$(this).toggle();
		$("#btnHit").toggle();
		$("#btnStick").toggle();
	});

	$("#btnHit").click(function() {
		//Display a card
		hit();
	});

	$("#btnStick").click(function() {
		$("#hdrResult").html('Stick!');
		$("#result").toggle();
	});

	//Restart the game
	$("#btnRestart").click(function() {
		//Reset all the elements back to the way they were
		$("#result").toggle();
		$(this).toggle();
		$("#my_hand").empty();
		$("#hdrResult").html('');
		used_cards.length = 0;
		hand.cards.length = 0;
		hand.current_total = 0;

		//Simulate a click of the Deal button
		$("#btnDeal").toggle().trigger('click');
	});
});