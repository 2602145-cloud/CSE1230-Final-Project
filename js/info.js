const topics = [
    {
        image: "images/html.jpg",
        text: "HTML creates webpage structure."
    },
    {
        image: "images/css.jpg",
        text: "CSS styles webpages."
    },
    {
        image: "images/js.jpeg",
        text: "JavaScript adds interactivity."
    }
];

let currentIndex = 0;

function nextTopic() {

    document.getElementById("topicImage").src =
        topics[currentIndex].image;

    document.getElementById("topicText").textContent =
        topics[currentIndex].text;

    currentIndex++;

    if (currentIndex >= topics.length) {
        currentIndex = 0;
    }
}