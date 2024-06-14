document.addEventListener('DOMContentLoaded', () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleGrid = document.getElementById('puzzle-grid');
    const result = document.getElementById('result');
    const timeDisplay = document.getElementById('time');
    let timeLeft = 90;
    let rotation = 0;
    let timer;
    let rotationTimer;

    // Shuffle pieces and assign them a background position
    const shuffledIndices = shuffle([...Array(puzzlePieces.length).keys()]);
    puzzlePieces.forEach((piece, index) => {
        piece.style.backgroundPosition = getBackgroundPosition(shuffledIndices[index]);
        piece.setAttribute('data-order', shuffledIndices[index]);
        piece.draggable = true;
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.order);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const draggedOrder = e.dataTransfer.getData('text/plain');
        const targetOrder = e.target.dataset.order;

        const draggedElement = document.querySelector(`.puzzle-piece[data-order='${draggedOrder}']`);
        const targetElement = document.querySelector(`.puzzle-piece[data-order='${targetOrder}']`);

        if (draggedElement !== targetElement) {
            swapBackgroundPosition(draggedElement, targetElement);
            swapDataOrder(draggedElement, targetElement);
        }
    }

    function swapBackgroundPosition(element1, element2) {
        const tempBg = element1.style.backgroundPosition;
        element1.style.backgroundPosition = element2.style.backgroundPosition;
        element2.style.backgroundPosition = tempBg;
    }

    function swapDataOrder(element1, element2) {
        const tempOrder = element1.dataset.order;
        element1.dataset.order = element2.dataset.order;
        element2.dataset.order = tempOrder;
    }

    function getBackgroundPosition(index) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return `-${col * 75}px -${row * 75}px`;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                clearInterval(rotationTimer);
                checkPuzzle(false);
            }
        }, 1000);
    }

    function startRotation() {
        rotationTimer = setInterval(() => {
            rotation += 90;
            puzzleGrid.style.transition = "transform 1s ease-in-out";
            puzzleGrid.style.transform = `rotate(${rotation}deg)`;
        }, 5000);
    }

    function checkPuzzle(isTimeCheck = true) {
        const correctOrder = [...Array(puzzlePieces.length).keys()].map(i => i.toString());
        const currentOrder = [...puzzlePieces].map(p => p.getAttribute('data-order'));
        if (correctOrder.every((val, index) => val === currentOrder[index])) {
            clearInterval(timer);
            clearInterval(rotationTimer);
            puzzleGrid.style.transform = `rotate(0deg)`;
            result.textContent = "Selamat! Puzzle berhasil disusun dengan benar.";
            result.style.color = "green";

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasilapuzzle52.html"
            }
        } else if (isTimeCheck) {
            result.textContent = "Maaf, puzzle belum benar. Coba lagi.";
            result.style.color = "red";

            //losing
            konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
            if(konfirmasi === true){
                replay()
            }
        } else {
            result.textContent = "Waktu habis! Anda kalah.";
            result.style.color = "red";

            //losing
            konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
            if(konfirmasi === true){
                replay()
            }
        }
    }

    document.getElementById('check-puzzle').addEventListener('click', () => {
        checkPuzzle();
    });

    startTimer();
    startRotation();
});

//replaying
function replay(){
    location.reload()
}
