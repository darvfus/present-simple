const sentenceContainer = document.getElementById("sentence-container");
const optionsContainer = document.getElementById("options-container");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const feedback = document.getElementById("feedback");
const timerElement = document.getElementById("timer");

const sentences = [
    // Positive sentences
    { subject: "I", verb: "wake up", complement: "early every day." },
    { subject: "She", verb: "gets up", complement: "at 7:00 AM." },
    { subject: "He", verb: "brushes", complement: "his teeth twice a day." },
    { subject: "We", verb: "shower", complement: "after exercising." },
    { subject: "They", verb: "dress", complement: "quickly in the morning." },
    { subject: "I", verb: "eat", complement: "breakfast with my family." },
    { subject: "She", verb: "makes", complement: "coffee every morning." },
    { subject: "He", verb: "goes", complement: "to the park on weekends." },
    { subject: "We", verb: "leave", complement: "for work at 8:30 AM." },
    { subject: "They", verb: "study", complement: "English in the evening." },

    // Negative sentences
    { subject: "I", verb: "don’t wake up", complement: "late on weekdays." },
    { subject: "She", verb: "doesn’t get up", complement: "before 6:00 AM." },
    { subject: "He", verb: "doesn’t brush", complement: "his teeth after lunch." },
    { subject: "We", verb: "don’t shower", complement: "every night." },
    { subject: "They", verb: "don’t dress", complement: "formally for casual meetings." },
    { subject: "I", verb: "don’t eat", complement: "fast food very often." },
    { subject: "She", verb: "doesn’t make", complement: "dinner on Fridays." },
    { subject: "He", verb: "doesn’t go", complement: "to the gym in the afternoon." },
    { subject: "We", verb: "don’t leave", complement: "the house without our keys." },
    { subject: "They", verb: "don’t study", complement: "math on weekends." },

    // Interrogative sentences
    { subject: "Do", verb: "you wake up", complement: "early on weekends?" },
    { subject: "Does", verb: "she get up", complement: "at 6:00 AM every day?" },
    { subject: "Does", verb: "he brush", complement: "his teeth before bed?" },
    { subject: "Do", verb: "we shower", complement: "after working out?" },
    { subject: "Do", verb: "they dress", complement: "casually on Fridays?" },
    { subject: "Do", verb: "I eat", complement: "healthy food every day?" },
    { subject: "Does", verb: "she make", complement: "breakfast for the kids?" },
    { subject: "Does", verb: "he go", complement: "to the library to study?" },
    { subject: "Do", verb: "we leave", complement: "the office at 5:00 PM?" },
    { subject: "Do", verb: "they study", complement: "together for exams?" }
];
const instructions = {
    positive: {
        type: "Oración positiva",
        structure: "subject+ Verbo (en presente simple) + Complement",
        example: "Ejemplo: She gets up at 7:00 AM."
    },
    negative: {
        type: "Oración negativa",
        structure: "subject+ Auxiliar (don't/doesn't) + Verbo base + Complemento",
        example: "Ejemplo: She doesn't get up before 6:00 AM."
    },
    interrogative: {
        type: "Oración interrogativa",
        structure: "Auxiliar (Do/Does) + Sujeto + Verbo base + Complemento?",
        example: "Ejemplo: Does she get up at 6:00 AM every day?"
    }
};

function updateInstruction(type) {
    const instructionContainer = document.getElementById("instruction");
    const currentInstruction = instructions[type];

    instructionContainer.innerHTML = `
        <h2>${currentInstruction.type}</h2>
        <p><strong>Estructura:</strong> ${currentInstruction.structure}</p>
        <p><strong>${currentInstruction.example}</strong></p>
    `;
}

// Llamar esta función cuando cambie la oración (al presionar "Siguiente")
updateInstruction("positive"); // Cambiar entre "positive", "negative" o "interrogative" según sea necesario

let currentSentence = {};
let timeLeft = 15;
let timer;

function startGame() {
    feedback.textContent = "";
    timerElement.textContent = `Tiempo restante: 10 segundos`;
    timeLeft = 15;

    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const words = [currentSentence.subject, currentSentence.verb, currentSentence.complement];

    sentenceContainer.innerHTML = "";
    optionsContainer.innerHTML = "";

    words.forEach(() => {
        const blank = document.createElement("div");
        blank.className = "blank";
        blank.textContent = "______";
        blank.dataset.type = "blank";
        sentenceContainer.appendChild(blank);
    });

    shuffleArray(words).forEach((word) => {
        const wordBlock = document.createElement("div");
        wordBlock.className = "word-block";
        wordBlock.textContent = word;
        wordBlock.draggable = true;
        wordBlock.addEventListener("dragstart", handleDragStart);
        optionsContainer.appendChild(wordBlock);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = "¡Se acabó el tiempo! Intenta nuevamente.";
            feedback.style.color = "red";
        }
    }, 1000);
}

function handleDragStart(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

sentenceContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
});

sentenceContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const blank = event.target;
    if (blank.dataset.type === "blank") {
        blank.textContent = data;
        blank.dataset.type = "filled";
    }
});

checkButton.addEventListener("click", () => {
    const userSentence = Array.from(sentenceContainer.children).map((block) => block.textContent).join(" ");
    const correctSentence = `${currentSentence.subject} ${currentSentence.verb} ${currentSentence.complement}`;
    if (userSentence === correctSentence) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        clearInterval(timer);
    } else {
        feedback.textContent = "Inténtalo nuevamente.";
        feedback.style.color = "red";
    }
});

nextButton.addEventListener("click", startGame);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

startGame();
