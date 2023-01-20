$(document).ready(function(){
    $("#btn-draw").click(function(e) {
        e.preventDefault();

        //Number of barriers
        let n = $("#n").val();
        let VidaX = $("#vidaX").val();
        let VidaY = $("#vidaY").val();
        let pinguino1X = $("#pinguino1X").val();
        let pinguino1Y = $("#pinguino1Y").val();
        let pinguino2x = $("#pinguino2X").val();
        let pinguino2Y = $("#pinguino2Y").val();

        if (n >= 10) {
            createLaberinto(n);
        } else {
            alert("n debe ser almenos de un valor de 10.");
        }

        function createLaberinto(size) {
            $("#laberinto").append(`<div class="mapa" id></div>`);
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    $(".mapa").append(`<div class="position" id="${k}></div>`);
                } 
            }
            $(".mapa").css({ "width": `${size * 25}`, "height": `${size * 25}`, "grid-template-columns": `repeat(${size}, 1fr)`, "grid-template-rows": `repeat(${size}, 1fr)` });  
        }
    });
});