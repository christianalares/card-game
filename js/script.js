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
	    this.$playerPane = $('#player-pane');
	    this.$AIPane = $('#ai-pane');
	    this.$cardSlots = $('.card-slots');
	},

	// ----------------------------------------
	// Bind events
	// ----------------------------------------
	bindEvents: function() {
		var self = this;
    	this.$btnDeal.on( 'click', function() {
    	    self.dealCards('both');
    	} );

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
			// console.log( i );
			offsetPos = (this.cards.length - i) / 4;
			cardID = this.cards[i].suit.toLowerCase() + '-' + this.cards[i].rank.toLowerCase();
			// htmlString += '<div class="back card '+ cardID +'" style="top: '+ offsetPos +'px; left: '+ offsetPos +'px; z-index: '+ i +'"></div>\n';

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
					self.flipPlayerCards();
				}

			});

		}, (speed + 100) * i);
	},

	// ----------------------------------------
	// Flip the cards
	// ----------------------------------------
	flipPlayerCards: function() {
		   var $cards = $('.card-slot');
		   var speed = 100;
		    
		   $cards.each(function(i) {
				if (i < 5) {
			    	var $this = $(this);

				   setTimeout(function() {
				       $this.children('div').addClass('face-up');
				   }, speed * i);
				}
		   });
	},

	// ----------------------------------------
	// Click select card
	// ----------------------------------------
	selectCard: function() {
		var $this = $(this);

		// $(this).children('.face-up').toggleClass('selected-card');
		console.log( $(this) );
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

		// console.log( $(this).children('div').toggleClass('selected-card') );
	   // $(this).parent('').toggleClass('selected-card');
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