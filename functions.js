var map;

const Elements = {
    space: 0,
    barrier : 1,
    penguin1 : 2,
    penguin2 : 3,
    life : 4,
    wall : 5,
    same: 32,
}

function searchElement(element) {
            
    for(let i = 0; i < map.length; i ++) {
        for( let j = 0; j < map.length; j ++) {
            if (map[i][j] == element) {
                return [i,j];
            }
        }
    }
    return [];
}

$(document).ready(function(){
    $("#btn-draw").click(function(e){
        e.preventDefault();
        

         //Number of barriers
        let n = $("#n").val();

        if (n > 10) {
            map = createMap(n);
            printMap(map);
            
        } else {
            alert("minimo 10");
        }

        function createMap(size) {
            let map = new Array();
            
            // Create matrix with wall
            for (let i = 0; i < size; i++) {
                map[i] = new Array();
                for (let j = 0; j < size; j++) {
                    map[i][j] = i==0 || j == 0 || j == (size - 1) || i == (size - 1) ? Elements.wall : Elements.space;
                } 
            }

            map = createBarriers(map);
            
            return map;
        }

        function createBarriers(map) {
            var maxNumBarriers = Math.floor(((Math.pow(map.length, 2) * 20)/100) + 1);

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

        printMap(map);

        function setGame(map,lifeX,lifeY,p1X,p1Y,p2X,p2Y) {

            dropElement(Elements.life);
            dropElement(Elements.penguin1);
            dropElement(Elements.penguin2);
            dropElement(Elements.same);
            
            setElement(map, Elements.life, lifeX, lifeY);
            setElement(map, Elements.penguin1, p1X, p1Y);
            setElement(map, Elements.penguin2, p2X, p2Y);
            
            return map;
        }

        function setElement(map, element, x, y) {

            if (map[x][y] == Elements.space) {
                map[x][y] = element;
            } else {
                alert (`casilla para ${element} no valida para ubicar`);
            }
        }

        function dropElement(element) {
            let elementToDrop = searchElement(element);
            if (elementToDrop > 0) {
                map[elementToDrop[0]][elementToDrop[1]] = Elements.space;
            }
        }
    });


    // GAME PLACE

    $("#btn-start").click(function(e) {
        e.preventDefault();

        const Direction = {
            up : 0,
            down: 1,
            left: 2,
            right: 3
        }

        let counter = 0; 

        
        startGame();
     
        

        function startGame() {
            let positionP1 = searchElement(Elements.penguin1);
            let positionP2 = searchElement(Elements.penguin2);
            let same = searchElement(Elements.same);
            let counter = 0;
            let stepsP1 = 0;
            let stepsP2 = 0;
            let penguin1Exit = false;
            let penguin2Exit = false;

            while (counter < 1000 && (positionP1.length > 0 || positionP2.length > 0 || same.length > 0)) {

                setTimeout(function() {

                    move();

                    positionP1 = searchElement(Elements.penguin1);
                    positionP2 = searchElement(Elements.penguin2);
                    same = searchElement(Elements.same);

                    if(positionP1.length > 0 || same.length > 0) {
                        stepsP1 ++;
                    } else if (!penguin1Exit) {
                        // TODO: imprimir counter del pinguino uno.
                        alert("El pinguino 1 llego a la vida con " + (stepsP1 + 1) + " pasos.");
                        penguin1Exit = true;
                    }

                    if(positionP2.length > 0 || same.length > 0) {
                        stepsP2 ++;
                    } else if (!penguin2Exit) {
                        // TODO: imprimir counter del pinguino uno.
                        alert("El pinguino 2 llego a la vida con " + (stepsP2 + 1) + " pasos.");
                        penguin2Exit = true;
                    }

                    if (positionP1.length > 0 || same.length > 0|| positionP2.length > 0 || same.length > 0) {

                        printMap(map);

                    }
                }, 250*counter);
                counter ++;
            }
            
        }

        function moveElement(element, p, x, y) {

            if( p.length == 0) {
                return;
            }

            if (map[p[0]][p[1]] == Elements.same && Elements.penguin1 == element) {

                map[p[0]+x][p[1]+y] = element;
                map[p[0]][p[1]] = Elements.penguin2;

            } else if (map[p[0]][p[1]] == Elements.same && Elements.penguin2 == element) {

                map[p[0]+x][p[1]+y] = element;
                map[p[0]][p[1]] = Elements.penguin1;

            } else if(map[p[0]+x][p[1]+y] == Elements.space) {

                map[p[0]+x][p[1]+y] = element;
                map[p[0]][p[1]] = Elements.space;

            } else if (map[p[0]+x][p[1]+y] == Elements.penguin1 || map[p[0]+x][p[1]+y] == Elements.penguin2) {

                map[p[0]+x][p[1]+y] = Elements.same;
                map[p[0]][p[1]] = Elements.space;

            }  else if(map[p[0]+x][p[1]+y] == Elements.life) {

                map[p[0]][p[1]] = Elements.space;
            } 

        }

        function move() {
 
            let p1 = searchElement(Elements.penguin1);
            let p2 = searchElement(Elements.penguin2);
            let same = searchElement(Elements.same);

            if(same.length > 0) {
                p1 = same;
                p2 = same;
            }

            let direction = randomStep();

            console.log("direction: " , direction);

            switch(direction) {
                case Direction.up:
                    moveElement(Elements.penguin1,p1, -1, 0);
                    moveElement(Elements.penguin2,p2, -1, 0);
                    break;
                case Direction.down:
                    moveElement(Elements.penguin1,p1, 1, 0);
                    moveElement(Elements.penguin2,p2, 1, 0);
                    break;
                case Direction.left:
                    moveElement(Elements.penguin1, p1, 0, -1);
                    moveElement(Elements.penguin2, p2, 0, 1);
                    break;
                case Direction.right:
                    moveElement(Elements.penguin1, p1, 0, 1);
                    moveElement(Elements.penguin2, p2, 0, -1);
                    break;
            }
        }
        
        function randomStep() {
            let step = Math.floor((Math.random() * 4 - 1) + 1);
            return step;
        }
    });
});

// Graphics Dictionary
const Graphics = {
    space : '<div class="space" title="%title%"></div>',
    barrier  : '<div class="barrier" title="%title%"></div>',
    penguin1  : '<div class="penguin1" title="%title%"></div>',
    penguin2 : '<div class="penguin2" title="%title%"></div>',
    life     : '<div class="life" title="%title%"></div>',
    wall : '<div class="wall" title="%title%"></div>',
    same : '<div class="same" title="%title%"></div>'
}

function printMap(matrix) {

    let html = "";

    for (let i =0; i < matrix.length; i ++ ) {
        html += '<div class="row">';
        for (j = 0; j < matrix.length; j ++) {
           
            switch (map[i][j]) {
                case Elements.space:
                    html += Graphics.space.replace("%title%",i+","+j);
                    break;
                case Elements.barrier:
                    html += Graphics.barrier.replace("%title%",i+","+j);
                    break;
                case Elements.penguin1:
                    html += Graphics.penguin1.replace("%title%",i+","+j);
                    break;
                case Elements.penguin2:
                    html += Graphics.penguin2.replace("%title%",i+","+j);
                    break;
                case Elements.life:
                    html += Graphics.life.replace("%title%",i+","+j);
                    break;
                case Elements.wall:
                    html += Graphics.wall.replace("%title%",i+","+j);
                    break;
                case Elements.same:
                    html += Graphics.same.replace("%title%",i+","+j);
                    break;
            }
        }
        html += '</div>';
    }
    $(".labyrinth").html(html);
}