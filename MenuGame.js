(function() {
    // --- 1. BLOK CSS KHUSUS MENU GAME (V3) ---
    const gameMenuStylesV3 = `
        /* CSS untuk Game Menu Grid - V3 */
        :root {
            --neon-blue: #00eaff; /* Tetap didefinisikan untuk border */
            --neon-yellow: #FFD700; /* Warna kuning border & ikon */
            --dark-bg: #1a252f;
            --border-color-yellow: #FFD700; /* Warna border kuning neon */
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
            /* Border warna kuning */
            border: 1px solid var(--border-color-yellow); 
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #ecf0f1;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            /* Box-shadow kuning */
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); 
            
            /* Membuat kotak menjadi persegi (1:1) */
            aspect-ratio: 1 / 1; 
            
            /* Mengatur konten (ikon & teks) agar pas di tengah kotak persegi */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.25rem; /* Padding lebih kecil lagi agar teks panjang muat */
            width: 100%; /* Memastikan mengambil lebar penuh kolom */
        }

        .game-menu-box:hover {
            transform: translateY(-5px);
            /* Glow lebih terang saat hover, warna kuning */
            box-shadow: 0 0 20px var(--neon-yellow); 
            color: #fff;
        }

        .game-menu-icon {
            font-size: 2.1rem; /* Ukuran ikon disesuaikan */
            margin-bottom: 0.1rem; /* Jarak ikon ke teks lebih kecil */
            display: block; 
        }

        /* Semua ikon menggunakan warna kuning */
        .game-menu-icon-color {
            color: var(--neon-yellow);
            text-shadow: 0 0 10px var(--neon-yellow);
        }

        /* Memperkecil font label lebih lanjut */
        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.65rem; /* Diperkecil dari 0.7rem */
            text-transform: uppercase;
            letter-spacing: 0.2px; /* Letter spacing sedikit lebih rapat */
            line-height: 1.1; /* Menjaga tinggi baris agar tidak terlalu renggang */
            word-break: break-word; /* Memastikan kata panjang bisa pecah */
            max-width: 100%; /* Memastikan tidak meluber */
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV3;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V3) ---
    function injectGameMenuV3() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // Susunan menu dan ikon sesuai permintaan baru
            const menuItems = [
                { label: 'Slot', icon: 'bi-joystick', href: '/game?category=101' },
                { label: 'Casino', icon: 'bi-suit-diamond-fill', href: '/game?category=102' },
                { label: 'Sport', icon: 'bi-dribbble', href: '/sport' },
                { label: 'Togel', icon: 'bi-8-circle-fill', href: '/togel' }, 
                { label: 'Table', icon: 'bi-table', href: '#' }, // Menggunakan ikon bi-table
                { label: 'Fishing', icon: 'bi-fish', href: '#' }, // Menggunakan ikon bi-fish
                { label: 'Cock Fight', icon: 'bi-egg', href: '#' }, // Menggunakan ikon bi-egg (ayam jago)
                { label: 'Arcade', icon: 'bi-controller', href: '#' } // Menggunakan ikon bi-controller
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
            setTimeout(injectGameMenuV3, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    // Gunakan listener yang lebih aman untuk inject
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGameMenuV3);
    } else {
        // Jika DOM sudah dimuat, jalankan langsung
        injectGameMenuV3();
    }
})();
