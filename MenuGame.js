(function() {
    // --- 0. FUNGSI UNTUK MEMUAT FONT AWESOME (JIKA BELUM ADA) ---
    function loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(faLink);
        }
    }
    loadFontAwesome(); // Panggil fungsi ini di awal


    // --- 1. BLOK CSS KHUSUS MENU GAME (V20) ---
    const gameMenuStylesV20 = `
        /* CSS untuk Game Menu Grid - V20 (Perbaikan Link) */
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
            padding: 0.25rem;
            width: 100%;
        }

        .game-menu-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px var(--neon-yellow); 
            color: #fff;
        }

        .game-menu-icon, .game-menu-icon-fa { 
            font-size: 1.9rem; /* Ukuran ikon kecil */
            margin-bottom: 0; 
            display: block; 
        }

        .game-menu-icon-color {
            color: var(--neon-yellow);
        }

        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            line-height: 1.2; 
            margin-top: 0.25rem; /* Jarak dari ikon */
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV20;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V20) ---
    function injectGameMenuV20() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // --- PERBAIKAN: Link href disesuaikan dengan HTML header ---
            const menuItems = [
                { label: 'Slot', icon: 'bi-7-square-fill', type: 'bi', href: '/game?category=101' },
                { label: 'Casino', icon: 'fa-coins', type: 'fa', href: '/game?category=102' },
                { label: 'Sport', icon: 'bi-dribbble', type: 'bi', href: '/sport' },
                { label: 'Togel', icon: 'bi-8-circle-fill', type: 'bi', href: '/togel' }, 
                { label: 'Table', icon: 'fa-clone', type: 'fa', href: '/game?category=103%2C104%2C105%2C106%2C107' }, // Link Diperbaiki
                { label: 'Fishing', icon: 'fa-fish-fins', type: 'fa', href: '/game?category=201' }, // Link Diperbaiki
                { label: 'Cock Fight', icon: 'fa-feather-pointed', type: 'fa', href: '/cockfight' }, // Link Diperbaiki
                { label: 'Arcade', icon: 'bi-controller', type: 'bi', href: '/game?category=151%2C900' } // Link Diperbaiki
            ];

            // Membuat string HTML
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row">';
            
            menuItems.forEach(item => {
                const iconClass = item.type === 'fa' ? `fa-solid ${item.icon}` : `bi ${item.icon}`;
                const iconElementClass = item.type === 'fa' ? 'game-menu-icon-fa' : 'game-menu-icon';

                menuHTML += `
                    <div class="col-3">
                        <a href="${item.href}" class="game-menu-box">
                            <i class="${iconClass} ${iconElementClass} game-menu-icon-color"></i>
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
            setTimeout(injectGameMenuV20, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    // Logika untuk menunggu Font Awesome siap sebelum inject
    const faCheckInterval = setInterval(() => {
        // Cek jika link CSS sudah ada DAN font-nya sudah bisa digunakan oleh browser
        if (document.querySelector('link[href*="font-awesome"]') && 
            document.fonts && document.fonts.check('1rem "Font Awesome 6 Free"')) {
            
            clearInterval(faCheckInterval); // Hentikan pengecekan
            
            // Jalankan inject
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV20);
            } else {
                injectGameMenuV20();
            }
        }
    }, 100); // Cek setiap 100ms
})();
