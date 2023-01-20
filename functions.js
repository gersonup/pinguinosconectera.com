$(document).ready(function(){
    $("#btn-draw").click(function(e) {
        e.preventDefault();

        // Elements Dictionary
        const elementos = {
            "wall"      : '<div class="wall"><b>W</b></div>',
            "barrier"   : '<div class="barrier"><b></b>B</div>',
            "penguin1"  : '<div class="penguin1"><b></b>P1</div>',
            "penguin2"  : '<div class="penguin2"><b></b>P2</div>',
            "goal"      : '<div class="goal"><b></b>G</div>'
        }

        //Number of barriers
        let n = $("#n").val();
        let vidaX = $("#vidaX").val();
        let vidaY = $("#vidaY").val();
        let pinguino1X = $("#pinguino1X").val();
        let pinguino1Y = $("#pinguino1Y").val();
        let pinguino2x = $("#pinguino2X").val();
        let pinguino2Y = $("#pinguino2Y").val();

        if (n >= 10) {
            createLaberinto(n);
        } else {
            alert("La medida minima es 17.");
        }

        function createBarries(matrixLength) {
            var maxNumBarriers = Math.floor(((Math.pow(matrixLength, 2) * 30)/100) + 1);

            console.log("power2: " + Math.pow(matrixLength, 2));
            console.log("maxnumBarriers:" + maxNumBarriers);

            var barriers = new Array();
            var barrier = new Array();
            for (let i = 0; i < maxNumBarriers; i++) {
                barriers[i] = new Array();
                barrier[i] = new Array();
                for (let j = 0; j < 2; j++) {
                    barrier[i][j] = Math.floor((Math.random() * matrixLength) + 1);
                }
                if (!barriers.includes(barrier[i])) {
                    barriers[i] = barrier[i]
                }
            }

            console.log(barriers);
            return barriers;
        }

        function createLaberinto(size) {
            console.clear();

            var barriers = createBarries(size);
            var row = new Array();

            // Create matrix
            for (let i = 0; i < size; i++) {
                row[i] = new Array();
                for (let j = 0; j < size; j++) {
                    row[i][j] = 0;
                } 
            }
            
            console.log(row);
            console.log(row.length);
            //console.log("position: " + row[vidaX][vidaY]);
            
            //Random function
            //Math.floor((Math.random() * 1) + 1);

            /* $("#laberinto").empty();
            $("#laberinto").append(`<div class="mapa"></div>`);
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    $(".mapa").append(`<div class="position" id="div-${j}-${k}></div>`);
                } 
            }
            $(".mapa").css({ 
                "width": `${size * 30}`, 
                "height": `${size * 30}`, 
                "grid-template-columns": `repeat(${size}, 1fr)`, 
                "grid-template-rows": `repeat(${size}, 1fr)` 
            });   */
        }
    });
});