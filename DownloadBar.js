// [PERBAIKAN FINAL] Menggunakan jQuery dan selector dari skrip Anda
$(document).ready(function() {

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
            
            /* Menggunakan animasi max-height untuk slide-down */
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-out; 
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
            box-shadow: 0 0 20px #00eaff, 0 0 30px #0077ff, inset 0 0 5px rgba(255, 255, 255, .4);
        }
    `;

    // --- Injeksi CSS ke <head> ---
    // (Menggunakan metode jQuery)
    $('head').append('<style>' + gavanDownloadStyles + '</style>');

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
    
    // --- [PERBAIKAN UTAMA] Injeksi HTML menggunakan selector dari skrip asli ---
    const targetWrapper = $('#navbar-top-wrapper');
    
    if (targetWrapper.length > 0) {
        // Gunakan .prepend() untuk menyisipkan *di dalam* wrapper
        targetWrapper.prepend(barHtml);

        // Simpan referensi ke elemen bar yang baru dibuat
        const barElement = $('#gavan-download-bar');

        // Memicu animasi 'slide-down'
        setTimeout(() => {
            barElement.css('max-height', '100px'); 
        }, 50); // Delay kecil untuk animasi

    } else {
        // Fallback jika tidak ditemukan (seharusnya tidak terjadi jika skrip asli Anda berhasil)
        console.warn('Gavan APK: Target #navbar-top-wrapper tidak ditemukan!');
    }

    // --- Logika Tombol Close (Gunakan jQuery 'on' untuk event) ---
    // Mendaftarkan listener ke 'body' memastikan tombol ini bisa diklik
    // bahkan jika elemennya baru ditambahkan secara dinamis
    $('body').on('click', '#gavan-download-bar-close', function() {
        const barElement = $(this).closest('#gavan-download-bar');
        
        // Animasi 'slide-up'
        barElement.css('transition', 'max-height 0.3s ease-in');
        barElement.css('max-height', '0'); 
        
        sessionStorage.setItem('gavanDownloadBarClosed', 'true');
        
        // Hapus elemen dari DOM setelah animasi selesai
        setTimeout(() => {
            barElement.remove();
        }, 300);
    });
});
