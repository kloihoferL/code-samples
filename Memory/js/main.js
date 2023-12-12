"use strict";

$(document).ready(function (){

    $("#start").click(function (e) {
        e.preventDefault();
        let stufe = $('input[name="schwierigkeit"]:checked').val();
        if (stufe === 'leicht') {
            buildBoard(16, 4, 4);
            startGame(8);
        } else if (stufe === 'mittel') {
            buildBoard(24, 6, 4);
            startGame(12);
        } else if (stufe === 'schwer') {
            buildBoard(36, 6, 6);
            startGame(18);
        } else {
            // Fehlermeldung
            alert("Bitte wähle eine Schwierigkeitsstufe!");
        }
    });
});

// baut das Spielfeld mit den Karten auf
function buildBoard(cards, cols, rows) {
    $("#memoryField").empty();

    let array = new Array();
    let index = 0;
    let width;
    if (cols <= 4) width = '220';
    else width = '150';

    for(let j = 1; j <= rows; j++) {
        let div = `<div id="row${j}" class="row"></div>`
        $("#memoryField").append(div);
    }

    //Reihen erstellen
    for (let k = 1; k <= rows; k++) {
        let row = "#memoryField div#row" + k;
        for (let i = 0; i < cols; i++) {
            array.push(index);
            let html = `<div class="card" id="f${index}" style="background-color: darkgrey;">
                            <img width='${width}' src='' id='i${index}'/>
                        </div>`;
            $(row).append(html);
            index++;
        }
    }

    let r;
    for (let i=1; i<=(cards/2); i++){
        r = getRandom(0, array.length-1);
        $("#memoryField div #i" + array[r]).attr( "src", "imgs/img_" + i + ".jpg");
        array.splice(r, 1); 
        r = getRandom(0, array.length-1);
        $("#memoryField div #i" + array[r]).attr( "src", "imgs/img_" + i + ".jpg");
        array.splice(r, 1);
    }
}


function getRandom(min, max){
    if (min > max) return -1;
    if (min == max) return min;
    return min + parseInt(Math.random() * (max-min+1));
}

// Ein gefundenes Bildpaar wird von der Fläche genommen
function replaceFound(firstC, currentCard) {
    window.setTimeout(function () {
        // Bilder des gefundenen Paars verdecken und die Opacity auf 0 setzen
        firstC.parent('div').fadeTo(500, 0);
        currentCard.parent('div').fadeTo(500, 0);

        firstC.parent('div').toggleClass('found');
        currentCard.parent('div').toggleClass('found');
    }, 1500);
}

// spiel starten
function startGame(pairs) {

    let firstC = null;
    let currentCard = null;
    let number = 0; //Anzahl der aktuell aufgedeckten Karten
    let versuche = 0; //Anzahl der Versuche, bei denen immer zwei Karten aufgedeckt wurden
    let matchedPairs = 0; //bereits gefundene Paare

    let card = $(".card");

    //alle Karten verdecken:
    $(".card img").animate({opacity: 0}, 0);



    //Karte anklicken und aufdecken
    card.click(function (e) {
        e.preventDefault();

        if (number === 3) {
            firstC.animate({opacity: 0});
            currentCard.animate({opacity: 0});
            versuche++;
            number = 0;
        }

        currentCard = $(e.currentTarget).find('img');
        currentCard.animate({opacity: 1}, 500);
        number++;

        if (number === 1) {
            firstC = currentCard;
        }

        if (number === 2) {

            if (firstC.attr('src') === currentCard.attr('src') &&
                firstC.attr('id') !== currentCard.attr('id')) {

                //zwei gefundene Karten vom Feld nehmen
                replaceFound(firstC, currentCard);
                versuche++;
                matchedPairs++;
                firstC = null;
                number = 0;
            }
            else if (firstC.attr('id') === currentCard.attr('id'))
                number = 1;

            else
                number++;

        }

        //Fertig
        if(matchedPairs === pairs){
            window.setTimeout(function (){
                gameFinished(versuche);
            }, 2500);
        }
    });
}

// Anzahl der Versuche ausgeben.
function gameFinished(versuche){
    alert("Gratuliere! Du hast " + versuche + " Versuche gebraucht.");
    $("#memoryField").empty();
}