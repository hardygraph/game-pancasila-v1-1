document.addEventListener('DOMContentLoaded', () => {
    const imagesContainer = document.getElementById('images-container');
    const descriptionsContainer = document.getElementById('descriptions-container');
    const result = document.getElementById('result');
    const checkButton = document.getElementById('check-match');
    const timerElement = document.getElementById('time');
    let timeRemaining = 60;
    let timer;

    const images = [
        { src: "./logic/sila1.png", sila: 1 },
        { src: "./logic/sila2.png", sila: 2 },
        { src: "./logic/sila3.png", sila: 3 },
        { src: "./logic/sila4.png", sila: 4 },
        { src: "./logic/sila5.png", sila: 5 },
        { src: "./logic/silasalah1.png", sila: 'wrong1' },
        { src: "./logic/silasalah2.jpg", sila: 'wrong2' }
    ];

    const descriptions = [
        { text: "Ketuhanan yang Maha Esa", sila: 1 },
        { text: "Kemanusiaan yang Adil dan Beradab", sila: 2 },
        { text: "Persatuan Indonesia", sila: 3 },
        { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan", sila: 4 },
        { text: "Keadilan Sosial bagi seluruh Rakyat Indonesia", sila: 5 },
        { text: "Kemanusiaan yang Adil dan Berakhlaq", sila: 'wrong3' },
        { text: "Keadilan Sosial bagi seluruh Masyarakat Indonesia", sila: 'wrong4' }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledImages = shuffle(images);
    shuffledImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = `Sila ${image.sila}`;
        imgElement.className = 'draggable-image';
        imgElement.draggable = true;
        imgElement.dataset.sila = image.sila;
        imagesContainer.appendChild(imgElement);
    });

    const shuffledDescriptions = shuffle(descriptions);
    shuffledDescriptions.forEach(desc => {
        const droppable = document.createElement('div');
        droppable.className = 'droppable';
        droppable.textContent = desc.text;
        droppable.dataset.sila = desc.sila;
        descriptionsContainer.appendChild(droppable);
    });

    const imagesElements = document.querySelectorAll('.draggable-image');
    const droppables = document.querySelectorAll('.droppable');

    imagesElements.forEach(image => {
        image.addEventListener('dragstart', dragStart);
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
            e.target.textContent = `Sila ${silaNumber}`;
            e.target.dataset.matched = silaNumber;
        }
    }

    checkButton.addEventListener('click', checkMatch);

    function checkMatch() {
        let correctMatches = 0;
        droppables.forEach(droppable => {
            if (droppable.dataset.sila !== 'wrong3' && droppable.dataset.sila !== 'wrong4' && droppable.dataset.sila !== 'wrong1' && droppable.dataset.sila !== 'wrong2') {
                if (droppable.dataset.sila === droppable.dataset.matched) {
                    correctMatches++;
                }
            }
        });

        if (correctMatches === 5) {
            result.textContent = "Semua jawaban benar!";
            result.style.color = "green";

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasila-match5.html"
            }
            clearInterval(timer);
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