"use strict";

var Cardgame = {
	// ----------------------------------------
	// Globals
	// ----------------------------------------
	cards: [],

	// ----------------------------------------
	// Init function
	// ----------------------------------------
	init: function() {
	    this.cacheDom();
	    this.bindEvents();
	    this.createDeck();
	    // this.shuffleDeck();
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
	},

	// ----------------------------------------
	// Bind events
	// ----------------------------------------
	bindEvents: function() {
		var self = this;
    	this.$btnDeal.on( 'click', function() {
    	    self.dealCards('both', 5);
    	} );
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
			htmlString += '<div class="back card '+ cardID +'" style="top: '+ offsetPos +'px; left: '+ offsetPos +'px; z-index: '+ i +'"></div>\n';
		}

		this.$deck.append(htmlString);
	},

	// ----------------------------------------
	// Deal the cards
	// ----------------------------------------
	dealCards: function(toWho, howMany) {
		// Duble amount of cards if we're dealing to both players
		howMany = (toWho === 'both') ? howMany * 2 : howMany;

		var $chunkOfCards = this.$deck.children().slice(0, howMany),
			self = this,
			$pane,
			offsetX,
			offsetY;

		$chunkOfCards.each(function(i) {
			var $this = $(this);

			setTimeout(function() {
				// If we're dealing to player
				if (toWho === 'player') {
					$pane = self.$playerPane;
				}

				// Else if we're dealing to AI
				else if (toWho === 'ai') {
					$pane = self.$AIPane;
				}

				// Else if we're dealing to both player and ai
				else if (toWho === 'both') {

					if (i % 2 === 0) {
						$pane = self.$playerPane;
					}
					else {
						$pane = self.$AIPane;
					}
				}

				console.log( $pane.offset() );
				offsetX = $pane.offset().top - self.$deck.offset().top,
				offsetY = $pane.offset().left - self.$deck.offset().left;

				$this.animate({
					'top': offsetX,
					'left': offsetY
				}, 200, function() {
				    $this.remove().addClass('dealt-card').appendTo( $pane );
				});
			}, i * 300);
		});
	
	}

}

Cardgame.init();