// [PERBAIKAN V6] Menggunakan pola IIFE dan 100% Vanilla JS (Tanpa jQuery)
(function() {
    
    // [PENTING] Kita menunggu DOM siap (seperti skrip tema utama Anda)
    document.addEventListener('DOMContentLoaded', function() {

        // --- Pengaturan ---
        const apkDownloadLink = "https://fffiiillleee.com/apk/gabantoto.apk"; 
        const appIconUrl = "https://raw.githubusercontent.com/dewasijicare/images/main/appicon_128x128.png";
        const appName = "GABANTOTO";
        const appDescription = "Unduh aplikasi resmi kami.";
        // --- Selesai Pengaturan ---

        // 1. Cek jika sudah pernah ditutup di sesi ini
        if (sessionStorage.getItem('gavanDownloadBarClosed') === 'true') {
            return; 
        }
        // 2. Cek jika bukan mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isMobile) {
            return; // Hanya tampilkan di mobile
        }

        // --- BLOK CSS (GAVAN THEME - TOP BAR) ---
        const gavanDownloadStyles = `
            #gavan-download-bar {
                background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
                border-bottom: 1px solid #00aaff !important; 
                box-shadow: 0 5px 20px rgba(0, 170, 255, 0.5) !important; 
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px; 
                font-family: 'Exo 2', sans-serif !important;
                box-sizing: border-box;
            }

            #gavan-download-bar * {
                box-sizing: border-box;
            }

            #gavan-download-bar-close {
                font-size: 1.8rem; color: #bdc3c7; background: none; border: none;
                padding: 0 10px; margin-right: 5px; cursor: pointer; line-height: 1;
                transition: all 0.3s ease; flex-shrink: 0;
            }
            #gavan-download-bar-close:hover { color: #e74c3c; transform: scale(1.1); }

            #gavan-download-bar-icon {
                flex-shrink: 0; width: 45px; height: 45px;
                margin-left: 5px; border-radius: 8px;
            }

            #gavan-download-bar-text {
                flex-grow: 1; color: #ecf0f1; padding: 0 12px; font-size: 0.9rem;
                line-height: 1.3; text-shadow: 0 0 5px #00aaff;
                overflow: hidden; white-space: nowrap;
            }
            #gavan-download-bar-text strong {
                color: #fff; display: block; font-size: 1rem; text-transform: uppercase;
                text-overflow: ellipsis; overflow: hidden;
            }
            #gavan-download-bar-text span { text-overflow: ellipsis; overflow: hidden; }

            #gavan-download-bar-button {
                flex-shrink: 0;
                background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                border: none !important; color: #fff !important; font-weight: 700;
                text-transform: uppercase;
                box-shadow: 0 0 10px #00eaff, inset 0 0 5px rgba(255, 255, 255, .4);
                transition: all .3s ease; border-radius: 5px;
                padding: 10px 15px; font-size: 0.9rem;
                text-decoration: none; text-align: center;
            }
            #gavan-download-bar-button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px #00eaff, 0 0 30px #0077ff, inset 0 0 5px rgba(255, 255, 255, .4);
            }
        `;

        // --- Injeksi CSS ke <head> (Metode Vanilla JS) ---
        const styleElement = document.createElement('style');
        styleElement.innerHTML = gavanDownloadStyles;
        document.head.appendChild(styleElement);

        // --- BLOK HTML (Dibungkus dalam satu div) ---
        const barHtml = `
            <div id="gavan-download-bar">
                <button id="gavan-download-bar-close" title="Tutup">&times;</button>
                <img id="gavan-download-bar-icon" src="${appIconUrl}" alt="Icon">
                <div id="gavan-download-bar-text">
                    <strong>${appName}</strong>
                    <span>${appDescription}</span>
                </div>
                <a href="${apkDownloadLink}" id="gavan-download-bar-button">Download</a>
            </div>
        `;
        
        // --- [PERBAIKAN UTAMA] Injeksi HTML dan Logika Margin (Metode Vanilla JS) ---
        const targetWrapper = document.getElementById('navbar-top-wrapper');
        const mainContent = document.getElementById('maincontent');
        
        if (targetWrapper && mainContent) {
            // 1. Tambahkan HTML-nya (Metode Vanilla JS, setara .prepend())
            targetWrapper.insertAdjacentHTML('afterbegin', barHtml);

            // 2. Dapatkan tinggi bar yang baru ditambahkan
            const barElement = document.getElementById('gavan-download-bar');
            if (barElement) {
                const barHeight = barElement.offsetHeight; // Dapatkan tinggi dinamisnya

                // 3. Terapkan margin-top ke konten utama
                if (barHeight > 0) {
                    mainContent.style.marginTop = barHeight + 'px';
                }
            }

        } else {
            console.warn('Gavan APK: Target #navbar-top-wrapper atau #maincontent tidak ditemukan!');
        }

        // --- Logika Tombol Close (Metode Vanilla JS - Event Delegation) ---
        document.body.addEventListener('click', function(event) {
            // Cek apakah yang diklik adalah tombol close (atau elemen di dalamnya)
            const closeButton = event.target.closest('#gavan-download-bar-close');
            
            if (closeButton) {
                const barElement = closeButton.closest('#gavan-download-bar');
                
                // Hapus bar
                if (barElement) {
                    barElement.remove();
                }
                
                // [PENTING] Kembalikan margin-top ke 0
                if (mainContent) {
                    mainContent.style.marginTop = ''; // Menghapus style inline
                }
                
                sessionStorage.setItem('gavanDownloadBarClosed', 'true');
            }
        });

    }); // Akhir dari 'DOMContentLoaded'

})(); // Akhir dari IIFE
