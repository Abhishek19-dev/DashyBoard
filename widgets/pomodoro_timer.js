document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    let timer;
    let isRunning = false;
    let minutes = 25;
    let seconds = 0;

    function updateDisplay() {
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        timerDisplay.textContent = `${minutesStr}:${secondsStr}`;
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;

        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    startBtn.disabled = false;
                    stopBtn.disabled = true;
                    alert('Pomodoro finished! Take a break.');
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }

    function stopTimer() {
        if (!isRunning) return;
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        minutes = 25;
        seconds = 0;
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    updateDisplay();
});
