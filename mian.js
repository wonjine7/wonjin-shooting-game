//캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,gameoverImage;

//우주선 좌표
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64


function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src="images/background.webp";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.jpg" 
}

let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
       //console.log("무슨 키가 눌렸어?", event.keyCode)

       keysDown[event.keyCode] = true
       console.log("키다운객체에 들어간 값은?", keysDown);

    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        console.log("버튼 클릭후", keysDown);
    })
}


function update(){
    if(39 in keysDown){
        spaceshipX += 3;  //우주선의 속도
    } // 오른쪽버튼

    if(37 in keysDown){
        spaceshipX -= 3;  //우주선의 속도
    } // 왼쪽버튼

    if(38 in keysDown){
        spaceshipY -= 3;
    } // 위쪽버튼

    if(40 in keysDown){
        spaceshipY += 3;
    } // 아래버튼

    //우주선의 좌표값이 무한대로 업데이트가 되는게 아닌 경기장 안에서만 있게 하기
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }

    if(spaceshipX >= canvas.width-60){
        spaceshipX = canvas.width-60;
    }

    if(spaceshipY <= 0){
        spaceshipY = 0;
    }

    if(spaceshipY >= canvas.height-60){
        spaceshipY = canvas.height-60;
    }
}



function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY)
}

function main() {
    update(); //좌표값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
