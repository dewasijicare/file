// [PERBAIKAN V8] Menghapus logika margin-top (penyebab space kosong) + Ganti Teks Kuning + Spasi Ikon
(function() {
    
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

        // --- [PERUBAHAN V8] BLOK CSS ---
        const gavanDownloadStyles = `
            #gavan-download-bar {
                background: linear-gradient(145deg, #2c3e50, #1a2f40) !important; /* Sedikit penyesuaian gradient */
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

            /* [PERUBAHAN V8] Tombol close diberi margin kiri agar tidak mepet ikon */
            #gavan-download-bar-close {
                font-size: 1.8rem; color: #bdc3c7; background: none; border: none;
                padding: 0 5px; /* Padding L/R */
                margin-left: 10px; /* Jarak dari ikon */
                cursor: pointer; line-height: 1;
                transition: all 0.3s ease; flex-shrink: 0;
            }
            #gavan-download-bar-close:hover { color: #e74c3c; transform: scale(1.1); }

            #gavan-download-bar-icon-link {
                flex-shrink: 0;
                line-height: 0; 
                margin-left: 10px; /* Jarak dari teks */
            }
            #gavan-download-bar-icon-link:hover img {
                transform: scale(1.1); 
            }

            #gavan-download-bar-icon {
                flex-shrink: 0; width: 45px; height: 45px;
                border-radius: 8px;
                transition: transform 0.2s ease;
            }

            /* [PERUBAHAN V8] Teks diubah jadi kuning (#FFD700) */
            #gavan-download-bar-text {
                flex-grow: 1; 
                color: #FFD700 !important;
                padding: 0 12px; font-size: 0.9rem;
                line-height: 1.3; 
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.6) !important; /* Shadow kuning */
                overflow: hidden; white-space: nowrap;
            }
            #gavan-download-bar-text strong {
                color: #FFD700 !important; /* Teks strong juga kuning */
                display: block; font-size: 1rem; text-transform: uppercase;
                text-overflow: ellipsis; overflow: hidden;
            }
        `;

        // --- Injeksi CSS ke <head> ---
        const styleElement = document.createElement('style');
        styleElement.innerHTML = gavanDownloadStyles;
        document.head.appendChild(styleElement);

        // --- BLOK HTML (Sama seperti V7) ---
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
        
        // --- [PERUBAHAN V8] Logika Injeksi (Logika margin-top dihapus) ---
        const targetWrapper = document.getElementById('navbar-top-wrapper');
        
        if (targetWrapper) {
            // Cukup suntikkan HTML. Selesai.
            // Dorongan ke bawah akan terjadi secara alami.
            targetWrapper.insertAdjacentHTML('afterbegin', barHtml);
        } else {
            console.warn('Gavan APK: Target #navbar-top-wrapper tidak ditemukan!');
        }

        // --- [PERUBAHAN V8] Logika Tombol Close (Logika margin-top dihapus) ---
        document.body.addEventListener('click', function(event) {
            const closeButton = event.target.closest('#gavan-download-bar-close');
            
            if (closeButton) {
                const barElement = closeButton.closest('#gavan-download-bar');
                if (barElement) {
                    barElement.remove();
                }
                // Tidak perlu reset margin-top lagi
                sessionStorage.setItem('gavanDownloadBarClosed', 'true');
            }
        });

    }); // Akhir dari 'DOMContentLoaded'

})(); // Akhir dari IIFE
