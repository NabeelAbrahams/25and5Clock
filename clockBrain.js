let breakDecrementButton = document.getElementById('break-decrement');
let breakIncrementButton = document.getElementById('break-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');

let timer;
let now;
let nowSeconds;
let countDownDate;
let timerStatus = "begin" // begin, counting, stopped

// Session length as minutes
let sessionLengthNumber = parseInt(sessionLength.innerText); 

// Seconds from session length 
let sessionLengthSeconds = sessionLengthNumber * 60;

// Session Length Decrement
sessionDecrementButton.addEventListener("click", () => {
    if (sessionLengthNumber > 0) {
        sessionLengthNumber -= 1;
        sessionLength.innerText = sessionLengthNumber
        sessionLengthSeconds = sessionLengthNumber * 60;

        if (sessionLengthNumber >= 10) {
            timeLeft.innerText = (parseInt(timeLeft.innerText) - 1) + ":00";
        } else  {
            timeLeft.innerText = "0" + (parseInt(timeLeft.innerText) - 1) + ":00";
        }
    }

    else if (sessionLengthNumber <= 1) {
        sessionLengthNumber = 0;
        timeLeft.innerText = "00:00";
        sessionLength.innerText = sessionLengthNumber + " (min. value reached)"
    }
})

// Session Length Increment
sessionIncrementButton.addEventListener("click", () => {
    if (sessionLengthNumber < 60) {
        sessionLengthNumber += 1;
        sessionLength.innerText = sessionLengthNumber
        sessionLengthSeconds = sessionLengthNumber * 60;

        if (sessionLengthNumber >= 10) {
            timeLeft.innerText = (parseInt(timeLeft.innerText) + 1) + ":00";
        } else  {
            timeLeft.innerText = "0" + (parseInt(timeLeft.innerText) + 1) + ":00";
        }
    }

    else if (sessionLengthNumber >= 60) {
        sessionLengthNumber = 60;
        timeLeft.innerText = "60:00";
        sessionLength.innerText = sessionLengthNumber + " (max. value reached)";
    }
})

// Break length as minutes
let breakLengthNumber = parseInt(breakLength.innerText); 

// Break Length Decrement
breakDecrementButton.addEventListener("click", () => {
    if (breakLengthNumber > 0) {
        breakLengthNumber -= 1;
        breakLength.innerHTML = breakLengthNumber;
    } 
    
    else if (breakLengthNumber <= 1) {
        breakLengthNumber = 1;
        breakLength.innerText = breakLengthNumber + " (min. value reached)"
    } 
})

// Break Length Increment
breakIncrementButton.addEventListener("click", () => {
    if (breakLengthNumber < 60) {
    breakLengthNumber += 1;
    breakLength.innerHTML = breakLengthNumber;
    }

    else if (breakLengthNumber >= 60) {
        breakLengthNumber = 60;
        breakLength.innerText = breakLengthNumber + " (max. value reached)"
    }
})

// Start/Stop Button 
startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "stopped") {
        
        // Get today's date and time
        now = new Date().getTime();

        // Get time in a session length from now
        nowSeconds = now / 1000
        countDownDate = nowSeconds + sessionLengthSeconds

        //start the timer
        console.log('timer has started and will run for session length = ' + sessionLengthSeconds);
        timerStatus = "counting";
        timer = setInterval(timerDecrement, 1000);
    } 
    
    else if (timerStatus === "counting") {
        // stop the timer
        console.log("timer has stopped");
        timerStatus = "stopped";
        clearInterval(timer);
    }
})

// Reset button
resetButton.addEventListener("click", () => {
    console.log("reset button clicked")
    clearInterval(timer);
    breakLengthNumber = 5;
    sessionLengthNumber = 25;
    breakLength.innerText = breakLengthNumber;
    sessionLength.innerText = sessionLengthNumber;
    timeLeft.innerText = "25:00";
})


function timerDecrement() {  
    
    // Get today's date and time
    now = new Date().getTime();

    // Get time in a session length from now
    nowSeconds = now / 1000
    console.log(nowSeconds);
    
    // Find the distance between now and the count down date
    var distance = (countDownDate - nowSeconds) * 1000; // in milliseconds
    console.log(distance);

    // Time calculations for minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    if (minutes >= 10 && seconds >= 10) {
        timeLeft.innerHTML = minutes + ":" + seconds;
    }

    else if (minutes >= 10 && seconds < 10) {
        timeLeft.innerHTML = minutes + ":0" + seconds;
    }

    else if (minutes < 10 && seconds < 10) {
        timeLeft.innerHTML = "0" + minutes + ":0" + seconds;
    }

    else if (minutes < 10 && seconds >= 10) {
        timeLeft.innerHTML = "0" + minutes + ":" + seconds;
    }

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(timer);
        timeLeft.innerHTML = "EXPIRED";
    }

}