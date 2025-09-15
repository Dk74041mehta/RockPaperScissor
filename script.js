//INITIALIZE SCORES//
let userScore = localStorage.getItem("userScore") ? parseInt(localStorage.getItem("userScore")) : 0;
let computerScore = localStorage.getItem("computerScore") ? parseInt(localStorage.getItem("computerScore")) : 0;

// UPDATE SCORE ON PAGE LOAD //
document.addEventListener("DOMContentLoaded", () => {
  updateScores();
});

//ELEMENTS//
const choices = document.querySelectorAll(".choice");

//TOGGLE RULES BOX//
function toggleRules(id = 'rules-box') {
  const box = document.getElementById(id);
  if (!box) return;
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

// USER CHOICE EVENT//
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const compChoice = getComputerChoice();
    const result = getWinner(userChoice, compChoice);
    showResult(userChoice, compChoice, result);
  });
});

// GET RANDOM COMPUTER CHOICE //
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// GET WINNER//
function getWinner(user, comp) {
  if (user === comp) return "tie";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return "win";
  }
  return "lose";
}

//SHOW RESULT IN FRAME //
function showResult(user, comp, result) {
  hideAllFrames();

  const pcCircle = document.getElementById(
    result === "win" ? "pc-choice-win" :
    result === "lose" ? "pc-choice-lose" : "pc-choice-tie"
  );

  const userCircle = document.getElementById(
    result === "win" ? "user-choice-win" :
    result === "lose" ? "user-choice-lose" : "user-choice-tie"
  );

  // Clear old content
  pcCircle.innerHTML = "";
  userCircle.innerHTML = "";

  // Image elements
  const pcImg = document.createElement("img");
  pcImg.src = getChoiceImage(comp);
  pcImg.alt = comp;
  pcImg.style.width = "37px";
  pcImg.style.height = "53px";

  const userImg = document.createElement("img");
  userImg.src = getChoiceImage(user);
  userImg.alt = user;
  userImg.style.width = "37px";
  userImg.style.height = "53px";

  pcCircle.appendChild(pcImg);
  userCircle.appendChild(userImg);

  // Border styling
  pcCircle.style.border = getChoiceBorder(comp);
  userCircle.style.border = getChoiceBorder(user);

  // Show frame and update score
  if (result === "win") {
    userScore++;
    document.getElementById("frame-2").style.display = "block";
  } else if (result === "lose") {
    computerScore++;
    document.getElementById("frame-3").style.display = "block";
  } else {
    document.getElementById("frame-4").style.display = "block";
  }

  // Save to localStorage
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);

  updateScores();
}

// GET BORDER STYLE FOR CHOICE  //
const choiceBorders = {
  rock: "10px solid #0074B6",
  paper: "10px solid #FFA943",
  scissors: "10px solid #BD00FF"
};
function getChoiceBorder(choice) {
  return choiceBorders[choice];
}

// GET IMAGE PATH FOR CHOICE//
const choiceImages = {
  rock: "./assets/rock.png",
  paper: "./assets/paper.png",
  scissors: "./assets/scissor.png" 
};
function getChoiceImage(choice) {
  return choiceImages[choice];
}

// PLAY AGAIN //
function playAgain() {
  hideAllFrames();
  document.getElementById("frame-1").style.display = "block";
}

//SHOW SPECIFIC FRAME  //
function showFrame(id) {
  hideAllFrames();
  document.getElementById(id).style.display = "block";
}

// HIDE ALL FRAMES  //
function hideAllFrames() {
  document.querySelectorAll(".frame").forEach(f => f.style.display = "none");
}

//  UPDATE SCOREBOARD //
function updateScores() {
  document.querySelectorAll("#user-score, #user-score-2, #user-score-3, #user-score-4")
    .forEach(el => el.textContent = userScore);  // changed to textContent

  document.querySelectorAll("#computer-score, #computer-score-2, #computer-score-3, #computer-score-4")
    .forEach(el => el.textContent = computerScore);  // changed to textContent
}
