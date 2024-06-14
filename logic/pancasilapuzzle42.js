document.addEventListener('DOMContentLoaded', () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleContainer = document.querySelector('.puzzle-grid');
    const result = document.getElementById('result');
    const timeDisplay = document.getElementById('time');
    let timeLeft = 90;
    let timer;

    // Shuffle pieces and assign them a background position
    const shuffledIndices = shuffle([...Array(puzzlePieces.length).keys()]);
    puzzlePieces.forEach((piece, index) => {
        piece.style.backgroundPosition = getBackgroundPosition(shuffledIndices[index]);
        piece.setAttribute('data-order', shuffledIndices[index]);
        piece.draggable = true;
        piece.addEventListener('mousedown', showPiece);
        piece.addEventListener('mouseup', hidePiece);
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);
        piece.addEventListener('dragend', hidePiece);
    });

    function showPiece(e) {
        e.target.classList.add('show');
    }

    function hidePiece(e) {
        if (e.target.getAttribute('data-index') !== e.target.getAttribute('data-order')) {
            e.target.classList.remove('show');
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.order);
        e.target.classList.add('show');
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

            if (draggedElement.getAttribute('data-index') === draggedElement.getAttribute('data-order')) {
                draggedElement.classList.remove('hidden');
                draggedElement.classList.add('show');
            } else {
                draggedElement.classList.add('hidden');
                draggedElement.classList.remove('show');
            }
        }

        if (targetElement.getAttribute('data-index') === targetElement.getAttribute('data-order')) {
            targetElement.classList.remove('hidden');
            targetElement.classList.add('show');
        } else {
            targetElement.classList.add('hidden');
            targetElement.classList.remove('show');
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
                checkPuzzle(false);
            }
        }, 1000);
    }

    function checkPuzzle(isTimeCheck = true) {
        const correctOrder = [...Array(puzzlePieces.length).keys()].map(i => i.toString());
        const currentOrder = [...puzzlePieces].map(p => p.getAttribute('data-order'));
        if (correctOrder.every((val, index) => val === currentOrder[index])) {
            clearInterval(timer);
            result.textContent = "Selamat! Puzzle berhasil disusun dengan benar.";
            result.style.color = "green";

             //winning
             konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
             if(konfirmasi === true){
                 window.location.href= "pancasilapuzzle43.html"
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
});

//replaying
function replay(){
    location.reload()
}
