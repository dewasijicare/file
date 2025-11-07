// [PERBAIKAN V7] Layout diubah: Teks (kiri), Ikon (kanan), Close (kanan)
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

        // --- [PERUBAHAN] BLOK CSS (Tombol Download dihapus, Ikon dimodifikasi) ---
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
                padding: 0 5px 0 10px; /* Jarak dari ikon */
                cursor: pointer; line-height: 1;
                transition: all 0.3s ease; flex-shrink: 0;
            }
            #gavan-download-bar-close:hover { color: #e74c3c; transform: scale(1.1); }

            /* [BARU] Wrapper untuk ikon agar bisa diklik */
            #gavan-download-bar-icon-link {
                flex-shrink: 0;
                line-height: 0; /* Menghilangkan spasi aneh di bawah <a> */
                margin-left: 10px; /* Jarak dari teks */
            }
            #gavan-download-bar-icon-link:hover img {
                transform: scale(1.1); /* Efek hover */
            }

            #gavan-download-bar-icon {
                flex-shrink: 0; width: 45px; height: 45px;
                border-radius: 8px;
                transition: transform 0.2s ease;
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

            /* [DIHAPUS] Semua style untuk #gavan-download-bar-button telah dihapus */
        `;

        // --- Injeksi CSS ke <head> (Metode Vanilla JS) ---
        const styleElement = document.createElement('style');
        styleElement.innerHTML = gavanDownloadStyles;
        document.head.appendChild(styleElement);

        // --- [PERUBAHAN] BLOK HTML (Urutan diubah, tombol dihapus) ---
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
        
        // --- Logika Injeksi (Tidak Berubah) ---
        const targetWrapper = document.getElementById('navbar-top-wrapper');
        const mainContent = document.getElementById('maincontent');
        
        if (targetWrapper && mainContent) {
            targetWrapper.insertAdjacentHTML('afterbegin', barHtml);
            const barElement = document.getElementById('gavan-download-bar');
            if (barElement) {
                const barHeight = barElement.offsetHeight;
                if (barHeight > 0) {
                    mainContent.style.marginTop = barHeight + 'px';
                }
            }
        } else {
            console.warn('Gavan APK: Target #navbar-top-wrapper atau #maincontent tidak ditemukan!');
        }

        // --- Logika Tombol Close (Tidak Berubah) ---
        document.body.addEventListener('click', function(event) {
            const closeButton = event.target.closest('#gavan-download-bar-close');
            
            if (closeButton) {
                const barElement = closeButton.closest('#gavan-download-bar');
                if (barElement) {
                    barElement.remove();
                }
                if (mainContent) {
                    mainContent.style.marginTop = ''; 
                }
                sessionStorage.setItem('gavanDownloadBarClosed', 'true');
            }
        });

    }); // Akhir dari 'DOMContentLoaded'

})(); // Akhir dari IIFE
