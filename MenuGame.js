(function() {
    // --- 1. BLOK CSS KHUSUS MENU GAME ---
    const gameMenuStyles = `
        /* CSS untuk Game Menu Grid */
        :root {
            --neon-blue: #00eaff;
            --neon-yellow: #FFD700;
            --dark-bg: #1a252f;
            --border-color: #00aaff;
        }

        .gavan-game-menu-grid {
            padding: 1rem 0;
        }
        
        /* Mengatur grid: 4 kolom (col-3) */
        .gavan-game-menu-grid .row {
            /* Gutter (jarak antar kotak) yang lebih rapat */
            --bs-gutter-x: 0.75rem; 
            --bs-gutter-y: 0.75rem;
        }

        .game-menu-box {
            background: var(--dark-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px; /* Sesuai tema Gavan */
            padding: 1rem 0.5rem; /* Padding atas/bawah 1rem, kiri/kanan 0.5rem */
            text-align: center;
            text-decoration: none;
            color: #ecf0f1;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: block;
            height: 100%; /* Menjaga tinggi kotak tetap sama per baris */
            box-shadow: 0 0 10px rgba(0, 170, 255, 0.4); /* Glow standar */
        }

        .game-menu-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px var(--neon-blue); /* Glow lebih terang saat hover */
            color: #fff;
        }

        .game-menu-icon {
            font-size: 2.5rem; /* Ukuran ikon */
            margin-bottom: 0.5rem;
            display: block; /* Memastikan ikon di tengah */
        }

        /* Warna Ikon Sesuai Tema (Biru & Kuning) */
        .game-menu-icon.blue {
            color: var(--neon-blue);
            text-shadow: 0 0 10px var(--neon-blue);
        }
        .game-menu-icon.yellow {
            color: var(--neon-yellow);
            text-shadow: 0 0 10px var(--neon-yellow);
        }

        .game-menu-label {
            font-family: 'Exo 2', sans-serif;
            font-weight: 700;
            font-size: 0.8rem; /* Font sedikit lebih kecil agar muat 4 kolom */
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStyles;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU ---
    function injectGameMenu() {
        // Cek apakah menu sudah ada agar tidak duplikat
        if (document.querySelector('.gavan-game-menu-grid')) {
            return;
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        // Jika elemen target ditemukan
        if (targetPanel) {
            
            // Daftar 8 menu (agar pas 2 baris x 4 kolom)
            const menuItems = [
                { label: 'Olahraga', icon: 'bi-dribbble', color: 'blue', href: '/sport' },
                { label: 'Esports', icon: 'bi-controller', color: 'yellow', href: '#' }, // Ganti href='#' 
                { label: 'Kasino', icon: 'bi-suit-diamond-fill', color: 'blue', href: '/game?category=102' },
                { label: 'Live Kasino', icon: 'bi-person-video3', color: 'yellow', href: '/game?category=102' },
                { label: 'Kartu', icon: 'bi-suit-club-fill', color: 'blue', href: '/game?category=103' },
                { label: 'Virtual', icon: 'bi-display', color: 'yellow', href: '#' }, // Ganti href='#'
                { label: 'Togel', icon: 'bi-hash', color: 'blue', href: '/togel' },
                { label: 'Slot', icon: 'bi-joystick', color: 'yellow', href: '/game?category=101' }
            ];

            // Membuat string HTML
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row">';
            
            menuItems.forEach(item => {
                menuHTML += `
                    <div class="col-3">
                        <a href="${item.href}" class="game-menu-box">
                            <i class="bi ${item.icon} game-menu-icon ${item.color}"></i>
                            <div class="game-menu-label">${item.label}</div>
                        </a>
                    </div>
                `;
            });
            
            menuHTML += '</div></div>';

            // Sisipkan HTML tepat SETELAH panel saldo
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            // Jika panel belum dimuat (jarang terjadi tapi untuk keamanan)
            setTimeout(injectGameMenu, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectGameMenu);
    
    // Jalankan juga untuk memastikan script berjalan jika DOM sudah 'complete'
    injectGameMenu(); 
})();