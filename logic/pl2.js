const items = document.querySelectorAll('.item');
const descriptions = document.querySelectorAll('.description');
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

document.getElementById('check-match').addEventListener('click', () => {
    let correct = true;
    descriptions.forEach(description => {
        const sila = description.getAttribute('data-sila');
        const item = description.querySelector('.item');
        if (!item || item.getAttribute('data-sila') !== sila) {
            correct = false;
        }
    });

    const result = document.getElementById('result');
    if (correct) {
        result.textContent = "Selamat! Semua pasangan cocok.";
        result.style.color = "green";
        //winning
        konfirmasi = confirm("SELAMAT ANDA MENANG.\napakah anda ingin melanjutkan ke level selanjutnya ?")
        if(konfirmasi === true){
            window.location.href= "levela3.html"
        }
    } else {
        result.textContent = "Maaf, ada pasangan yang tidak cocok. Coba lagi.";
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
