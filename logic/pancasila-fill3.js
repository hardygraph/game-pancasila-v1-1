document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-answers');
    const result = document.getElementById('result');
    const timerElement = document.getElementById('time');
    let timeRemaining = 90;
    let timer;

    checkButton.addEventListener('click', checkAnswers);

    function startTimer() {
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                checkAnswers();
            }
        }, 1000);
    }

    function checkAnswers() {
        clearInterval(timer);
        const answers = {
            sila1: ['ketuhanan', 'esa'],
            sila2: ['kemanusiaan', 'beradab'],
            sila3: ['persatuan', 'indonesia'],
            sila4: ['kerakyatan', 'permusyawaratan'],
            sila5: ['keadilan', 'rakyat']
        };

        const userAnswers = {
            sila1: [document.getElementById('sila1-1').value.trim().toLowerCase(), document.getElementById('sila1-2').value.trim().toLowerCase()],
            sila2: [document.getElementById('sila2-1').value.trim().toLowerCase(), document.getElementById('sila2-2').value.trim().toLowerCase()],
            sila3: [document.getElementById('sila3-1').value.trim().toLowerCase(), document.getElementById('sila3-2').value.trim().toLowerCase()],
            sila4: [document.getElementById('sila4-1').value.trim().toLowerCase(), document.getElementById('sila4-2').value.trim().toLowerCase()],
            sila5: [document.getElementById('sila5-1').value.trim().toLowerCase(), document.getElementById('sila5-2').value.trim().toLowerCase()]
        };

        let correct = true;
        for (let key in answers) {
            if (answers[key][0] !== userAnswers[key][0] || answers[key][1] !== userAnswers[key][1]) {
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
                window.location.href= "pancasila-fill4.html"
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

    startTimer();
});

//replaying
function replay(){
    location.reload()
}
