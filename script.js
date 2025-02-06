// Predefined set of colors
const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
  "#1A5276",
  "#1E8449",
];

// DOM Elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let targetColor;
let score = 0;

// Function to start a new game
function startNewGame() {
  // Reset game status
  gameStatus.textContent = "";
  gameStatus.style.color = "#333";

  // Randomly select a target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  // Assign random colors to the buttons
  let shuffledColors = [...colors].sort(() => Math.random() - 0.5);

  // Checks if the target colour is part of the shuffled colours. if not, it extracts the first 5 and pushes the target the colour in before shuffling the array again
  if (!shuffledColors.slice(0, 6).includes(targetColor)) {
    shuffledColors = shuffledColors.slice(0, 5);
    shuffledColors.push(targetColor);
    shuffledColors.sort(() => Math.random() - 0.5);
  }

  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = shuffledColors[index];
  });
}

// Function to handle color option clicks
function handleColorClick(event) {
  const selectedColor = event.target.style.backgroundColor;
  const targetColor = colorBox.style.backgroundColor;

  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
    score++;
    scoreElement.textContent = `Score: ${score}`;
    startNewGame(); // Start a new round after correct guess
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.style.color = "red";
    event.target.style.opacity = "0.5"; // Fade out wrong option
    event.target.disabled = true; // Disable wrong option
  }
}

// Event Listeners
colorOptions.forEach((button) => {
  button.addEventListener("click", handleColorClick);
});

newGameButton.addEventListener("click", () => {
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  colorOptions.forEach((button) => {
    button.style.opacity = "1";
    button.disabled = false;
  });
  startNewGame();
});

// Initialize the game
startNewGame();
