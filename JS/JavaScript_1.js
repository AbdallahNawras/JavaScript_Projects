function Color_Function() {
    var Color_output;
    var Colors = document.getElementById("Color_Input").value;
    var Color_String = " is a great color!";
    switch(Colors) {
        case "Red":
            Color_output = "Red" + Color_String;
            break;
        case "Yellow":
            Color_output = "Yellow" + Color_String;
            break;
        case "Blue":
            Color_output = "Blue" + Color_String;
            break;
        default:
            Color_output = "Please enter a color exactly as writter on the above list.";        
    }
    document.getElementById("output").innerHTML = Color_output;
}

function Hello_world_function() {
    var A = document.getElementsByClassName("click");
    A[0].innerHTML = "The text has changed!"; //A[0] display in the first element. 
}

var c = document.getElementById("myCanvas");
var pic = c.getContext("2d");
pic.moveTo(0,0); //moves the path to the specified point in the canvas,without creatin a line.
pic.lineTo(600,300);//add a new point and create a line to that point.
pic.stroke();//draws the path you defined.

//another <canvas> using createLinearGradient() method.
var x = document.getElementById("anotherCanvas");
var pic2 = x.getContext("2d");
var grd = pic2.createLinearGradient(0, 0, 170, 0);
grd.addColorStop(0, "black");
grd.addColorStop(1, "white");
pic2.fillStyle = grd;
pic2.fillRect(20,20,150,100);