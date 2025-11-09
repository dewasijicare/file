(function() {
    // --- 1. BLOK CSS KHUSUS MENU GAME (V2) ---
    const gameMenuStylesV2 = `
        /* CSS untuk Game Menu Grid - V2 */
        :root {
            --neon-blue: #00eaff;
            --dark-bg: #1a252f;
            --border-color: #00aaff;
        }

        .gavan-game-menu-grid {
            padding: 1rem 0;
        }
        
        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.75rem; 
            --bs-gutter-y: 0.75rem;
        }

        /* --- PERUBAHAN DI SINI --- */
        .game-menu-box {
            background: var(--dark-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #ecf0f1;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 0 10px rgba(0, 170, 255, 0.4);
            
            /* 1. Membuat kotak menjadi persegi (1:1) */
            aspect-ratio: 1 / 1; 
            
            /* 2. Mengatur konten (ikon & teks) agar pas di tengah kotak persegi */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.5rem; /* Padding disesuaikan untuk kotak persegi */
        }

        .game-menu-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px var(--neon-blue);
            color: #fff;
        }

        .game-menu-icon {
            font-size: 2.2rem; /* Ukuran ikon disesuaikan sedikit */
            margin-bottom: 0.25rem; /* Jarak ikon ke teks diperkecil */
            display: block; 
        }

        /* 3. Semua ikon menggunakan warna biru ini */
        .game-menu-icon-color {
            color: var(--neon-blue);
            text-shadow: 0 0 10px var(--neon-blue);
        }

        /* 4. Memperkecil font label agar "Olahraga" tidak nabrak */
        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.7rem; /* Diperkecil dari 0.8rem */
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.2; /* Menjaga tinggi baris */
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV2;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V2) ---
    function injectGameMenuV2() {
        // Cek apakah menu sudah ada agar tidak duplikat
        if (document.querySelector('.gavan-game-menu-grid')) {
            return;
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // --- PERUBAHAN: Ikon Togel diubah, 'color' dihilangkan ---
            const menuItems = [
                { label: 'Olahraga', icon: 'bi-dribbble', href: '/sport' },
                { label: 'Esports', icon: 'bi-controller', href: '#' }, 
                { label: 'Kasino', icon: 'bi-suit-diamond-fill', href: '/game?category=102' },
                { label: 'Live Kasino', icon: 'bi-person-video3', href: '/game?category=102' },
                { label: 'Kartu', icon: 'bi-suit-club-fill', href: '/game?category=103' },
                { label: 'Virtual', icon: 'bi-display', href: '#' },
                { label: 'Togel', icon: 'bi-8-circle-fill', href: '/togel' }, // Ikon diubah
                { label: 'Slot', icon: 'bi-joystick', href: '/game?category=101' }
            ];

            // Membuat string HTML
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row">';
            
            menuItems.forEach(item => {
                // --- PERUBAHAN: 'item.color' dihapus, kelas statis 'game-menu-icon-color' dipakai ---
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
            setTimeout(injectGameMenuV2, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    // Gunakan listener yang lebih aman untuk inject
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGameMenuV2);
    } else {
        // Jika DOM sudah dimuat, jalankan langsung
        injectGameMenuV2();
    }
})();
