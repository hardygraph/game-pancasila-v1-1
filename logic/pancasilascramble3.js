// File: pancasilascramble.js

document.addEventListener('DOMContentLoaded', (event) => {
    const silaContainer = document.getElementById('sila-container');
    const timerElement = document.getElementById('time');
    const checkButton = document.getElementById('check-sentence');
    const resultElement = document.getElementById('result');
    const levelButtons = document.querySelectorAll('.level-button');
    const timerDiv = document.getElementById('timer');

    const silaSentences = {
        1: "Ketuhanan yang Maha Esa",
        2: "Kemanusiaan yang Adil dan Beradab",
        3: "Persatuan Indonesia",
        4: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan Perwakilan",
        5: "Keadilan Sosial bagi Seluruh Rakyat Indonesia"
    };

    let correctSentence = "";
    let scrambledWords = [];
    let draggedWord = null;
    let timer;
    let timeLeft = 60;

    // Function to create word elements
    function createWordElement(word) {
        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        wordElement.textContent = word;
        wordElement.setAttribute('draggable', true);

        wordElement.addEventListener('dragstart', (e) => {
            draggedWord = e.target;
        });

        wordElement.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        wordElement.addEventListener('drop', (e) => {
            if (e.target.classList.contains('word')) {
                let temp = draggedWord.textContent;
                draggedWord.textContent = e.target.textContent;
                e.target.textContent = temp;
            }
        });

        return wordElement;
    }

    // Create sentence container
    const sentenceContainer = document.createElement('div');
    sentenceContainer.className = 'sentence';

    function loadLevel(level) {
        silaContainer.innerHTML = '';
        sentenceContainer.innerHTML = '';
        resultElement.textContent = '';
        timeLeft = 60;
        timerElement.textContent = timeLeft;
        
        clearInterval(timer);

        correctSentence = silaSentences[level];
        scrambledWords = correctSentence.split(" ").sort(() => Math.random() - 0.5); // Shuffle words

        // Add words to sentence container
        scrambledWords.forEach(word => {
            const wordElement = createWordElement(word);
            sentenceContainer.appendChild(wordElement);
        });

        // Add sentence container to the DOM
        silaContainer.appendChild(sentenceContainer);

        // Show timer and check button
        timerDiv.style.display = 'block';
        checkButton.style.display = 'block';

        // Start timer
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkSentence();
            } else {
                timerElement.textContent = --timeLeft;
            }
        }, 1000);
    }

    // Check sentence function
    function checkSentence() {
        const userSentence = Array.from(sentenceContainer.children).map(wordElement => wordElement.textContent).join(' ');
        if (userSentence === correctSentence) {
            resultElement.textContent = "Jawaban Benar!";
            resultElement.style.color = "green";

        } else {
            resultElement.textContent = "Jawaban Salah!";
            resultElement.style.color = "red";
        }
    }

    // Add event listener to check button
    checkButton.addEventListener('click', checkSentence);

    // Add event listeners to level buttons
    levelButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const level = e.target.getAttribute('data-level');
            loadLevel(level);
        });
    });
});

//replaying
function replay(){
    location.reload()
}