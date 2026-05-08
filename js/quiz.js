//Questions
/*TODO:
 have it show nothing at start
have it preventcheating by offtabbing
have it have a question bank
make sure its related to info

*/

const answers = [
    { id: "q1", answer: "ottawa" },
    { id: "q2", answer: "earth" },
    { id: "q3", answer: "lion" },
    { id: "q4", answer: "computer science" }
];

const images = [
    {
        id: "q3", images: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/1280px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TL4FLUC3j4R0D-uL1VHasI-CBQsJN5EUfg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIA7NB9eh4zU8fM7t7s2S9k1iMmIfDrDJCRA&s",
            "https://cdn.britannica.com/29/150929-050-547070A1/lion-Kenya-Masai-Mara-National-Reserve.jpg",
            "https://animalfactguide.com/wp-content/uploads/2020/12/lion.jpg",
        ]
    }
]
let timeLeft = 60;
let timerInterval;
let quizStarted = false;

//displays goodluck message and starts quiz
function displayMessage() {
    if (quizStarted) return;
    resetQuiz()
    quizStarted = true;


    timeLeft = 60;
    startTimer();

    const name = document.getElementById("nameInput").value.trim();
    document.getElementById("message").textContent =
        name ? "Good luck, " + name + "!" : "Good luck!";

    shuffleQuestions();
    updateQuestionNumbers();
}


// Marks the quiz
function mark() {
    if (!quizStarted) return;

    clearInterval(timerInterval);
    quizStarted = false;

    let score = 0;

    answers.forEach(q => {
        const input = document.getElementById(q.id);
        const userAnswer = input.value.trim().toLowerCase();

        let feedback = document.getElementById(q.id + "-feedback");

        if (!feedback) {
            feedback = document.createElement("p");
            feedback.id = q.id + "-feedback";
            input.parentNode.appendChild(feedback);
        }

        if (userAnswer === "") {
            feedback.textContent = "No answer";
            feedback.style.color = "orange";
            return;
        }

        if (userAnswer === q.answer) {
            score++;
            feedback.textContent = "Correct";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Incorrect (Answer: " + q.answer + ")";
            feedback.style.color = "red";
        }
    });

    document.getElementById("result").textContent =
        "Your score is " + score + " / " + answers.length;

    saveHighScore(score);
    disableQuiz();
}

// Disabels quiz by disabling responding and mark

function disableQuiz() {
    answers.forEach(q => {
        document.getElementById(q.id).disabled = true;
    });

    document.querySelector(".mark-btn").disabled = true;
}

// Resets hte quiz feedback, timer, mark, result, and message
function resetQuiz() {
    clearInterval(timerInterval);
    quizStarted = false;

    answers.forEach(q => {
        const input = document.getElementById(q.id);
        input.value = "";
        input.disabled = false;

        const feedback = document.getElementById(q.id + "-feedback");
        if (feedback) feedback.remove();
    });

    document.getElementById("result").textContent = "";
    document.getElementById("message").textContent = "";
    document.querySelector(".mark-btn").disabled = false;

    timeLeft = 60;
    document.getElementById("timer").textContent = "Time left: 60s";
}

// Shuffles the questios
function shuffleQuestions() {
    const container = document.getElementById("questions-container");
    //This keep happening for some reason I need to occasionally space things out for it work

    const questions = Array.from(container.querySelectorAll(".question"));


    questions.sort(() => Math.random() - 0.5);
    questions.forEach(q => container.appendChild(q));
}



// Changes the question numbers based on the sort
function updateQuestionNumbers() {
    const container = document.getElementById("questions-container");
    const questions = Array.from(container.querySelectorAll(".question"));

    questions.forEach((questionEl, index) => {
        const header = questionEl.querySelector("h2");
        header.textContent = "Question " + (index + 1);

        // Will eventually need to run a signle time and not for every question
        const img = questionEl.querySelector("img");

        if (img) {
            const match = images.find(imgObj => imgObj.id === questionEl.querySelector("input").id);

            if (match) {
                img.src = match.images[Math.floor(Math.random() * match.images.length)];
            }
        }
    });
}

// Starts timer and counts down from 60
function startTimer() {
    const timerDisplay = document.getElementById("timer");

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "Time left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            mark();
        }
    }, 1000);
}

//Saves High to localstorage
function saveHighScore(score) {
    const highScore = parseInt(localStorage.getItem("highScore")) || 0;

    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }

    loadHighScore();
}

//loads High from localstorage

function loadHighScore() {
    const highScore = parseInt(localStorage.getItem("highScore")) || 0;

    document.getElementById("highScore").textContent =
        "High Score: " + highScore;
}

//Show high score
window.onload = function () {
    loadHighScore();
};