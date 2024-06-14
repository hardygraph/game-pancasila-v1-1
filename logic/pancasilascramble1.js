document.addEventListener('DOMContentLoaded', () => {
    const silas = [
        {text: "Ketuhanan yang Maha Esa", words: ["Ketuhanan", "yang", "Maha", "Esa"]},
        {text: "Kemanusiaan yang Adil dan Beradab", words: ["Kemanusiaan", "yang", "Adil", "dan", "Beradab"]},
        {text: "Persatuan Indonesia", words: ["Persatuan", "Indonesia"]},
        {text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan Perwakilan", words: ["Kerakyatan", "yang", "Dipimpin", "oleh", "Hikmat", "Kebijaksanaan", "dalam", "Permusyawaratan", "Perwakilan"]},
        {text: "Keadilan Sosial bagi seluruh Rakyat Indonesia", words: ["Keadilan", "Sosial", "bagi", "seluruh", "Rakyat", "Indonesia"]}
    ];

    const silaContainer = document.getElementById('sila-container');
    const result = document.getElementById('result');
    
    silas.forEach((sila, index) => {
        const sentenceContainer = document.createElement('div');
        sentenceContainer.className = 'sentence-container';

        const questionLabel = document.createElement('div');
        questionLabel.className = 'sentence-label';
        questionLabel.textContent = `Sila ke-${index + 1}`;
        
        const answerLabel = document.createElement('div');
        answerLabel.className = 'sentence-label';
        answerLabel.textContent = "Jawaban";
        
        const shuffledSentence = document.createElement('div');
        shuffledSentence.className = 'sentence droppable';
        shuffledSentence.id = `shuffled-sentence-${index}`;
        
        const correctSentence = document.createElement('div');
        correctSentence.className = 'sentence droppable';
        correctSentence.id = `correct-sentence-${index}`;
        
        const shuffledWords = shuffle([...sila.words]);
        shuffledWords.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = word;
            wordElement.draggable = true;
            wordElement.addEventListener('dragstart', dragStart);
            shuffledSentence.appendChild(wordElement);
        });

        sentenceContainer.appendChild(questionLabel);
        sentenceContainer.appendChild(shuffledSentence);
        sentenceContainer.appendChild(answerLabel);
        sentenceContainer.appendChild(correctSentence);
        silaContainer.appendChild(sentenceContainer);

        shuffledSentence.addEventListener('dragover', dragOver);
        shuffledSentence.addEventListener('drop', drop);
        correctSentence.addEventListener('dragover', dragOver);
        correctSentence.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const droppedWord = e.dataTransfer.getData('text/plain');
        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        wordElement.textContent = droppedWord;
        wordElement.draggable = true;
        wordElement.addEventListener('dragstart', dragStart);
        e.target.appendChild(wordElement);

        // Remove the word from the previous container
        const previousContainer = document.querySelector(`.sentence .word[style='display: none;'][data-text='${droppedWord}']`);
        if (previousContainer) {
            previousContainer.style.display = 'block';
            previousContainer.removeAttribute('data-text');
        }

        // Mark this element to avoid confusion with other words
        wordElement.setAttribute('data-text', droppedWord);
    }

    document.getElementById('check-sentence').addEventListener('click', () => {
        let allCorrect = true;
        silas.forEach((sila, index) => {
            const correctOrder = sila.words;
            const currentOrder = Array.from(document.getElementById(`correct-sentence-${index}`).children).map(word => word.textContent);
            if (!arraysEqual(correctOrder, currentOrder)) {
                allCorrect = false;
            }
        });
        if (allCorrect) {
            result.textContent = "Selamat! Anda berhasil menyusun semua kalimat dengan benar.";
            result.style.color = "green";

             //winning
             konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
             if(konfirmasi === true){
                 window.location.href= "pancasilascramble2.html"
             }
        } else {
            result.textContent = "Maaf, susunan kalimat Anda belum benar. Coba lagi.";
            result.style.color = "red";

            //losing
            konfirmasi = confirm("OOPS ANDA KALAH.\napakah anda ingin bermain kembali ?")
            if(konfirmasi === true){
                replay()
            }
        }
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
});

//replaying
function replay(){
    location.reload()
}