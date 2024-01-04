narizX=0;
narizY=0;

diferencia=0;

muñeca_derecha=0;
muñeca_izquierda=0;



function setup(){

    video = createCapture(VIDEO);
    video.size(550, 550);

canvas = createCanvas(550, 550);
canvas.position(560,125);

estimacion_pose=ml5.poseNet(video, cargar_modelo);

estimacion_pose.on('pose', reconocer_pose);
}

function cargar_modelo(){
    console.log('PoseNet; es decir el modelo de estimación de poses se incializo')
}

function reconocer_pose(results){
if (results.length>0){
    console.log(results);

    narizX = results[0].pose.nose.x;
    narizY = results[0].pose.nose.y;

    console.log("narizX = " + narizX + "narizY =" + narizY);

    muñeca_derecha = results[0].pose.rightWrist.x;
    muñeca_izquierda = results[0].pose.leftWrist.x;

    diferencia = floor(muñeca_izquierda - muñeca_derecha);

    console.log("muñeca izquierda =" + muñeca_izquierda
     + " muñeca derecha = " + muñeca_derecha + " diferencia =" + diferencia);
}
}

function draw(){
    background('#FF7536');
    fill ('#FFB653');
    stroke ('#0081CF');
    square(narizX, narizY, diferencia);
    document.getElementById("square_side").innerHTML = "El ancho y alto del cuadrado será = " + diferencia + "px";
}