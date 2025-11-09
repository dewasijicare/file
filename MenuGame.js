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


    // --- 1. BLOK CSS KHUSUS MENU GAME (V5) ---
    const gameMenuStylesV5 = `
        /* CSS untuk Game Menu Grid - V5 */
        :root {
            --neon-yellow: #FFD700; /* Warna kuning border & ikon */
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

        /* Kelas ikon untuk kedua library (BI & FA) */
        .game-menu-icon, .game-menu-icon-fa { 
            font-size: 2.1rem;
            margin-bottom: 0.1rem;
            display: block; 
        }

        .game-menu-icon-color {
            color: var(--neon-yellow);
            text-shadow: 0 0 10px var(--neon-yellow);
        }

        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            line-height: 1.1;
            word-break: break-word;
            max-width: 100%;
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV5;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V5) ---
    function injectGameMenuV5() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // --- PERUBAHAN: Ikon diganti sesuai V5 (campuran BI dan FA) ---
            const menuItems = [
                { label: 'Slot', icon: 'bi-7-square-fill', type: 'bi', href: '/game?category=101' },
                { label: 'Casino', icon: 'fa-gem', type: 'fa', href: '/game?category=102' }, // FA
                { label: 'Sport', icon: 'bi-dribbble', type: 'bi', href: '/sport' },
                { label: 'Togel', icon: 'bi-8-circle-fill', type: 'bi', href: '/togel' }, 
                { label: 'Table', icon: 'fa-hat-wizard', type: 'fa', href: '#' }, // FA (menggunakan hat-wizard sebagai kartu poker)
                { label: 'Fishing', icon: 'fa-fish-fins', type: 'fa', href: '#' }, // FA (ikan lucu)
                { label: 'Cock Fight', icon: 'fa-feather-pointed', type: 'fa', href: '#' }, // FA (bulu, pengganti ayam jantan)
                { label: 'Arcade', icon: 'bi-controller', type: 'bi', href: '#' }
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
            setTimeout(injectGameMenuV5, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    // Pastikan Font Awesome dimuat sebelum mencoba inject menu
    const faCheckInterval = setInterval(() => {
        if (document.querySelector('link[href*="font-awesome"]') && 
            document.fonts.check('1rem "Font Awesome 6 Free"')) { // Pastikan font FA benar-benar siap
            clearInterval(faCheckInterval);
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV5);
            } else {
                injectGameMenuV5();
            }
        }
    }, 100); // Cek setiap 100ms
})();
