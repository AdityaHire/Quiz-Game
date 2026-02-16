// Quiz Questions Data
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "In which year did World War II end?",
        answers: ["1944", "1945", "1946", "1947"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which mammal is known to have the most powerful bite in the world?",
        answers: ["Lion", "Tiger", "Hippopotamus", "Crocodile"],
        correct: 2
    },
    {
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        correct: 2
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    }
];

// Game State Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let isAnswering = true;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const progressBar = document.getElementById('progress');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showScreen(screenToShow) {
    const screens = [startScreen, quizScreen, resultScreen];
    screens.forEach(screen => screen.classList.remove('active'));
    screenToShow.classList.add('active');
}

// Quiz Functions
function startQuiz() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    isAnswering = true;
    
    // Select 5 random questions
    selectedQuestions = shuffleArray(quizQuestions).slice(0, 5);
    
    // Update UI
    totalQuestionsSpan.textContent = selectedQuestions.length;
    maxScoreSpan.textContent = selectedQuestions.length;
    scoreSpan.textContent = score;
    
    // Show quiz screen and display first question
    showScreen(quizScreen);
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }

    isAnswering = true;
    const question = selectedQuestions[currentQuestionIndex];
    
    // Update question text and progress
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progressPercentage = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer buttons
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (!isAnswering) return;
    
    isAnswering = false;
    const question = selectedQuestions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Highlight selected answer
    answerButtons[selectedIndex].classList.add('selected');
    
    // Show correct and wrong answers
    setTimeout(() => {
        answerButtons.forEach((button, index) => {
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                button.classList.add('wrong');
            }
        });
        
        // Update score if correct
        if (selectedIndex === question.correct) {
            score++;
            scoreSpan.textContent = score;
        }
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    }, 500);
}

function showResults() {
    // Calculate percentage and message
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    let message, messageClass;
    
    if (percentage >= 80) {
        message = "Excellent! You're a quiz master! 🏆";
        messageClass = "excellent";
    } else if (percentage >= 60) {
        message = "Good job! Keep up the great work! 👍";
        messageClass = "good";
    } else {
        message = "Keep practicing! You'll improve! 💪";
        messageClass = "needs-improvement";
    }
    
    // Update result display
    finalScoreSpan.textContent = score;
    resultMessage.textContent = message;
    resultMessage.className = messageClass;
    
    // Show result screen
    showScreen(resultScreen);
}

function restartQuiz() {
    showScreen(startScreen);
}

// Initialize the quiz
document.addEventListener('DOMContentLoaded', () => {
    // Ensure start screen is shown initially
    showScreen(startScreen);
});
