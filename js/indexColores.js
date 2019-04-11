(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
			
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					// _.guess = id_card
					_.info(_.guess);
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},
		
		info: function(id){
			var path = "resources/sounds/";
			var sounds = ["","blanco.mp3","azul.mp3","negro.mp3",
			"morado.mp3","verde.mp3","rojo.mp3","rosa.mp3",
			"naranja.mp3","cafe.mp3","amarillo.mp3","gris.mp3"
			];
			//alert(id);
			var poc = path+sounds[id];
			//alert(poc);
			// play sound
			var audio = new Audio(poc);
			audio.play();
		},
		
		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="resources/imgs/pregunta.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "c-gris",
			img: "resources/imgs/pencil-gris.jpg",
			id: 1,
		},
		{
			name: "c-blanco",
			img: "resources/imgs/pencil-blanco.jpg",
			id: 2
		},
		{
			name: "c-negro",
			img: "resources/imgs/pencil-negro.jpg",
			id: 3
		},
		{
			name: "c-cafe",
			img: "resources/imgs/pencil-cafe.jpg",
			id: 4
		},
		{
			name: "c-verde",
			img: "resources/imgs/pencil-verde.jpg",
			id: 5
		},
		{
			name: "c-naranja",
			img: "resources/imgs/pencil-naranja.jpg",
			id: 6
		},
		{
			name: "c-amarillo",
			img: "resources/imgs/pencil.amarillo.jpg",
			id: 7
		},
		{
			name: "c-azul",
			img: "resources/imgs/pencil-azulfuerte.png",
			id: 8
		},
		{
			name: "c-rosa",
			img: "resources/imgs/pencil-rosa.jpg",
			id: 9
		},
		{
			name: "c-morado",
			img: "resources/imgs/pencil-morado.jpg",
			id: 10
		},
				{
			name: "c-rojo",
			img: "resources/imgs/pencil-rojo.jpg",
			id: 11
		},
	];
    
	Memory.init(cards);


})();
