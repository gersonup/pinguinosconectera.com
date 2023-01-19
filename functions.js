$(document).ready(function(){
    $("#btn-draw").click(function(e) {
        e.preventDefault();
        //Number of barriers
        let numBarriers = $("#n").val();
        console.log(numBarriers);
    });
});