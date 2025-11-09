(function() {
    // --- 1. BLOK CSS KHUSUS MENU GAME (V18) ---
    const gameMenuStylesV18 = `
        /* CSS untuk Game Menu Grid - V18 (Hanya Ikon Bawaan) */
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

        /* PERBAIKAN: Ukuran ikon diperkecil */
        .game-menu-icon { 
            font-size: 1.9rem; /* Ukuran ikon lebih kecil */
            margin-bottom: 0; /* Margin di-nol-kan, diatur oleh label */
            display: block; 
        }

        /* PERBAIKAN: Efek glow (text-shadow) DIHAPUS, hanya warna */
        .game-menu-icon-color {
            color: var(--neon-yellow);
        }

        /* PERBAIKAN: Tata letak teks (font-size, margin, line-height) */
        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            line-height: 1.2; /* Jarak baris */
            margin-top: 0.25rem; /* Jarak dari ikon */
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV18;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V18) ---
    function injectGameMenuV18() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // --- PERUBAHAN: Ikon kembali ke Bootstrap Icons (Stabil) ---
            const menuItems = [
                { label: 'Slot', icon: 'bi-7-square-fill', href: '/game?category=101' },
                { label: 'Casino', icon: 'bi-dice-6-fill', href: '/game?category=102' },
                { label: 'Sport', icon: 'bi-dribbble', href: '/sport' },
                { label: 'Togel', icon: 'bi-8-circle-fill', href: '/togel' }, 
                { label: 'Table', icon: 'bi-layout-text-sidebar-reverse', href: '#' },
                { label: 'Fishing', icon: 'bi-bullseye', href: '#' },
                { label: 'Cock Fight', icon: 'bi-lightning-charge-fill', href: '#' },
                { label: 'Arcade', icon: 'bi-controller', href: '#' }
            ];

            // Membuat string HTML
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row">';
            
            menuItems.forEach(item => {
                menuHTML += `
                    <div class="col-3">
                        <a href="${item.href}" class="game-menu-box">
                            <i class="bi ${item.icon} game-menu-icon game-menu-icon-color"></i>
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
            setTimeout(injectGameMenuV18, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGameMenuV18);
    } else {
        injectGameMenuV18();
    }
})();
