const items = document.querySelectorAll('.item');
const descriptions = document.querySelectorAll('.description');
const blanks = document.querySelectorAll('.blank');
let draggingItem = null;

items.forEach(item => {
    item.addEventListener('dragstart', () => {
        draggingItem = item;
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggingItem = null;
    });
});

descriptions.forEach(description => {
    description.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    description.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggingItem) {
            description.appendChild(draggingItem);
        }
    });
});

document.getElementById('check-answers').addEventListener('click', () => {
    const correctMatches = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5"
    };

    const correctAnswers = {
        1: "1",
        2: "5"
    };

    const correctBlanks = {
        0: "5",
        1: "ketuhanan",
        2: "kemanusiaan",
        3: "persatuan",
        4: "kerakyatan",
        5: "keadilan"
    };

    let correct = true;

    descriptions.forEach(description => {
        const sila = description.getAttribute('data-sila');
        const item = description.querySelector('.item');
        if (!item || item.getAttribute('data-sila') !== sila) {
            correct = false;
        }
    });

    document.querySelectorAll('.question').forEach(question => {
        const questionId = question.getAttribute('data-question');
        const answer = question.querySelector('.answer').value;
        if (correctAnswers[questionId] !== answer) {
            correct = false;
        }
    });

    blanks.forEach((blank, index) => {
        if (blank.value !== correctBlanks[index]) {
            correct = false;
        }
    });

    const result = document.getElementById('result');
    if (correct) {
        result.textContent = "Selamat! Semua jawaban benar.";
        result.style.color = "green";

        //winning
        konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin bermain di Permainan berikutnya ?")
        if(konfirmasi === true){
            window.location.href= "pancasilapuzzle11.html"
        }
    } else {
        result.textContent = "Maaf, ada jawaban yang salah. Coba lagi.";
        result.style.color = "red";

         //losing
         konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
         if(konfirmasi === true){
             replay()
         }
    }
});

//replaying
function replay(){
    location.reload()
}

