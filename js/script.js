var Cardgame = {
	// ----------------------------------------
	// Globals
	// ----------------------------------------
	cards: [],
	playerHand: [],
	AIHand: [],

	// ----------------------------------------
	// Init function
	// ----------------------------------------
	init: function() {
	    this.cacheDom();
	    this.bindEvents();
	    this.createDeck();
	    this.shuffleDeck();
	    this.renderDeck();
	},

	// ----------------------------------------
	// Cache some DOM elements
	// ----------------------------------------
	cacheDom: function() {
	    this.$deck = $('#deck');
	    this.$btnDeal = $('#btn-deal');
	    this.$btnChange = $('#btn-change');
	    this.$playerPane = $('#player-pane');
	    this.$AIPane = $('#ai-pane');
	    this.$cardSlots = $('.card-slots');
	    this.$wasteDiv = $('#waste');
	},

	// ----------------------------------------
	// Bind events
	// ----------------------------------------
	bindEvents: function() {
		var self = this;
    	this.$btnDeal.on( 'click', function() {
    	    self.dealCards();
    	});
    	this.$btnChange.on( 'click', self.changeCards);
    	$('#player-pane .card-slot').on('click', self.selectCard);
	},

	// ----------------------------------------
	// Create the deck of cards in an array
	// ----------------------------------------
	createDeck: function() {
		var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
			suits = ["Hearts", "Diamonds", "Spades", "Clubs"];


	    for (var i = 0; i < ranks.length; i++) {
	    	for (var j = 0; j < suits.length; j++) {
	    		var imgName = (ranks[i] + "_of_" + suits[j] + ".png").toLowerCase();
				this.cards.push( { rank: ranks[i], suit: suits[j], img: imgName } );
	    	}
		}
	},

	// ----------------------------------------
	// Shuffles the deck array
	// ----------------------------------------
	shuffleDeck: function() {
		var tempArray = [],
			rand;

		for (var i = this.cards.length; i > 0; i--) {
			rand = Math.floor (Math.random() * i);
			tempArray.push(this.cards[rand]);
			this.cards.splice(rand, 1);
		}
		this.cards = tempArray;
	},

	// ----------------------------------------
	// Render the deck
	// ----------------------------------------
	renderDeck: function() {
		var htmlString = '',
			cardID = '',
			offsetPos;

		for (var i = this.cards.length -1; i >= 0; i--) {
			offsetPos = (this.cards.length - i) / 4;
			cardID = this.cards[i].suit.toLowerCase() + '-' + this.cards[i].rank.toLowerCase();

			htmlString += '<div class="card" style="top: '+ offsetPos +'px; left: '+ offsetPos +'px; z-index: '+ i +'">';
				htmlString += '<figure class="back"></figure>';
				htmlString += '<figure class="front '+ cardID +'"></figure>';
			htmlString += '</div>';
		}

		this.$deck.append(htmlString);
	},

	// ----------------------------------------
	// Deal the cards
	// ----------------------------------------
	dealCards: function() {
		var self = this;
		var nrOfEmptySlots = self.getEmptySlots().length;
		var firstDeal = [0, 5, 1, 6, 2, 7, 3, 8, 4, 9];
		var $chunkOfCards = self.$deck.children().slice(0, nrOfEmptySlots);

		if (nrOfEmptySlots === 10) {
			for (var i = 0; i < firstDeal.length; i++) {
				var $this = $('#slot-' + firstDeal[i]);
				var $currentCard = $( $chunkOfCards[i] );

				self.animateCard($currentCard, $this, i, nrOfEmptySlots);
			}
		}
		else {
		   this.getEmptySlots().each(function(i) {
		   	var $this = $(this);
		   	var $currentCard = $( $chunkOfCards[i] );
		   	
		   	self.animateCard($currentCard, $this, i, nrOfEmptySlots);
			});
	   }
	},

	// ----------------------------------------
	// Animate deal to a slot
	// ----------------------------------------
	animateCard: function($card, $slot, i, max) {
		var self = this;
		var speed = 200;
		var offsetX = $slot.offset().top - this.$deck.offset().top + 5;
	   var offsetY = $slot.offset().left - this.$deck.offset().left + 5;

	   // Animate card every 500 ms
		setTimeout(function() {
   		$card.addClass('rotate').animate({
				'top': offsetX,
				'left': offsetY

			}, speed, function() {

				$card.remove().appendTo( '#' + $slot.attr('id') ).css({
					'position': 'static',
					'z-index': i,
				}).removeClass('rotate');

				if (i === max - 1) {
					self.flipPlayerCards(max);
				}

			});

		}, (speed + 100) * i);
	},

	// ----------------------------------------
	// Flip the cards
	// ----------------------------------------
	flipPlayerCards: function(max) {
		   var $cards = $('.card-slot');
		   var speed = 100;
		   var self = this;
		    
		   $cards.each(function(i) {
				if (i < 5) {
			    	var $this = $(this);

				   setTimeout(function() {
				      $this.children('div').addClass('face-up');
				   	if (i === 4) {
				   		self.$btnDeal.attr('disabled', true);
				   		self.$btnChange.attr('disabled', false);
				   	}
				   }, speed * i);

				}

		   });
	},

	// ----------------------------------------
	// Click select card
	// ----------------------------------------
	selectCard: function() {
		var $this = $(this);

		if ( $this.hasClass("selected-card") ) {
	      $this.stop().animate({
	      	marginTop: 0,
	      	opacity: 1
	      }, 200);
	   }
	   else {
	   	$this.stop().animate({
	   		marginTop: -10,
	   		opacity: 0.5
	   	}, 50);
	   }
	   $this.toggleClass("selected-card");
	},


	// ----------------------------------------
	// Change the cards
	// ----------------------------------------
	changeCards: function() {
	   var $selectedCards = $('.selected-card');
	   var speed = 400;
	   var self = this;
 		// var offsetX = $('#waste').offset().top - $this.offset().top;
 		// var offsetY = $('#waste').offset().left - $this.offset().left;
	    
	    // console.log( offsetX, offsetY );
	    // console.log( 'hae' );

	    $selectedCards.each(function(i) {
	    		var $this = $(this).children('.card');

	    		var offsetX = $('#waste').offset().top - $this.offset().top;
 				var offsetY = $('#waste').offset().left - $this.offset().left;
 				var nr = 20 + Math.round( Math.random() * 340 );

 				console.log( nr);

	        setTimeout(function() {
	        	// console.log( $this );
	            $this.css({
	            	position: 'absolute',
	            	top: 5,
	            	left: 5
	            }).addClass('rotated-' + nr).animate({
	            	top: offsetX,
	            	left: offsetY
	            }, 1000);
	        }, speed * i);

	    });
	},

	// ----------------------------------------
	// Returns number of empty card slots
	// ----------------------------------------
	getEmptySlots: function() {
		// Håll i hatten
	   return $('.card-slot:not(:has(div))');
	},

	// ----------------------------------------
	// Change instruction text
	// ----------------------------------------
	changeInstruction: function(val) {
	    $('.instruction').text(val);
	}

};

Cardgame.init();