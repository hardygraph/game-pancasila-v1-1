document.addEventListener('DOMContentLoaded', () => {
    const silas = [
        { text: "Ketuhanan yang Maha Esa", words: ["Ketuhanan", "yang", "Maha", "Esa", "Kehutanan", "Satu"] },
        { text: "Kemanusiaan yang Adil dan Beradab", words: ["Kemanusiaan", "yang", "Adil", "dan", "Beradab", "Kemanisan", "Kuat"] },
        { text: "Persatuan Indonesia", words: ["Persatuan", "Indonesia", "Persaudaraan", "Raya"] },
        { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan Perwakilan", words: ["Kerakyatan", "yang", "Dipimpin", "oleh", "Hikmat", "Kebijaksanaan", "dalam", "Permusyawaratan", "Perwakilan", "Perwalian", "Permusyawarahan"] },
        { text: "Keadilan Sosial bagi seluruh Rakyat Indonesia", words: ["Keadilan", "Sosial", "bagi", "seluruh", "Rakyat", "Indonesia", "Kekuatan", "Masyarakat"] }
    ];

    const incorrectWords = [
        ["Kehutanan", "Satu"], // Sila 1
        ["Kemanisan", "Kuat"], // Sila 2
        ["Persaudaraan", "Raya"], // Sila 3
        ["Perwalian", "Permusyawarahan"], // Sila 4
        ["Kekuatan", "Masyarakat"] // Sila 5
    ];

    const silaContainer = document.getElementById('sila-container');
    const result = document.getElementById('result');
    const timerElement = document.getElementById('time');
    const checkButton = document.getElementById('check-sentence');
    let timeRemaining = 60;
    let timer;

    silas.forEach((sila, index) => {
        const sentenceContainer = document.createElement('div');
        sentenceContainer.className = 'sentence-container';

        const questionLabel = document.createElement('div');
        questionLabel.className = 'sentence-label';
        questionLabel.textContent = `Sila ke-${index + 1}`;

        const shuffledSentence = document.createElement('div');
        shuffledSentence.className = 'sentence droppable';
        shuffledSentence.id = `shuffled-sentence-${index}`;

        const correctSentence = document.createElement('div');
        correctSentence.className = 'sentence droppable';
        correctSentence.id = `correct-sentence-${index}`;

        const shuffledWords = shuffle([...sila.words]);
        shuffledWords.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = word;
            wordElement.draggable = true;
            wordElement.addEventListener('dragstart', dragStart);
            shuffledSentence.appendChild(wordElement);
        });

        sentenceContainer.appendChild(questionLabel);
        sentenceContainer.appendChild(shuffledSentence);
        sentenceContainer.appendChild(correctSentence);
        silaContainer.appendChild(sentenceContainer);

        shuffledSentence.addEventListener('dragover', dragOver);
        shuffledSentence.addEventListener('drop', drop);
        correctSentence.addEventListener('dragover', dragOver);
        correctSentence.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const droppedWord = e.dataTransfer.getData('text/plain');
        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        wordElement.textContent = droppedWord;
        wordElement.draggable = true;
        wordElement.addEventListener('dragstart', dragStart);
        e.target.appendChild(wordElement);

        // Remove the word from the previous container
        const previousContainer = document.querySelector(`.sentence .word[style='display: none;'][data-text='${droppedWord}']`);
        if (previousContainer) {
            previousContainer.style.display = 'block';
            previousContainer.removeAttribute('data-text');
        }

        // Mark this element to avoid confusion with other words
        wordElement.setAttribute('data-text', droppedWord);
    }

    checkButton.addEventListener('click', checkSentences);

    function checkSentences() {
        let allCorrect = true;
        silas.forEach((sila, index) => {
            const correctOrder = sila.words.filter(word => !incorrectWords[index].includes(word));
            const currentOrder = Array.from(document.getElementById(`correct-sentence-${index}`).children)
                .map(wordElement => wordElement.textContent);
            if (correctOrder.join(' ') !== currentOrder.join(' ')) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            result.textContent = "Jawaban Benar!";
            result.style.color = "green";

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin bermain di Permainan berikutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasila-match1.html"
            }
        } else {
            result.textContent = "Jawaban Salah!";
            result.style.color = "red";

            //losing
            konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
            if(konfirmasi === true){
                replay()
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Timer functionality
    function startTimer() {
        timer = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timer);
                checkSentences();
            } else {
                timerElement.textContent = --timeRemaining;
            }
        }, 1000);
    }

    startTimer();
});

//replaying
function replay(){
    location.reload()
}
