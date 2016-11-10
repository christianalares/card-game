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
			htmlString += '<div class="back card '+ cardID +'" style="top: '+ offsetPos +'px; left: '+ offsetPos +'px; z-index: '+ i +'"></div>\n';
		}

		this.$deck.append(htmlString);
	},

	// ----------------------------------------
	// Deal the cards
	// ----------------------------------------
	dealCards: function(toWho) {
		var self = this;
		var speed = 400;

	   this.getEmptySlots().each(function(i) {
	   	var $this = $(this);
	   	var $chunkOfCards = self.$deck.children().slice(0, self.getEmptySlots().length);
	   	var $currentCard = $( $chunkOfCards[i] );
	   	var offsetX = $this.offset().top - self.$deck.offset().top + 5;
	   	var offsetY = $this.offset().left - self.$deck.offset().left + 5;

	   	// Animate card every 500 ms
			setTimeout(function() {
				$currentCard.addClass('rotate');
	   		$currentCard.animate({
					'top': offsetX,
					'left': offsetY

				}, speed, function() {

					$currentCard.remove().appendTo( '#' + $this.attr('id') ).css({
						'position': 'static',
						'z-index': i,
					}).removeClass('rotate');

				});

			}, (speed + 100) * i);

		});


	},

	// ----------------------------------------
	// Deal the cards
	// ----------------------------------------
	// dealCards: function(toWho) {
	// 	var self = this;
	// 	// Duble amount of cards if we're dealing to both players
	// 	// howMany = (toWho === 'both') ? howMany * 2 : howMany;
	// 	var howMany = this.getEmptySlots().length;

	// 	var $chunkOfCards = this.$deck.children().slice(0, howMany),
	// 		self = this,
	// 		slot,
	// 		offsetX,
	// 		offsetY, aiSlot = 4;

	// 	$chunkOfCards.each(function(i) {
	// 		var $this = $(this);

	// 		setTimeout(function() {
	// 			$this.addClass('rotate');

	// 			// If we're dealing to player
	// 			if (toWho === 'player') {
	// 				slot = i;
	// 				// var newOffset = i*91.5;
	// 			}

	// 			// Else if we're dealing to AI
	// 			else if (toWho === 'ai') {
	// 				slot = i + 5;
	// 				// var newOffset = i*91.5;
	// 			}

	// 			// Else if we're dealing to both player and ai
	// 			else if (toWho === 'both') {
	// 				if (i % 2 === 0) {
	// 					slot = i/2;
	// 				} else {
	// 					// slot = aiSlot;
	// 					slot = i + aiSlot;
	// 					aiSlot--;
	// 				}

	// 				// slot = i;
	// 			}

	// 			offsetX = $('#slot-' + slot).offset().top - self.$deck.offset().top,
	// 			offsetY = $('#slot-' + slot).offset().left - self.$deck.offset().left;

	// 			// console.log( slot );

	// 			// offsetX = $pane.offset().top - self.$deck.offset().top,
	// 			// offsetY = $pane.offset().left - self.$deck.offset().left;

	// 			$this.animate({

	// 				'top': offsetX,
	// 				'left': offsetY

	// 			}, 400, function() {

	// 				$this.remove().appendTo('#slot-' + slot).css({
	// 					'position': 'static',
	// 					'z-index': i,
	// 				}).removeClass('rotate');

	// 			});
	// 		}, i * 450);
	// 	});
	
	// },

	// ----------------------------------------
	// Returns number of empty card slots
	// ----------------------------------------
	getEmptySlots: function() {
		// Håll i hatten
	   return $('.card-slot:not(:has(div))');
	},

}

Cardgame.init();