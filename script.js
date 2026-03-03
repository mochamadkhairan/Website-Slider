let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = slider.querySelector('.thumbnail');

// --- LOGIKA SLIDER ---
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

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        slider.classList.remove('next');
        slider.classList.remove('prev');
    }, 500);

    // Reset autoplay setiap kali tombol diklik manual
    resetAutoplay();
}

nextBtn.onclick = () => moveSlider('next');
prevBtn.onclick = () => moveSlider('prev');

let runTimeOut;

// --- FITUR AUTOPLAY ---
let autoNext = setInterval(() => {
    moveSlider('next');
}, 7000); // Slider pindah setiap 7 detik

function resetAutoplay() {
    clearInterval(autoNext);
    autoNext = setInterval(() => {
        moveSlider('next');
    }, 7000);
}

// --- FITUR NAV & MODAL ---
const modalMarkup = `
    <div id="heroModal" class="modal">
        <div class="modal-content">
            <h2 id="modalTitle"></h2>
            <div id="modalBody"></div>
            <span class="close-modal">Close</span>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalMarkup);

const modal = document.getElementById('heroModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// Fungsi Membuka Modal
function openModal(title, content) {
    modalTitle.innerText = title;
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

// Event untuk Navbar
document.querySelectorAll('header nav a').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        
        if(target === '#home') {
            window.location.reload(); // Refresh ke posisi awal
        } else if(target === '#about') {
            openModal("About Project", "<p>This Mobile Legends Image Slider project is built using HTML, CSS, and Vanilla JavaScript to display favorite heroes with an interactive UI.</p>");
        } else if(target === '#contact') {
            openModal("Contact Me", "<p>Contact me via:<br>Email: moch.khairanathallah@gmail.com<br>Instagram: @m.khairan22</p>");
        }
    };
});

// Event untuk 'Learn More'
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more')) {
        e.preventDefault();
        const currentItem = document.querySelector('.slider .list .item:nth-child(1)');
        const heroName = currentItem.querySelector('.name').innerText;
        const heroDesc = currentItem.querySelector('.desc p').innerText;
        openModal(heroName, `<p>${heroDesc}</p>`);
    }
});

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };