document.addEventListener('DOMContentLoaded', () => {
    const wordsContainer = document.getElementById('words-container');
    const principlesContainer = document.getElementById('principles-container');
    const result = document.getElementById('result');
    const checkButton = document.getElementById('check-match');
    const timerElement = document.getElementById('time');
    let timeRemaining = 60;
    let timer;

    const words = [
        { text: "bintang", sila: 1 },
        { text: "rantai", sila: 2 },
        { text: "pohon beringin", sila: 3 },
        { text: "banteng", sila: 4 },
        { text: "padi-kapas", sila: 5 }
    ];

    const principles = [
        { text: "Ketuhanan yang Maha Esa", sila: 1 },
        { text: "Kemanusiaan yang Adil dan Beradab", sila: 2 },
        { text: "Persatuan Indonesia", sila: 3 },
        { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan", sila: 4 },
        { text: "Keadilan Sosial bagi seluruh Rakyat Indonesia", sila: 5 }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledWords = shuffle(words);
    shuffledWords.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word.text;
        wordElement.className = 'draggable-word';
        wordElement.draggable = true;
        wordElement.dataset.sila = word.sila;
        wordsContainer.appendChild(wordElement);
    });

    const shuffledPrinciples = shuffle(principles);
    shuffledPrinciples.forEach(principle => {
        const droppable = document.createElement('div');
        droppable.textContent = principle.text;
        droppable.className = 'droppable';
        droppable.dataset.sila = principle.sila;
        principlesContainer.appendChild(droppable);
    });

    const wordsElements = document.querySelectorAll('.draggable-word');
    const droppables = document.querySelectorAll('.droppable');

    wordsElements.forEach(word => {
        word.addEventListener('dragstart', dragStart);
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.sila);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const silaNumber = e.dataTransfer.getData('text/plain');
        if (e.target.classList.contains('droppable')) {
            e.target.textContent = shuffledWords.find(word => word.sila === parseInt(silaNumber)).text;
            e.target.dataset.matched = silaNumber;
        }
    }

    checkButton.addEventListener('click', checkMatch);

    function checkMatch() {
        let correctMatches = 0;
        droppables.forEach(droppable => {
            if (droppable.dataset.sila === droppable.dataset.matched) {
                correctMatches++;
            }
        });

        if (correctMatches === 5) {
            result.textContent = "Semua jawaban benar!";
            result.style.color = "green";
            clearInterval(timer);

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin bermain di Permainan berikutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasila-fill1.html"
            }
        } else {
            result.textContent = "Beberapa jawaban salah, coba lagi.";
            result.style.color = "red";

            //losing
            konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
            if(konfirmasi === true){
                replay()
            }
        }
    }

    // Timer functionality
    function startTimer() {
        timer = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timer);
                checkMatch();
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