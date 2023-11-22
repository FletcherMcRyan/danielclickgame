let money = 0;
let plus = 5;
var enemies = [];
var hit;
var music;
var left = 1;
var right = 1;
var up = 1;
var down = 1;


function mySecondFunction()
{
    if (money >= 400)
    {
        money = money - 400;
        plus = multiplier + 5;
    }
}



function myFunction()
{
    money = money + plus;
    document.getElementById("coinamount").innerHTML = "Daniel Points: " + money;
}


var enemy, enemytwo, pic;
function startGame()
{
    line = new component (1, 1100, "red", 540, 1);
    sideone = new component(750, 750, "mouth.png", -200, 50, "image");
    bar = new component (800, 10, "lightgreen", 550, 775);
    enemy = new component (10, 10, "darkgreen", 10, 10);
    enemytwo = new component (20, 25, "darkgreen", 20, 15);
    pic = new component (50, 50,"daniel.png", 900, 300, "image");
    music = new sound("danielclick.mp3");
    music.play();
    gamerange.start();
    hit = new sound("hit.mp3");
}


var gamerange =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width = 1900;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updategamerange, 20);
        window.addEventListener('keydown', function (e)
        {
            gamerange.keys = (gamerange.keys || []);
            gamerange.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e)
        {
            gamerange.keys[e.keyCode] = false;
        })

    },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    },
    stop : function() 
    {
        var score = money + left * 10 + right * 10 + up * 10 + down * 10 + plus * 10;
        document.getElementById("restart").style.display = "initial";
        document.getElementById("restart").innerHTML = "REFRESH TO RESTART | Final Score: " + score;
        document.getElementById("clickbutton").style.display = "none";
        document.getElementById("speedbutton").style.display = "none";
        document.getElementById("healing").style.display = "none";
        document.getElementById("plus").style.display = "none";
        document.getElementById("coinamount").style.display = "none";
        music.stop();
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type)
{
    this.type = type;
    if (type == "image")
    {
        this.image = new Image();
        this.image.src = color;
    }
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = gamerange.context;
        if (type == "image")
        {
            ctx.drawImage(this.image, 
                this.x, 
                this.y, 
                this.width, this.height);
        }
        else
        {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitleft();
        this.hitBottom();
        this.hitright();
        this.hittop();

    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
      this.hitBottom = function() {
        var rockbottom = gamerange.canvas.height - this.height;
        if (this.y > rockbottom) {
          this.y = rockbottom;
        }
      }
      this.hitleft = function() {
        var rockleft = gamerange.canvas.width - this.width;
        if (this.x > rockleft) {
          this.x = rockleft;
        }
      }
      this.hitright = function() {
        if (this.x < 0) {
          this.x = 0;
        }
      }
      this.hittop = function() {
        if (this.y < 0) {
          this.y = 0;
        }
      }
}


function updategamerange()
 {
    //if (pic.x == )

    if (bar.width <= 0)
    {
        gamerange.stop();
    }

    var x, y;
    for (i = 0; i < enemies.length; i += 1) {
      if (pic.crashWith(enemies[i])) {
        hit.play();
        bar.width -= 5;
      }
    }
    gamerange.clear();
    gamerange.frameNo += 1;
    if (gamerange.frameNo == 1 || everyinterval(100)) {
      x = 300;
      y = 510;
      enemies.push(new component(20, 20, "green", x, y));
    }
    
    for (i = 0; i <enemies.length; i += 1) {
      gennumber();
      enemies[i].x += 2;
      enemies[i].y += randomnumber;
      enemies[i].update();
    }
    if (pic.crashWith(sideone)) {
      hit.play();
      bar.width -= 5;
    }
    music.play();

    pic.speedX = 0;
    pic.speedY = 0;
    if (gamerange.keys && gamerange.keys[65]) {pic.speedX = pic.speedX - left; }
    if (gamerange.keys && gamerange.keys[68]) {pic.speedX = pic.speedX + right; }
    if (gamerange.keys && gamerange.keys[87]) {pic.speedY = pic.speedY - up; }
    if (gamerange.keys && gamerange.keys[83]) {pic.speedY = pic.speedY + down; }
    pic.newPos();
    pic.update();
    pic.width = money + 80;
    pic.height = money + 80;
    bar.update();
    line.update();
    sideone.update();
    sidetwo.update();

  }

  function everyinterval (n) 
{
    if ((gamerange.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function gennumber()
{
    randomnumber = Math.floor(Math.random() *50) -25;
    randomnumbertwo = Math.floor(Math.random() *50) -25; 
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  function speedfunction()
  {

    if (money >= 200)
    {
        money = money - 200;
        left = left + 1;
        right = right + 1;
        down = down + 1;
        up = up + 1;

    }
  }


  function barup()
  {
    
    
    
    if (money >= 150)
    {
        money = money - 150;
        bar.width = bar.width + 150;
    }
  }

  //done
