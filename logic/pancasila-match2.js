document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.draggable-image');
    const droppables = document.querySelectorAll('.droppable');
    const result = document.getElementById('result');
    const checkButton = document.getElementById('check-match');
    const timerElement = document.getElementById('time');
    let timeRemaining = 60;
    let timer;

    images.forEach(image => {
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
        let allCorrect = true;
        droppables.forEach(droppable => {
            if (droppable.dataset.sila !== droppable.dataset.matched) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            result.textContent = "Semua jawaban benar!";
            result.style.color = "green";
            clearInterval(timer);

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasila-match3.html"
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
