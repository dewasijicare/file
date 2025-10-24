(function() {
    // CSS untuk styling announcement baru
    const announcementStyles = `
        #announcement.gavan-themed-announcement {
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important; /* Gradient background */
            border: 1px solid #00aaff !important; /* Border biru neon */
            border-radius: 8px !important; /* Sudut membulat */
            box-shadow: 0 0 15px rgba(0, 170, 255, 0.5) !important; /* Glow effect */
            color: #ecf0f1 !important; /* Warna teks putih keabu-abuan */
            padding: 10px 15px !important; /* Padding lebih nyaman */
            margin-top: 1.5rem !important; /* Jarak dari slider */
            margin-bottom: 1rem !important; /* Jarak ke konten bawahnya */
            display: flex;
            align-items: center;
            overflow: hidden; /* Pastikan marquee tidak keluar */
        }

        #announcement.gavan-themed-announcement i.fa-solid.fa-bullhorn {
            color: #00eaff !important; /* Warna ikon biru neon */
            text-shadow: 0 0 8px #00eaff; /* Glow ikon */
            margin-right: 12px; /* Jarak ikon ke teks */
            font-size: 1.2em; /* Sedikit perbesar ikon */
            animation: pulse-glow 2s infinite ease-in-out; /* Animasi pulse */
        }

        #announcement.gavan-themed-announcement marquee {
            flex-grow: 1; /* Biarkan marquee mengisi sisa ruang */
            color: #ecf0f1 !important; /* Pastikan warna teks marquee */
        }

        /* Animasi pulse untuk ikon */
        @keyframes pulse-glow {
            0%, 100% {
                transform: scale(1);
                text-shadow: 0 0 8px #00eaff;
            }
            50% {
                transform: scale(1.1);
                text-shadow: 0 0 15px #00eaff, 0 0 25px #00eaff;
            }
        }
    `;

    // Fungsi untuk memindahkan dan men-style announcement
    function moveAndStyleAnnouncement() {
        const announcement = document.getElementById('announcement');
        const mainSlider = document.getElementById('main-slider'); // Target slider

        // Jika salah satu tidak ada, atau sudah dipindahkan, hentikan
        if (!announcement || !mainSlider || announcement.dataset.moved === 'true') {
            return;
        }

        // Cari parent dari slider untuk insert setelahnya
        const sliderContainer = mainSlider.parentElement;
        if (!sliderContainer) return;

        // Pindahkan elemen announcement ke setelah container slider
        sliderContainer.insertAdjacentElement('afterend', announcement);

        // Hapus class asli dan tambahkan class baru untuk styling
        announcement.classList.remove('bg-primary', 'p-1', 'my-3');
        announcement.classList.add('gavan-themed-announcement');

        // Tandai bahwa elemen sudah dipindahkan
        announcement.dataset.moved = 'true';

        console.log("Announcement moved and styled.");
    }

    // Fungsi untuk inject CSS ke head
    function injectStyles() {
        // Cek apakah style sudah di-inject
        if (document.getElementById('gavan-announcement-styles')) {
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'gavan-announcement-styles'; // Beri ID agar bisa dicek
        styleElement.innerHTML = announcementStyles;
        document.head.appendChild(styleElement);
        console.log("Announcement styles injected.");
    }

    // Jalankan saat DOM siap
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        moveAndStyleAnnouncement();

        // Gunakan MutationObserver untuk menangani jika elemen dimuat dinamis
        const observer = new MutationObserver((mutations) => {
            // Cukup jalankan sekali jika target muncul
            if (document.getElementById('announcement') && document.getElementById('main-slider')) {
                moveAndStyleAnnouncement();
                // Optional: Hentikan observer jika sudah selesai
                // observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Panggil lagi untuk kasus elemen sudah ada tapi belum diproses
        moveAndStyleAnnouncement();
    });

    // Panggil langsung jika skrip di-inject setelah DOM load
    if (document.readyState === 'complete') {
         injectStyles();
         moveAndStyleAnnouncement();
    }

})();