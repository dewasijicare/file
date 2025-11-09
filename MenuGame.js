(function() {
    // --- 0. FUNGSI UNTUK MEMUAT FONT AWESOME (JIKA BELUM ADA) ---
    // Tetap dimuat untuk ikon yang masih menggunakan Font Awesome (Sport, Togel, Arcade)
    function loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(faLink);
        }
    }
    loadFontAwesome(); // Panggil fungsi ini di awal


    // --- 1. BLOK CSS KHUSUS MENU GAME (V7) ---
    const gameMenuStylesV7 = `
        /* CSS untuk Game Menu Grid - V7 */
        :root {
            --neon-yellow: #FFD700;
            --dark-bg: #1a252f;
            --border-color-yellow: #FFD700; 
        }

        .gavan-game-menu-grid {
            padding: 1rem 0;
        }
        
        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.75rem; 
            --bs-gutter-y: 0.75rem;
        }

        .game-menu-box {
            background: var(--dark-bg);
            border: 1px solid var(--border-color-yellow); 
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #ecf0f1;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); 
            aspect-ratio: 1 / 1; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.25rem; /* Padding minimal */
            width: 100%;
        }

        .game-menu-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px var(--neon-yellow); 
            color: #fff;
        }

        /* Ukuran dan positioning untuk FONT ICON (Slot, Sport, Togel, Arcade) */
        .game-menu-icon-font { 
            font-size: 1.8rem; /* Lebih kecil */
            margin-bottom: 0.1rem; 
            display: block; 
            color: var(--neon-yellow); /* Pastikan warna kuning */
        }

        /* Ukuran dan positioning untuk IMAGE ICON (Casino, Table, Fishing, Cock Fight) */
        .game-menu-icon-img {
            width: 38px; /* Ukuran gambar ikon */
            height: 38px; /* Ukuran gambar ikon */
            object-fit: contain; /* Memastikan gambar tidak terdistorsi */
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.7)); /* Glowing effect untuk gambar */
            margin-bottom: 0.1rem; /* Jarak ke teks */
        }
        
        /* PERBAIKAN: Tata letak teks (font-size, margin, line-height) */
        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.62rem; /* Sedikit lebih kecil lagi agar lebih rapi */
            text-transform: uppercase;
            letter-spacing: 0.1px; /* Letter spacing lebih rapat */
            line-height: 1.1; /* Jarak baris lebih longgar dari sebelumnya */
            margin-top: 0.35rem; /* Memberi jarak PASTI lebih besar dari ikon */
            word-break: break-word;
            max-width: 100%;
            display: block; /* Pastikan mengambil lebar penuh untuk rata tengah */
            color: #ecf0f1; /* Pastikan warna teks */
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV7;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V7) ---
    function injectGameMenuV7() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // --- PERUBAHAN: Ikon diganti sesuai V7 (campuran FONT ICON & IMAGE ICON) ---
            const menuItems = [
                { label: 'Slot', icon: 'bi-7-square-fill', type: 'bi', href: '/game?category=101' }, // FONT ICON
                { label: 'Casino', icon: 'https://cdn.jsdelivr.net/gh/gabantoto/image@main/casino-chips.png', type: 'img', href: '/game?category=102' }, // IMAGE ICON (Chips Poker)
                { label: 'Sport', icon: 'bi-dribbble', type: 'bi', href: '/sport' }, // FONT ICON
                { label: 'Togel', icon: 'bi-8-circle-fill', type: 'bi', href: '/togel' }, // FONT ICON
                { label: 'Table', icon: 'https://cdn.jsdelivr.net/gh/gabantoto/image@main/playing-cards.png', type: 'img', href: '#' }, // IMAGE ICON (Kartu Poker)
                { label: 'Fishing', icon: 'https://cdn.jsdelivr.net/gh/gabantoto/image@main/fishing-cute.png', type: 'img', href: '#' }, // IMAGE ICON (Ikan Lucu)
                { label: 'Cock Fight', icon: 'https://cdn.jsdelivr.net/gh/gabantoto/image@main/rooster-icon.png', type: 'img', href: '#' }, // IMAGE ICON (Ayam Jantan)
                { label: 'Arcade', icon: 'bi-controller', type: 'bi', href: '#' } // FONT ICON
            ];

            // Membuat string HTML
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row">';
            
            menuItems.forEach(item => {
                let iconContent;
                if (item.type === 'fa') { // Font Awesome
                    iconContent = `<i class="fa-solid ${item.icon} game-menu-icon-font"></i>`;
                } else if (item.type === 'bi') { // Bootstrap Icons
                    iconContent = `<i class="bi ${item.icon} game-menu-icon-font"></i>`;
                } else if (item.type === 'img') { // Gambar kustom
                    iconContent = `<img src="${item.icon}" alt="${item.label} Icon" class="game-menu-icon-img">`;
                }

                menuHTML += `
                    <div class="col-3">
                        <a href="${item.href}" class="game-menu-box">
                            ${iconContent}
                            <div class="game-menu-label">${item.label}</div>
                        </a>
                    </div>
                `;
            });
            
            menuHTML += '</div></div>';

            // Sisipkan HTML tepat SETELAH panel saldo
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            // Jika panel belum dimuat
            setTimeout(injectGameMenuV7, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    // Logika untuk menunggu Font Awesome siap sebelum inject (jika masih digunakan)
    // Sekarang lebih fokus pada DOM ready karena ada gambar eksternal
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGameMenuV7);
    } else {
        injectGameMenuV7();
    }
})();
