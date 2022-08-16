//캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,gameoverImage,bulletImage;

//우주선 좌표
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64
let bulletList = [] // 총알들을 저장하는 리스트
function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function(){  // 총알이 우주선에서 부터 나가도록 초기화
        this.x = spaceshipX+20;
        this.y = spaceshipY;

        bulletList.push(this)  //this안에는 x,y,init이 들어간다
    };
    this.update = function(){
        this.y -= 7; 
    };
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src="images/background.webp";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.jpg" 

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png" 
    
}

let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
       //console.log("무슨 키가 눌렸어?", event.keyCode)

       keysDown[event.keyCode] = true
       //console.log("키다운객체에 들어간 값은?", keysDown);

    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        //console.log("버튼 클릭후", keysDown);

        if(event.keyCode == 32){
            createBullet() //총알 생성하는 함수
        }
    })
}

function createBullet(){
    console.log("총알생성");
    let b = new Bullet(); // 총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트",bulletList);
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

    //총알의 y좌표 업데이트하는 함수 호출
    for(let i=0; i<bulletList.length; i++){
        bulletList[i].update()
    }
}



function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY)
    for(let i=0; i<bulletList.length; i++){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)
    }
}

function main() {
    update(); //좌표값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();


//방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다

//총알 만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선
//3. 발산된 총알들은