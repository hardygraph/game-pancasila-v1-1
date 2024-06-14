document.getElementById('check-answers').addEventListener('click', () => {
    const correctAnswers = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5"
    };

    let correct = true;
    document.querySelectorAll('.question').forEach(question => {
        const sila = question.getAttribute('data-sila');
        const answer = question.querySelector('.answer').value;
        if (correctAnswers[sila] !== answer) {
            correct = false;
        }
    });

    const result = document.getElementById('result');
    if (correct) {
        result.textContent = "Selamat! Semua jawaban benar.";
        result.style.color = "green";

        //winning
        konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
        if(konfirmasi === true){
            window.location.href= "levela4.html"
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
