(function() {
    // --- 0. FUNGSI UNTUK MEMUAT FONT AWESOME ---
    function loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(faLink);
        }
    }
    loadFontAwesome(); 

    // --- 1. BLOK CSS KHUSUS MENU GAME (V24 - LUXURY NEON) ---
    const gameMenuStylesV24 = `
        :root {
            --gaban-gold: #FFD700;
            --gaban-gold-glow: rgba(255, 215, 0, 0.6);
            --gaban-dark: #0f151c;
            --gaban-panel: #1a252f;
            --gaban-blue-neon: #00eaff;
        }

        .gavan-game-menu-grid {
            padding: 1.5rem 0;
            animation: fadeInMenu 0.8s ease-out forwards;
            opacity: 0;
        }

        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.8rem; 
            --bs-gutter-y: 0.8rem;
        }

        /* --- STYLING KOTAK MENU (MOBILE FIRST) --- */
        .game-menu-box {
            position: relative;
            background: linear-gradient(145deg, #232f3c, #151c24); /* Gradasi Gelap Elegan */
            border: 1px solid rgba(255, 215, 0, 0.3); /* Border Emas Transparan */
            border-radius: 15px;
            text-align: center;
            text-decoration: none;
            color: #bdc3c7;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efek pantul halus */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1); /* Efek kedalaman 3D */
            aspect-ratio: 1 / 1; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            overflow: hidden;
        }

        /* Efek Kilau Putih saat Hover */
        .game-menu-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: 0.5s;
        }

        .game-menu-box:hover::before {
            left: 100%;
        }

        .game-menu-box:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: var(--gaban-gold);
            background: linear-gradient(145deg, #2c3e50, #1a252f);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 
                        0 0 15px var(--gaban-gold-glow); /* Glow Emas Luar */
            color: #fff;
        }

        /* --- STYLING IKON --- */
        .gavan-icon-base {
            font-size: 2.2rem;
            display: block; 
            margin-bottom: 5px;
            color: var(--gaban-gold);
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.4)); /* Glow pada ikon */
            transition: all 0.3s ease;
        }

        .game-menu-box:hover .gavan-icon-base {
            transform: scale(1.1);
            color: #fff; /* Ikon jadi putih saat hover */
            filter: drop-shadow(0 0 8px var(--gaban-blue-neon)); /* Glow berubah jadi biru */
            text-shadow: 0 0 10px var(--gaban-blue-neon);
        }

        /* --- STYLING TEKS LABEL --- */
        .game-menu-label {
            font-family: 'Exo 2', 'Segoe UI', sans-serif;
            font-weight: 700;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 0.25rem; 
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }

        /* Animasi Masuk */
        @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* --- PERUBAHAN DESKTOP (Breakpoint 'lg' 992px+) --- */
        @media (min-width: 992px) {
            .gavan-game-menu-grid .row {
                --bs-gutter-x: 1rem;
                --bs-gutter-y: 1rem;
            }

            .game-menu-box {
                aspect-ratio: auto; 
                flex-direction: row; 
                padding: 1rem 0.5rem;
                background: linear-gradient(to right, #1a252f, #141e26); /* Gradient Horizontal */
            }

            .gavan-icon-base {
                font-size: 1.8rem;
                margin-right: 12px;
                margin-bottom: 0;
            }

            .game-menu-label {
                font-size: 0.9rem;
                margin-top: 0;
                text-align: left;
            }
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV24;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V24) ---
    function injectGameMenuV24() {
        // Hapus versi menu sebelumnya jika ada
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Cari elemen target (panel saldo/username)
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
            
            // Daftar Menu
            const menuItems = [
                { label: 'Slot', icon: 'bi-7-square-fill', type: 'bi', href: '/game?category=101' },
                { label: 'Casino', icon: 'fa-coins', type: 'fa', href: '/game?category=102' },
                { label: 'Sport', icon: 'bi-dribbble', type: 'bi', href: '/sport' },
                { label: 'Togel', icon: 'bi-8-circle-fill', type: 'bi', href: '/togel' }, 
                { label: 'Table', icon: 'fa-rectangle-list', type: 'fa', href: '/game?category=103%2C104%2C105%2C106%2C107' },
                { label: 'Fishing', icon: 'fa-fish-fins', type: 'fa', href: '/game?category=201' },
                { label: 'Cock Fight', icon: 'fa-feather-pointed', type: 'fa', href: '/cockfight' },
                { label: 'Arcade', icon: 'bi-controller', type: 'bi', href: '/game?category=151%2C900' }
            ];

            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row row-cols-4 row-cols-lg-8">';
            
            menuItems.forEach(item => {
                const iconClass = item.type === 'fa' ? `fa-solid ${item.icon}` : `bi ${item.icon}`;

                menuHTML += `
                    <div class="col"> 
                        <a href="${item.href}" class="game-menu-box">
                            <i class="${iconClass} gavan-icon-base"></i>
                            <div class="game-menu-label">${item.label}</div>
                        </a>
                    </div>
                `;
            });
            
            menuHTML += '</div></div>';

            // Sisipkan HTML tepat SETELAH panel saldo
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            setTimeout(injectGameMenuV24, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    const faCheckInterval = setInterval(() => {
        if (document.querySelector('link[href*="font-awesome"]')) {
            clearInterval(faCheckInterval); 
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV24);
            } else {
                injectGameMenuV24();
            }
        }
    }, 100); 
})();
