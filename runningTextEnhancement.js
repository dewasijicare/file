(function() {
    // CSS untuk styling announcement baru (Sama seperti sebelumnya)
    const announcementStyles = `
        #announcement.gavan-themed-announcement {
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important; /* Gradient background */
            border: 1px solid #00aaff !important; /* Border biru neon */
            border-radius: 8px !important; /* Sudut membulat */
            box-shadow: 0 0 15px rgba(0, 170, 255, 0.5) !important; /* Glow effect */
            color: #ecf0f1 !important; /* Warna teks putih keabu-abuan */
            padding: 10px 15px !important; /* Padding internal */
            margin-top: 1rem !important; /* Jarak dari panel status */
            margin-bottom: 1rem !important; /* Jarak ke konten bawahnya */
            display: flex;
            align-items: center;
            overflow: hidden; /* Pastikan marquee tidak keluar */

            /* === BARIS UNTUK JARAK KANAN-KIRI === */
            /* Sesuaikan nilai '1rem' jika perlu agar pas */
            margin-left: 1rem !important;
            margin-right: 1rem !important;
            /* ==================================== */
        }

        #announcement.gavan-themed-announcement i.fa-solid.fa-bullhorn {
            color: #00eaff !important; /* Warna ikon biru neon */
            text-shadow: 0 0 8px #00eaff; /* Glow ikon */
            margin-right: 12px; /* Jarak ikon ke teks */
            font-size: 1.2em; /* Sedikit perbesar ikon */
            animation: pulse-glow 2s infinite ease-in-out; /* Animasi pulse */
            flex-shrink: 0; /* Pastikan ikon tidak mengecil */
        }

        #announcement.gavan-themed-announcement marquee {
            flex-grow: 1; /* Biarkan marquee mengisi sisa ruang */
            color: #ecf0f1 !important; /* Pastikan warna teks marquee */
            min-width: 0; /* Penting agar flexbox bekerja benar dengan marquee */
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
        // === PERUBAHAN TARGET ANCHOR ===
        const memberPanel = document.getElementById('member-status-panel'); // Target panel status member
        // ================================

        // Jika salah satu tidak ada, atau sudah dipindahkan, hentikan
        if (!announcement || !memberPanel || announcement.dataset.moved === 'true') {
            return;
        }

        // === PERUBAHAN CARA MENCARI CONTAINER ===
        // Panel status member sepertinya sudah di dalam container, kita insert setelah panel itu sendiri
        const targetContainer = memberPanel.parentElement; // Langsung ambil parent dari panel
        if (!targetContainer) return;
        // ======================================

        // === PERUBAHAN POSISI INSERT ===
        // Pindahkan elemen announcement ke setelah panel status member
        memberPanel.insertAdjacentElement('afterend', announcement);
        // ================================

        // Hapus class asli dan tambahkan class baru untuk styling
        announcement.classList.remove('bg-primary', 'p-1', 'my-3');
        announcement.classList.add('gavan-themed-announcement');

        // Tandai bahwa elemen sudah dipindahkan
        announcement.dataset.moved = 'true';

        console.log("Member page announcement moved and styled.");
    }

    // Fungsi untuk inject CSS ke head (Sama seperti sebelumnya)
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

    // Jalankan saat DOM siap (Sama seperti sebelumnya)
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        moveAndStyleAnnouncement();

        // Gunakan MutationObserver untuk menangani jika elemen dimuat dinamis
        const observer = new MutationObserver((mutations) => {
            // Cukup jalankan sekali jika target muncul
            // === PERUBAHAN CEK TARGET ===
            if (document.getElementById('announcement') && document.getElementById('member-status-panel')) {
            // =============================
                moveAndStyleAnnouncement();
                // Optional: Hentikan observer jika sudah selesai
                // observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Panggil lagi untuk kasus elemen sudah ada tapi belum diproses
        moveAndStyleAnnouncement();
    });

    // Panggil langsung jika skrip di-inject setelah DOM load (Sama seperti sebelumnya)
    if (document.readyState === 'complete') {
         injectStyles();
         moveAndStyleAnnouncement();
    }

})();
