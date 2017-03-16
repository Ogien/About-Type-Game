// Memory Game
(function () {

    var Memory;

    Memory = {
        init: function (cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $(".restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },
        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(cardsArray));
        },
        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.binding();
            this.paused = false;
            this.guess = null;
            this.screen();
            this.$memoryCards.addClass("animated bounceInLeft show");
            FastClick.attach(document.body);
        },
        screen: function () {
            var windowWidth = null;
            var Screens = {
                apple: {
                    iPhone: {
                        // 1-4s
                        old: [320, 480],
                        _5: [320, 568],
                        _6: [375, 627],
                        _6plus: [414, 736]
                    },
                    iPad: {
                        medium: [768, 1024],
                        pro: [1024, 1366]
                    }
                },
                generic: {
                    large: 1024,
                    medium: 768
                }
            };

            // Apple
            if (window.innerWidth === Screens.apple.iPad.pro[0] &&
                window.innerHeight === Screens.apple.iPad.pro[1]) {

                windowWidth = $(window).width() / 78;
                this.$game.css('padding', '4em 5.25em');
                this.$modal.css('padding', '0 5em');

            } else if (window.innerWidth === Screens.apple.iPad.medium[0] &&
                window.innerHeight === Screens.apple.iPad.medium[1]) {

                windowWidth = $(window).width() / 76;
                this.$game.css('padding', '3em 3.5em');
                this.$modal.css('padding', '0 6em');

            } else if (window.innerWidth === Screens.apple.iPhone._6plus[0] &&
                window.innerHeight === Screens.apple.iPhone._6plus[1]) {

                windowWidth = $(window).width() / 64;
                this.$game.css('padding', '3.5em 0');

            } else if (window.innerWidth === Screens.apple.iPhone._6[0] &&
                window.innerHeight === Screens.apple.iPhone._6[1]) {

                windowWidth = $(window).width() / 64;
                this.$game.css('padding', '4em 0');

            } else if (window.innerWidth === Screens.apple.iPhone._5[0] &&
                window.innerHeight === Screens.apple.iPhone._5[1]) {

                windowWidth = $(window).width() / 64;
                this.$game.css('padding', '3em 0');

            } else if (window.innerWidth === Screens.apple.iPhone.old[0] &&
                window.innerHeight === Screens.apple.iPhone.old[1]) {

                windowWidth = $(window).width() / 70;
                this.$game.css('padding', '2em 0.75em');

            } else if (window.innerWidth >= Screens.generic.large) {

                windowWidth = $(window).width() / 96;
                this.$game.css('padding', '0 3em');

            } else if (window.innerWidth >= Screens.generic.medium) {

                windowWidth = $(window).width() / (64 * 1.15);
                this.$game.css('padding', '0.5em 1em 0 3em');

            } else {

                windowWidth = $(window).width() / 64;
                this.$game.css('padding', '2.2em 0');
            }

            // Binds the window width via if statement
            this.$memoryCards.css('height', windowWidth + 'em');
            this.$memoryCards.css('width', windowWidth + 'em');

        },
        binding: function () {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },
        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);

            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if ($(".matched").length == $(".card").length) {
                    _.win();
                }
            }
        },
        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                //noinspection JSPotentiallyInvalidUsageOfThis
                $('.game').addClass("animated fadeOut").delay(4000).addClass('hide').removeClass("animated fadeOut");
            }, 1000);
        },
        showModal: function () {
            this.$overlay.removeClass("hide fadeOut").addClass("animated fadeIn show");
            this.$modal.removeClass("hide fadeOut").addClass("animated fadeIn show");
        },
        hideModal: function () {
            this.$overlay.addClass("animated fadeOut").delay(6000).addClass('hide').removeClass("show fadeIn");
            this.$modal.addClass("animated fadeOut").delay(6000).addClass('hide').removeClass("show fadeIn");
        },
        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.removeClass("hide").addClass("animated bounceInLeft show");
        },
        shuffle: function (array) {
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
        buildHTML: function () {
            var frag = '';
            for (var k = 0; k < 24; k++) {
                frag += '<div class="card" data-id="' + this.$cards[k].id + '">\
                            <div class="inside">\
				                <div class="front">\
				                    <img src="' + this.$cards[k].img + '"\ alt="' + this.$cards[k].name + '" />\
				                </div>\
				                <div class="back">\
				                    <img src="img/About Type Pattern_Pattern.svg"\ />\
				                </div>\
				            </div>\
				        </div>';
            }
            return frag;
        }
    };

    var cards = [
        // Garamond
        {
            name: "Garamond",
            img: "img/About Type GaramondOulinesA.svg",
            id: 1
        },
        {
            name: "Garamond",
            img: "img/About Type GaramondOulinesB.svg",
            id: 2
        },
        {
            name: "Garamond",
            img: "img/About Type GaramondOulinesE.svg",
            id: 3
        },
        // Georgia
        {
            name: "Georgia",
            img: "img/About Type GeorgiaOutlinesA.svg",
            id: 4
        },
        {
            name: "Georgia",
            img: "img/About Type GeorgiaOutlinesB.svg",
            id: 5
        },
        {
            name: "Georgia",
            img: "img/About Type GeorgiaOutlinesE.svg",
            id: 6
        },
        // Helvetica
        {
            name: "Helvetica",
            img: "img/About Type HelveticaOutlinesA.svg",
            id: 7
        },
        {
            name: "Helvetica",
            img: "img/About Type HelveticaOutlinesB.svg",
            id: 8
        },
        {
            name: "Helvetica",
            img: "img/About Type HelveticaOutlinesE.svg",
            id: 9
        },
        //Verdana
        {
            name: "Verdana",
            img: "img/About Type VerdanaOutlinesA.svg",
            id: 10
        },
        {
            name: "Verdana",
            img: "img/About Type VerdanaOutlinesB.svg",
            id: 11
        },
        {
            name: "Verdana",
            img: "img/About Type VerdanaOutlinesE.svg",
            id: 12
        }
    ];

    localStorage.setItem('db', JSON.stringify(cards));

    Memory.init(JSON.parse(localStorage.getItem('db')));

})();
