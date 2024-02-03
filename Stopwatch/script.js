let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".timer-display");
let int = null;
let lapsContainer = document.querySelector(".laps-container");

document.getElementById("start-timer").addEventListener("click", () => {
  if (int === null) {
    int = setInterval(displayTimer, 10);
    toggleButtonVisibility(["start-timer"]);
  }
});

document.getElementById("play-timer").addEventListener("click", () => {
  if (int === null) {
    int = setInterval(displayTimer, 10);
    toggleButtonVisibility(["play-timer"]);
  }
});

document.getElementById("pause-timer").addEventListener("click", () => {
  clearInterval(int);
  int = null;
  toggleButtonVisibility(["start-timer", "play-timer"]);
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerRef.innerHTML = "00 : 00 : 00 : 000";
  lapsContainer.innerHTML = "";
  toggleButtonVisibility(["start-timer"]);
});

document.getElementById("lap-timer").addEventListener("click", () => {
  let lapTime = timerRef.innerHTML;
  let lapDiv = document.createElement("div");
  lapDiv.className = "lap-item";
  lapDiv.innerText = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapDiv);
});

function displayTimer() {
  milliseconds += 10;
  seconds = milliseconds == 1000 ? (seconds + 1) % 60 : seconds;
  minutes = seconds == 0 && milliseconds == 0 ? (minutes + 1) % 60 : minutes;
  hours = minutes == 0 && seconds == 0 && milliseconds == 0 ? hours + 1 : hours;
  milliseconds = milliseconds == 1000 ? 0 : milliseconds;

  let h = String(hours).padStart(2, "0");
  let m = String(minutes).padStart(2, "0");
  let s = String(seconds).padStart(2, "0");
  let ms = String(milliseconds).padStart(3, "0");

  timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

function toggleButtonVisibility(activeButtonIds) {
  const buttonIds = ["start-timer", "play-timer", "pause-timer", "reset-timer", "lap-timer"];
  buttonIds.forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    button.style.display = activeButtonIds.includes(buttonId) ? "none" : "inline-block";
  });
}
