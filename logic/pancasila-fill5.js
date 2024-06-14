document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-answers');
    const result = document.getElementById('result');
    const timerElement = document.getElementById('time');
    let timeRemaining = 180;
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
            sila1: ['ketuhanan', 'yang', 'maha', 'esa'],
            sila2: ['kemanusiaan', 'yang', 'adil', 'dan', 'beradab'],
            sila3: ['persatuan', 'indonesia'],
            sila4: ['kerakyatan', 'yang', 'dipimpin', 'oleh', 'hikmat', 'kebijaksanaan', 'dalam', 'permusyawaratan', 'perwakilan'],
            sila5: ['keadilan', 'sosial', 'bagi', 'seluruh', 'rakyat', 'indonesia']
        };

        const userAnswers = {
            sila1: [document.getElementById('sila1-1').value.trim().toLowerCase(), document.getElementById('sila1-2').value.trim().toLowerCase(), document.getElementById('sila1-3').value.trim().toLowerCase(), document.getElementById('sila1-4').value.trim().toLowerCase()],
            sila2: [document.getElementById('sila2-1').value.trim().toLowerCase(), document.getElementById('sila2-2').value.trim().toLowerCase(), document.getElementById('sila2-3').value.trim().toLowerCase(), document.getElementById('sila2-4').value.trim().toLowerCase(), document.getElementById('sila2-5').value.trim().toLowerCase()],
            sila3: [document.getElementById('sila3-1').value.trim().toLowerCase(), document.getElementById('sila3-2').value.trim().toLowerCase()],
            sila4: [document.getElementById('sila4-1').value.trim().toLowerCase(), document.getElementById('sila4-2').value.trim().toLowerCase(), document.getElementById('sila4-3').value.trim().toLowerCase(), document.getElementById('sila4-4').value.trim().toLowerCase(), document.getElementById('sila4-5').value.trim().toLowerCase(), document.getElementById('sila4-6').value.trim().toLowerCase(), document.getElementById('sila4-7').value.trim().toLowerCase(), document.getElementById('sila4-8').value.trim().toLowerCase(), document.getElementById('sila4-9').value.trim().toLowerCase()],
            sila5: [document.getElementById('sila5-1').value.trim().toLowerCase(), document.getElementById('sila5-2').value.trim().toLowerCase(), document.getElementById('sila5-3').value.trim().toLowerCase(), document.getElementById('sila5-4').value.trim().toLowerCase(), document.getElementById('sila5-5').value.trim().toLowerCase(), document.getElementById('sila5-6').value.trim().toLowerCase()]
        };

        let correct = true;
        for (let key in answers) {
            for (let i = 0; i < answers[key].length; i++) {
                if (answers[key][i] !== userAnswers[key][i]) {
                    correct = false;
                    break;
                }
            }
            if (!correct) break;
        }

        if (correct) {
            result.textContent = "Semua jawaban benar!";
            result.style.color = "green";

            //winning
            konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin mengulangi seluruh permainan dari Game 1 level 1 ?")
            if(konfirmasi === true){
                window.location.href= "levela1.html"
            }
            else {
                tanya = alert("apa anda ingin kembali halaman utama ?")
                window.location.href= "index.html"                          
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