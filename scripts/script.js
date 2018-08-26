window.onload = function(){
    sBreakLengthSpan.textContent = timer.getShortBreak();
    lBreakLengthSpan.textContent = timer.getLongBreak();
    display.textContent = timer.getTime();
};

const display = document.querySelector("#display");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const timeUpButton = document.querySelector("#timeUp");
const timeDownButton = document.querySelector("#timeDown");
const sBreakUpButton = document.querySelector("#shortBreakUp");
const sBreakDownButton = document.querySelector("#shortBreakDown");
const sBreakLengthSpan = document.querySelector("#shortBreakLength");
const lBreakUpButton = document.querySelector("#longBreakUp");
const lBreakDownButton = document.querySelector("#longBreakDown");
const lBreakLengthSpan = document.querySelector("#longBreakLength");
const timer = function(){
    let min = 25,
        sec = 0,
        shortBreak = 5,
        longBreak = 15,
        breakCount = 0,
        onBreak = false,
        countdown; // timer
    return timing = {
        setTime: function(newMin){ min = newMin; },
        getTime: function(){ return timer.formatTime(min, sec); },
        setShortBreak: function(min){ shortBreak = min; },
        getShortBreak: function(){ return shortBreak; },
        setLongBreak: function(min){ longBreak = min; },
        getLongBreak: function(){ return longBreak; },
        startTimer: function(){
            countdown = setInterval(function(){
                sec = sec - 1;
                if( sec < 0 ) {
                    sec = 59;
                    min -= 1;
                }
                display.textContent = timer.formatTime(min, sec);
                if( min + sec < 1 && !onBreak ) {
                    if( breakCount === 3 ) {
                        min = longBreak;
                        onBreak = true;
                        breakCount = 0;
                        clearInterval(countdown);
                        timing.startTimer();
                    } else {
                        min = shortBreak;
                        onBreak = true;
                        breakCount++;
                        clearInterval(countdown);
                        timing.startTimer();
                    }
                } else if( min + sec < 1 && onBreak ) {
                    min = 0;
                    sec = 3;
                    onBreak = false;
                    clearInterval(countdown);
                    timing.startTimer();
                }
            }, 1000);
        },
        stopTimer: function(){
            clearInterval(countdown);
        },
        formatTime: function(min, sec){
            return `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
        }
    };
}();

function changeBreaklength(breakType, up){
    let currentLength;
    if(breakType === "short") {
        currentLength = timer.getShortBreak();
        currentLength = parseInt(currentLength);
        if(up) timer.setShortBreak( currentLength + 1 );
        else {
            if(currentLength > 1) timer.setShortBreak( currentLength - 1 );
        }
        sBreakLengthSpan.textContent = timer.getShortBreak();
    } else {
        currentLength = timer.getLongBreak();
        currentLength = parseInt(currentLength);
        if(up) timer.setLongBreak( currentLength + 1 );
        else {
            if(currentLength > 1) timer.setLongBreak( currentLength - 1 );
        }
        lBreakLengthSpan.textContent = timer.getLongBreak();
    }
}

function changeTime(up) {
    let currentTime = timer.getTime();
    currentTime = parseInt(currentTime);
    if(up) timer.setTime( currentTime + 1 );
    else {
        if(currentTime > 1) timer.setTime( currentTime - 1 );
    }
    display.textContent = timer.getTime();
}

startButton.addEventListener( "click", function(){
    timer.startTimer();
});

pauseButton.addEventListener( "click", function(){
    timer.stopTimer();
});

sBreakUpButton.addEventListener( "click", function(){
    changeBreaklength("short", true);
});

sBreakDownButton.addEventListener( "click", function(){
    changeBreaklength("short", false);
});

lBreakUpButton.addEventListener( "click", function(){
    changeBreaklength("long", true);
});

lBreakDownButton.addEventListener( "click", function(){
    changeBreaklength("long", false);
});

timeUpButton.addEventListener( "click", function(){
    changeTime(true);
});

timeDownButton.addEventListener( "click", function(){
    changeTime(false);
});



