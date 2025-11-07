// [DEBUG] Dibungkus 'DOMContentLoaded' untuk keamanan
document.addEventListener('DOMContentLoaded', function() {

    (function() {
        // --- Pengaturan ---
        const apkDownloadLink = "https://fffiiillleee.com/apk/gabantoto.apk"; 
        const appIconUrl = "https://raw.githubusercontent.com/dewasijicare/images/main/appicon_128x128.png";
        const appName = "GABANTOTO";
        const appDescription = "Unduh aplikasi resmi kami.";
        // --- Selesai Pengaturan ---

        /* // --- DEBUG: Pengecekan dimatikan sementara ---
        // 1. Cek jika sudah pernah ditutup di sesi ini
        if (sessionStorage.getItem('gavanDownloadBarClosed') === 'true') {
            console.log('Gavan APK: Dibatalkan (sessionStorage)');
            return; 
        }
        // 2. Cek jika bukan mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isMobile) {
            console.log('Gavan APK: Dibatalkan (bukan mobile)');
            return; // Hanya tampilkan di mobile
        }
        */
       
        console.log('Gavan APK: Menjalankan skrip... (Mode Debug)');

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
                
                /* [PERUBAHAN DEBUG] Animasi 'max-height' dan 'overflow' dihapus */
                /* Ini akan memaksanya terlihat secara instan */
            }

            #gavan-download-bar * {
                 box-sizing: border-box;
            }

            #gavan-download-bar-close {
                font-size: 1.8rem;
                color: #bdc3c7;
                background: none;
                border: none;
                padding: 0 10px;
                margin-right: 5px;
                cursor: pointer;
                line-height: 1;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }

            #gavan-download-bar-close:hover {
                color: #e74c3c;
                transform: scale(1.1);
            }

            #gavan-download-bar-icon {
                flex-shrink: 0;
                width: 45px;
                height: 45px;
                margin-left: 5px;
                border-radius: 8px;
            }

            #gavan-download-bar-text {
                flex-grow: 1;
                color: #ecf0f1;
                padding: 0 12px;
                font-size: 0.9rem;
                line-height: 1.3;
                text-shadow: 0 0 5px #00aaff;
                overflow: hidden;
                white-space: nowrap;
            }

            #gavan-download-bar-text strong {
                color: #fff;
                display: block;
                font-size: 1rem;
                text-transform: uppercase;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            
            #gavan-download-bar-text span {
                text-overflow: ellipsis;
                overflow: hidden;
            }

            #gavan-download-bar-button {
                flex-shrink: 0;
                background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                border: none !important;
                color: #fff !important;
                font-weight: 700;
                text-transform: uppercase;
                box-shadow: 0 0 10px #00eaff, inset 0 0 5px rgba(255, 255, 255, .4);
                transition: all .3s ease;
                border-radius: 5px;
                padding: 10px 15px;
                font-size: 0.9rem;
                text-decoration: none;
                text-align: center;
            }

            #gavan-download-bar-button:hover {
                transform: scale(1.05);
            }
        `;

        // --- Injeksi CSS ke <head> ---
        const styleElement = document.createElement('style');
        styleElement.innerHTML = gavanDownloadStyles;
        document.head.appendChild(styleElement);

        // --- BLOK HTML ---
        const barHtml = `
            <button id="gavan-download-bar-close" title="Tutup">&times;</button>
            <img id="gavan-download-bar-icon" src="${appIconUrl}" alt="Icon">
            <div id="gavan-download-bar-text">
                <strong>${appName}</strong>
                <span>${appDescription}</span>
            </div>
            <a href="${apkDownloadLink}" id="gavan-download-bar-button">Download</a>
        `;
        
        // --- Injeksi HTML ke <body> ---
        const barElement = document.createElement('div');
        barElement.id = 'gavan-download-bar';
        barElement.innerHTML = barHtml;

        document.body.prepend(barElement); 
        console.log('Gavan APK: Elemen bar DITAMBAHKAN ke body.');

        // [PERUBAHAN DEBUG] Memicu animasi dihapus
        // setTimeout(() => {
        //     barElement.style.maxHeight = '100px'; 
        // }, 50);

        // --- Logika Tombol Close ---
        // [PERUBAHAN DEBUG] Animasi 'max-height' diganti dengan 'display'
        document.getElementById('gavan-download-bar-close').addEventListener('click', function() {
            barElement.style.display = 'none'; // Sembunyikan langsung
            
            sessionStorage.setItem('gavanDownloadBarClosed', 'true');
            
            // Hapus setelah disembunyikan
            setTimeout(() => {
                if (barElement) {
                    barElement.remove();
                }
            }, 50);
        });

    })();
});
