window.onload = function () {
    var timerElement = document.getElementById("timer");
    var totalSeconds = 10 * 60; // 10 minutes in seconds
    var timerInterval;

    function updateTimer() {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
        }
    }

    function startTimer() {
        timerElement.textContent = `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
        timerInterval = setInterval(updateTimer, 1000);
        timerElement.parentElement.classList.add("running");
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerElement.parentElement.classList.add("paused");
        setTimeout(function () {
            timerElement.parentElement.classList.remove("paused");
        }, 300); // After 300ms, remove the "paused" class to show the transition effect
    }

    timerElement.addEventListener("click", function () {
        // Toggle between starting and pausing the timer when clicked
        if (!timerInterval) {
            startTimer();
        } else {
            pauseTimer();
        }
    });

    var questionElement = document.getElementById("question");
    questionElement.addEventListener("click", function () {
        // Reset the timer when the question is clicked
        pauseTimer();
        totalSeconds = 10 * 60;
        timerElement.textContent = "Click to Start";
    });
};