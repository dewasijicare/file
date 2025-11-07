// [PERBAIKAN V9] Tombol 'X' Merah + Animasi Ikon 'Spin Loop'
(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- Pengaturan ---
        const apkDownloadLink = "https://fffiiillleee.com/apk/gabantoto.apk"; 
        const appIconUrl = "https://raw.githubusercontent.com/dewasijicare/images/main/appicon_128x128.png";
        const appName = "APK GABANTOTO ANTI BLOKIR";
        const appDescription = "Unduh & install aplikasi official";
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

        // --- [PERUBAHAN V9] BLOK CSS ---
        const gavanDownloadStyles = `
            /* [BARU] Keyframe untuk animasi ikon */
            @keyframes gavan-icon-spin-loop {
                /* Diam selama 80% durasi */
                0%, 80% { transform: scale(1) rotate(0deg); }
                
                /* Berputar sesaat (kombinasi scale & rotate) */
                85% { transform: scale(1.1) rotate(10deg); }
                95% { transform: scale(1.1) rotate(-10deg); }
                
                /* Kembali normal */
                100% { transform: scale(1) rotate(0deg); }
            }
        
            #gavan-download-bar {
                background: linear-gradient(145deg, #2c3e50, #1a2f40) !important;
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

            /* [PERUBAHAN V9] Tombol close diubah jadi merah tema */
            #gavan-download-bar-close {
                font-size: 1.8rem; 
                color: #e74c3c !important; /* Warna merah tema */
                text-shadow: 0 0 5px rgba(231, 76, 60, 0.7); /* Glow merah */
                background: none; border: none;
                padding: 0 5px;
                margin-left: 10px; 
                cursor: pointer; line-height: 1;
                transition: all 0.3s ease; flex-shrink: 0;
            }
            /* Hover-nya diubah jadi merah muda (sesuai tema 'promo-clear-btn') */
            #gavan-download-bar-close:hover { 
                color: #f5b7b1 !important; /* Merah muda/terang */
                transform: scale(1.1); 
            }

            /* [PERUBAHAN V9] Terapkan animasi looping ke link ikon */
            #gavan-download-bar-icon-link {
                flex-shrink: 0;
                line-height: 0; 
                margin-left: 10px; 
                /* Terapkan animasi: 4 detik per loop */
                animation: gavan-icon-spin-loop 4s infinite ease-in-out;
            }
            /* Hover akan menghentikan animasi & hanya membesarkan ikon */
            #gavan-download-bar-icon-link:hover img {
                transform: scale(1.1); 
            }

            #gavan-download-bar-icon {
                flex-shrink: 0; width: 45px; height: 45px;
                border-radius: 8px;
                transition: transform 0.2s ease;
            }

            /* Teks kuning (Tidak berubah) */
            #gavan-download-bar-text {
                flex-grow: 1; 
                color: #FFD700 !important;
                padding: 0 12px; font-size: 0.9rem;
                line-height: 1.3; 
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.6) !important;
                overflow: hidden; white-space: nowrap;
            }
            #gavan-download-bar-text strong {
                color: #FFD700 !important; 
                display: block; font-size: 1rem; text-transform: uppercase;
                text-overflow: ellipsis; overflow: hidden;
            }
        `;

        // --- Injeksi CSS ke <head> ---
        const styleElement = document.createElement('style');
        styleElement.innerHTML = gavanDownloadStyles;
        document.head.appendChild(styleElement);

        // --- BLOK HTML (Sama seperti V8) ---
        const barHtml = `
            <div id="gavan-download-bar">
                <div id="gavan-download-bar-text">
                    <strong>${appName}</strong>
                    <span>${appDescription}</span>
                </div>
                <a id="gavan-download-bar-icon-link" href="${apkDownloadLink}">
                    <img id="gavan-download-bar-icon" src="${appIconUrl}" alt="Download">
                </a>
                <button id="gavan-download-bar-close" title="Tutup">&times;</button>
            </div>
        `;
        
        // --- Logika Injeksi (Sama seperti V8) ---
        const targetWrapper = document.getElementById('navbar-top-wrapper');
        
        if (targetWrapper) {
            targetWrapper.insertAdjacentHTML('afterbegin', barHtml);
        } else {
            console.warn('Gavan APK: Target #navbar-top-wrapper tidak ditemukan!');
        }

        // --- Logika Tombol Close (Sama seperti V8) ---
        document.body.addEventListener('click', function(event) {
            const closeButton = event.target.closest('#gavan-download-bar-close');
            
            if (closeButton) {
                const barElement = closeButton.closest('#gavan-download-bar');
                if (barElement) {
                    barElement.remove();
                }
                sessionStorage.setItem('gavanDownloadBarClosed', 'true');
            }
        });

    }); // Akhir dari 'DOMContentLoaded'

})(); // Akhir dari IIFE
