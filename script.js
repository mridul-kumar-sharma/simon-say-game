// step 1 :- keypress -> game start 
//step 2:- btn flash + level1

let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highestscore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("game started", started);
    }

    levelUp();
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rand = Math.floor(Math.random() * 3);
    let randColor = btns[rand];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        document.querySelector("body").classList.add('wrong');
        setTimeout(function () {
            document.querySelector("body").classList.remove('wrong');
        }, 200);
        h2.innerHTML = `Game Over. Your score was <b>${level - 1}</b>.<br> Press any key to restart`;

        if (highestscore < level - 1) {
            highestscore = level - 1;
            h3.innerHTML = `Congratulations! High Score = <b>${highestscore}<br>`;
        }
        else {
            h3.innerHTML = `Current High Score = ${highestscore}`;
        }
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    level = 0;
    gameSeq = [];
}