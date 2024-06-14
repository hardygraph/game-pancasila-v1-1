document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-answers');
    const result = document.getElementById('result');

    checkButton.addEventListener('click', checkAnswers);

    function checkAnswers() {
        const answers = {
            sila1: 'maha',
            sila2: 'adil',
            sila3: 'indonesia',
            sila4: 'hikmat',
            sila5: 'sosial'
        };

        const userAnswers = {
            sila1: document.getElementById('sila1').value.trim().toLowerCase(),
            sila2: document.getElementById('sila2').value.trim().toLowerCase(),
            sila3: document.getElementById('sila3').value.trim().toLowerCase(),
            sila4: document.getElementById('sila4').value.trim().toLowerCase(),
            sila5: document.getElementById('sila5').value.trim().toLowerCase()
        };

        let correct = true;
        for (let key in answers) {
            if (answers[key] !== userAnswers[key]) {
                correct = false;
                break;
            }
        }

        if (correct) {
            result.textContent = "Semua jawaban benar!";
            result.style.color = "green";

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
            if(konfirmasi === true){
                window.location.href= "pancasila-fill2.html"
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
});

//replaying
function replay(){
    location.reload()
}