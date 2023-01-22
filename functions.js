var map;

const Elements = {
    space: 0,
    barrier : 1,
    penguin1 : 2,
    penguin2 : 3,
    life : 4,
    same: 32,
}

$(document).ready(function(){
    $("#btn-draw").click(function(e){
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

        if (n > 10) {
            map = createMap(n);
            console.log("opt1: ", map);
            
        } else {
            alert("minimo 10");
        }

        function createMap(size) {
            let map = new Array();
            
            // Create matrix with wall
            for (let i = 0; i < size; i++) {
                map[i] = new Array();
                for (let j = 0; j < size; j++) {
                    map[i][j] = i==0 || j == 0 || j == (size - 1) || i == (size - 1) ? Elements.barrier : Elements.space;
                } 
            }

            map = createBarriers(map);
            
            return map;
        }

        function createBarriers(map) {
            var maxNumBarriers = Math.floor(((Math.pow(map.length, 2) * 40)/100) + 1);

            let counter = 0;

            while(maxNumBarriers > counter) {
                let x = Math.floor((Math.random() * map.length -1) + 1);
                let y = Math.floor((Math.random() * map.length -1) + 1);
                if (map[x][y] == 0) {
                    map[x][y] = Elements.barrier;
                    counter ++;
                }
            }

            return map
        }

    });

    $("#btn-set").click(function(e) {
        e.preventDefault();

        let lifeX = $("#vidaX").val();
        let lifeY = $("#vidaY").val();
        let p1X = $("#pinguino1X").val();
        let p1Y = $("#pinguino1Y").val();
        let p2X = $("#pinguino2X").val();
        let p2Y = $("#pinguino2Y").val();
        
        map = setGame(map,lifeX,lifeY,p1X,p1Y,p2X,p2Y);

        console.log("opt 2: ", map);

        function setGame(map,lifeX,lifeY,p1X,p1Y,p2X,p2Y) {
            
            setElement(map, Elements.life, lifeX, lifeY);
            setElement(map, Elements.penguin1, p1X, p1Y);
            setElement(map, Elements.penguin2, p2X, p2Y);
            
            return map;
        }

        function setElement(map, element, x, y) {

            if (map[x][y] == 0) {
                map[x][y] = element;
            } else {
                alert (`casilla para ${element} no valida para ubicar`);
            }
        }
    });


    // GAME PLACE

    $("#btn-set").click(function(e) {
        e.preventDefault();

        const Direction = {
            up : 0,
            down: 1,
            left: 2,
            right: 3
        }

        function startGame() {

        }

        function searchElement(element) {
            
            for(let i = 0; i < map.length; i ++) {
                for( let j = 0; j < map.length; j ++) {
                    if (map[i][j] == element) {
                        return [i,j];
                    }
                }
            }
        }

        function move() {
            
            let p1 = searchElement(Elements.penguin1);
            let p2 = searchElement(Elements.penguin12);
        }
        
        function randomStep() {

            let step = Math.floor((Math.random() * Direction.length - 1) + 1);
            return step;
        }
    });
});