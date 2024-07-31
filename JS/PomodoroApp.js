window.onload = () => {
    let workTime;
    let breakTime;
    let timesCompleted;
    let currentTime = 0; // Minutos seteados
    let cyclesGoal;
    let restTime;
    let cyclesCompleted = 0;
    let seconds = 0;

    let clock = document.getElementById("clock");
    let cyclesInput = document.getElementById("cycles-input");
    let startButton = document.getElementById("start-button");
    let workTimeInput = document.getElementById("work-time");
    let breakTimeInput = document.getElementById("break-time");
    let restTimeInput = document.getElementById("rest-time");

    function updateClock(){
        clockMinutes = formatNumbers(currentTime);
        clockSeconds = formatNumbers(seconds);
        clock.innerHTML= clockMinutes + ":" +clockSeconds;
    }

    function formatNumbers(time){
        let formattedDigits;
    
        if(time<10){
            formattedDigits = "0" + time;
        }else{
            formattedDigits = time;
        }
        return formattedDigits;
    }

    startButton.onclick = () => {
        populateVariables();
        startPomodoro();
    }

    function populateVariables() {
        console.log("Populate variables");
        workTime = parseInt(workTimeInput.value);
        breakTime = parseInt(breakTimeInput.value);
        restTime = parseInt(restTimeInput.value);
        cyclesGoal = parseInt(cyclesInput.value);
        timesCompleted = 0;
    }

    function startPomodoro() {
        console.log("Started pomodoro");
        pomodoroController();
    }

    function isResteTime() {
        return timesCompleted === 7;
    }

    function goalReached() {
        return cyclesGoal === cyclesCompleted;
    }

    function pomodoroController() {
        if (isResteTime()) {
            cyclesCompleted++;
            if (!goalReached()) {
                currentTime = restTime;
                timesCompleted = 0;
                timer();
            } else {
                console.log("Pomodoro finished");
                return;
            }
        } else {
            if (timesCompleted % 2 === 0) {
                currentTime = workTime;
                console.log("Time to Work! TC " + timesCompleted);
            } else {
                currentTime = breakTime;
                console.log("Time to Break! TC " + timesCompleted);
            }
            timesCompleted++;
            timer();
        }
    }

    function timer() {
        if (currentTime > 0 || seconds > 0) {
            if (seconds === 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            setTimeout(timer, 1000);
        } else {
            pomodoroController();
        }
    }
}
