// filepath: script.js
// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;
// ตัวแปรจับเวลา
let timeLeft = 60;
let timerId = null;
let gameOver = false;
// ฟังก์ชันอัปเดตจํานวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}
// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  updateDisplay();
  startTimer();
}
// ฟังก์ชันการจับเวลา
function startTimer() {
  clearInterval(timerId);
  timeLeft = 60;
  gameOver = false;

  const timerContainer = document.getElementById("timerContainer");
  timerContainer.textContent = `⏳ เวลาเหลือ: ${timeLeft} วินาที`;

  timerId = setInterval(() => {
    timeLeft--;
    timerContainer.textContent = `⏳ เวลาเหลือ: ${timeLeft} วินาที`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      endGameByTime();
    }
  }, 1000);
}

function endGameByTime() {
  gameOver = true;
  document.getElementById("resultContainer").innerHTML = `
    <div class="alert alert-danger" role="alert">
      ⏰ หมดเวลา! เกมจบแล้ว
    </div>
  `;
}

// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  if (gameOver) return;
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");
  // Validation: ตรวจสอบว่าใส่ตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลข!
 </div>
 `;
    return;
  }
  // Validation: ตรวจสอบว่าอยู่ในช่วง 1-100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!
 </div>
 `;
    return;
  }
  attemptCount++;
  if (guessValue === secretNumber) {
    clearInterval(timerId);
    gameOver = true;
    resultContainer.innerHTML = `
 <div class="alert alert-success" role="alert">
 <h5>✓ ถูกต้อง!</h5>
 <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
 </div>
 `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
 <div class="alert alert-warning" role="alert">
 ↓ ตัวเลขสูงไป
 </div>
 `;
  } else {
    resultContainer.innerHTML = `
 <div class="alert alert-info" role="alert">
 ↑ ตัวเลขตํ่าไป
 </div>
 `;
  }
  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}
// filepath: script.js
// ...existing code...
// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  clearInterval(timerId);
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}
// เริ่มเกมเมื่อโหลดหน้า
window.addEventListener("load", initializeGame);
// เพิ่มการ select text เมื่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});
// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
