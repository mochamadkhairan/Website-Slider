let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = slider.querySelector('.thumbnail');

// Fungsi Gerak Slider
function moveSlider(type) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = thumbnail.querySelectorAll('.item');
    
    if(type === 'next'){
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    // Reset Class Animasi
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        slider.classList.remove('next');
        slider.classList.remove('prev');
    }, 500); 
}

nextBtn.onclick = () => moveSlider('next');
prevBtn.onclick = () => moveSlider('prev');

let runTimeOut;

// --- FITUR LEARN MORE ---
// Buat elemen modal secara dinamis
const modalMarkup = `
    <div id="heroModal" class="modal">
        <div class="modal-content">
            <h2 id="modalTitle"></h2>
            <p id="modalDesc"></p>
            <span class="close-modal">Close</span>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalMarkup);

const modal = document.getElementById('heroModal');
const closeModal = document.querySelector('.close-modal');

// Handle klik 'Learn More'
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more')) {
        e.preventDefault();
        // Ambil info dari item yang sedang aktif (item pertama di .list)
        const currentItem = document.querySelector('.slider .list .item:nth-child(1)');
        const heroName = currentItem.querySelector('.name').innerText;
        const heroDesc = currentItem.querySelector('.desc p').innerText;

        document.getElementById('modalTitle').innerText = heroName;
        document.getElementById('modalDesc').innerText = "Detail Info: " + heroDesc;
        
        modal.style.display = 'flex';
    }
});

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };