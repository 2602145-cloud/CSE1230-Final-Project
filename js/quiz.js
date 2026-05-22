//Questions
/*TODO:
have it show nothing at start
have it prevent cheating by offtabbing
make sure its related to info
*/

const answers = [
    { id: "q1", answer: "C#" },
    { id: "q2", answer: "Unity" },
    { id: "q3", answer: "html" },
    { id: "q4", answer: "computer science" }
];

const images = [
    {
        id: "q3",
        images: [
            "https://nathanielkam.com/wp-content/uploads/2020/05/florian-olivo-4hbJ-eymZ1o-unsplash.jpg",
            "https://www.wikihow.com/images/thumb/6/64/729927-31.jpg/aid729927-v4-1200px-729927-31.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtd1s3KB7xO1X6QJfvsZ5zlHGeTgeJteN0dQ&s"
        ]
    }
];

let timeLeft = 60;
let timerInterval;
let quizStarted = false;

// LOGIN CHECK
if (localStorage.getItem("loggedIn") !== "true") {
    alert("Not logged in, Please login!");
    window.location.href = "index.html";
}

function normalizeAnswer(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}
// HIDE QUIZ AT START
document.getElementById("questions-container").style.display = "none";

// USER INFO
document.getElementById("displayUser").textContent =    localStorage.getItem("username");

document.getElementById("displayEmail").textContent =    localStorage.getItem("email");

document.getElementById("displayContact").textContent =   localStorage.getItem("contact");



// START QUIZ
function displayMessage() {

    const name = document.getElementById("nameInput").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (quizStarted) return;

    quizStarted = true;

    document.getElementById("questions-container").style.display = "block";

    resetQuiz();

    startTimer();


    document.getElementById("message").textContent =
        "Good luck, " + name + "!";

    shuffleQuestions();

    updateQuestionNumbers();
}
// MARK QUIZ
function mark() {

    if (!quizStarted) return;

    clearInterval(timerInterval);

    quizStarted = false;



    let score = 0;

    answers.forEach(q => {

        const input = document.getElementById(q.id);

        const userAnswer = input.value.trim().toLowerCase();

        let feedback =  document.getElementById(q.id + "-feedback");

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

        if (normalizeAnswer(userAnswer) === normalizeAnswer(q.answer)) {

            score++;

            feedback.textContent = "Correct";

            feedback.style.color = "green";

        } else {

            feedback.textContent =     "Incorrect (Answer: " + q.answer + ")";

            feedback.style.color = "red";
        }
    });

    document.getElementById("result").textContent = "Your score is " +  score + " / " +   answers.length;

    saveHighScore(score);

    disableQuiz();
}

// DISABLE QUIZ
function disableQuiz() {

    answers.forEach(q => {

        document.getElementById(q.id).disabled = true;

    });

    document.querySelector(".mark-btn").disabled = true;
}

// RESET QUIZ
function resetQuiz() {

    clearInterval(timerInterval);

    answers.forEach(q => {

        const input = document.getElementById(q.id);

        input.value = "";

        input.disabled = false;

        const feedback = document.getElementById(q.id + "-feedback");

        if (feedback) feedback.remove();
    });

    document.getElementById("result").textContent = "";

    document.querySelector(".mark-btn").disabled = false;

    timeLeft = 60;

    document.getElementById("timer").textContent = "Time left: 60s";

    if (quizStarted) {
        startTimer();
    }
}

// SHUFFLE QUESTIONS
function shuffleQuestions() {

    const container =   document.getElementById("questions-container");

    const questions =  Array.from(container.querySelectorAll(".question"));

    questions.sort(() => Math.random() - 0.5);

    questions.forEach(q => container.appendChild(q));
}

// UPDATE QUESTION NUMBERS
function updateQuestionNumbers() {

    const container =  document.getElementById("questions-container");

    const questions =  Array.from(container.querySelectorAll(".question"));

    questions.forEach((questionEl, index) => {

        const header = questionEl.querySelector("h2");

        header.textContent =   "Question " + (index + 1);

        const img = questionEl.querySelector("img");

        if (img) {

            const match =
                images.find(imgObj =>
                    imgObj.id ===
                    questionEl.querySelector("input").id
                );

            if (match) {

                img.src =
                    match.images[
                    Math.floor(
                        Math.random() *
                        match.images.length
                    )
                    ];
            }
        }
    });
}

// TIMER
function startTimer() {

    const timerDisplay =      document.getElementById("timer");

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent =   "Time left: " + timeLeft + "s";

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            mark();
        }

    }, 1000);
}


// SAVE HIGH SCORE
function saveHighScore(score) {

    // USER HIGH SCORE
    const userHigh =   parseInt(localStorage.getItem("highScore")) || 0;

    if (score > userHigh) {

        localStorage.setItem("highScore", score);
    }

    // EVERYONE HIGH SCORE
    const globalHigh =  parseInt(localStorage.getItem("globalHighScore")) || 0;

    if (score > globalHigh) {

        localStorage.setItem("globalHighScore", score);
    }

    loadHighScore();
}

// LOAD HIGH SCORE
function loadHighScore() {

    const userHigh =  parseInt(localStorage.getItem("highScore")) || 0;

    const globalHigh =   parseInt(localStorage.getItem("globalHighScore")) || 0;

    document.getElementById("highScore").innerHTML =
        `
        Your High Score: ${userHigh}<br>
        Everyone High Score: ${globalHigh}
        `;
}

// LOGOUT
function logout() {

    localStorage.setItem("loggedIn", "false");

    localStorage.setItem("username", "");

    localStorage.setItem("email", "");

    localStorage.setItem("contact", "");

    alert("Logging out.");

    window.location.href = "index.html";
}

// PAGE LOAD
window.onload = function () {

    document.getElementById("questions-container").style.display = "none";

    loadHighScore();

};

let warningGiven = false;

document.addEventListener("visibilitychange", () => {

    if (quizStarted && document.hidden) {

        if (!warningGiven) {

            warningGiven = true;

            alert("Warning: Leaving the tab again will submit the quiz.");

        } else {

            alert("Cheating detected! Quiz submitted.");

            mark();
        }
    }
});