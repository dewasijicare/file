(function() {
    // --- Pengaturan ---
    const apkDownloadLink = "https://fffiiillleee.com/apk/gabantoto.apk";
    const appIconUrl = "https://raw.githubusercontent.com/dewasijicare/images/main/icon_gaban_36x36.png"; // Icon dari skrip Anda
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

    // --- BLOK CSS (GAVAN THEME) ---
    // Sesuai permintaan: "jangan terlalu lebar" (tinggi baris diatur ke ~65px)
    const gavanDownloadStyles = `
        :root {
            /* Atur "lebar" (tinggi) bar di sini */
            --gavan-download-bar-height: 65px; 
        }
        
        #gavan-download-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--gavan-download-bar-height);
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
            border-top: 1px solid #00aaff !important;
            box-shadow: 0 -5px 20px rgba(0, 170, 255, 0.5) !important;
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            font-family: 'Exo 2', sans-serif !important;
            transform: translateY(100%);
            animation: gavan-slide-up 0.5s ease forwards;
            box-sizing: border-box;
        }

        @keyframes gavan-slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0%); }
        }

        #gavan-download-bar * {
             box-sizing: border-box;
        }

        #gavan-download-bar-close {
            font-size: 1.8rem; /* Ukuran tombol close */
            color: #bdc3c7; /* Warna muted */
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
            color: #e74c3c; /* Warna merah saat hover */
            transform: scale(1.1);
        }

        #gavan-download-bar-icon {
            flex-shrink: 0;
            width: 45px; /* Ukuran ikon APK */
            height: 45px;
            margin-left: 5px;
            border-radius: 8px; /* samakan dengan tema */
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
            box-shadow: 0 0 20px #00eaff, 0 0 30px #0077ff, inset 0 0 5px rgba(255, 255, 255, .4);
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
    document.body.appendChild(barElement);

    // --- Logika Tombol Close ---
    document.getElementById('gavan-download-bar-close').addEventListener('click', function() {
        barElement.style.transition = 'transform 0.3s ease-out';
        barElement.style.transform = 'translateY(100%)';
        
        // Simpan di sessionStorage agar muncul lagi saat buka tab baru
        // Ganti ke localStorage.setItem(...) jika ingin ditutup permanen
        sessionStorage.setItem('gavanDownloadBarClosed', 'true');
        
        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            if (barElement) {
                barElement.remove();
            }
        }, 300);
    });

})();