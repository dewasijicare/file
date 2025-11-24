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

    // --- 1. BLOK CSS KHUSUS MENU GAME (V26 - RAPI & ICON KECIL) ---
    const gameMenuStylesV26 = `
        :root {
            --gaban-gold: #FFD700;
            --gaban-gold-glow: rgba(255, 215, 0, 0.6);
            --gaban-dark: #0f151c;
            --gaban-panel: #1a252f;
            --gaban-blue-neon: #00eaff;
        }

        .gavan-game-menu-grid {
            padding: 1rem 0;
            animation: fadeInMenu 0.8s ease-out forwards;
            opacity: 0;
        }

        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.6rem; 
            --bs-gutter-y: 0.6rem;
        }

        .gavan-game-menu-grid .col {
            display: flex; 
        }

        /* --- STYLING KOTAK MENU --- */
        .game-menu-box {
            position: relative;
            background: linear-gradient(145deg, #232f3c, #151c24); 
            border: 1px solid rgba(255, 215, 0, 0.3); 
            border-radius: 10px; /* Radius sedikit dikecilkan */
            text-align: center;
            text-decoration: none;
            color: #bdc3c7;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1); 
            
            aspect-ratio: 1 / 1; 
            
            /* [LAYOUT FIX] Menggunakan Flexbox Rapi */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%; 
            overflow: hidden;
            
            /* [SPACING FIX] Jarak konsisten antara Icon dan Teks */
            gap: 6px; 
            padding: 5px;
        }

        .game-menu-box:hover {
            transform: translateY(-3px);
            border-color: var(--gaban-gold);
            background: linear-gradient(145deg, #2c3e50, #1a252f);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5), 
                        0 0 10px var(--gaban-gold-glow);
            color: #fff;
        }

        /* --- STYLING IKON (DIPERKECIL & DIKUNCI TINGGINYA) --- */
        .gavan-icon-base {
            /* [SIZE FIX] Ukuran Icon Diperkecil */
            font-size: 1.5rem; 
            
            color: var(--gaban-gold);
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.4));
            transition: all 0.3s ease;
            
            /* [ALIGNMENT FIX] Memastikan Icon selalu memakan ruang yang sama */
            /* Ini mencegah teks naik turun karena beda tinggi icon */
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.6rem; 
            width: 100%;
            line-height: 1;
            margin: 0;
        }

        .game-menu-box:hover .gavan-icon-base {
            transform: scale(1.1);
            color: #fff;
            filter: drop-shadow(0 0 8px var(--gaban-blue-neon));
        }

        /* --- STYLING TEKS LABEL --- */
        .game-menu-label {
            font-family: 'Exo 2', 'Segoe UI', sans-serif;
            font-weight: 700;
            font-size: 0.65rem; /* Font sedikit diperkecil agar rapi */
            text-transform: uppercase;
            letter-spacing: 0.3px;
            color: #ecf0f1;
            margin: 0;
            line-height: 1;
            white-space: nowrap; /* Mencegah teks turun baris */
        }

        @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* --- TAMPILAN DESKTOP (Lebih Lebar) --- */
        @media (min-width: 992px) {
            .gavan-game-menu-grid .row {
                --bs-gutter-x: 0.8rem;
                --bs-gutter-y: 0.8rem;
            }

            .game-menu-box {
                aspect-ratio: auto; 
                flex-direction: row; /* Icon di Kiri, Teks di Kanan */
                padding: 0 1rem; 
                background: linear-gradient(to right, #1a252f, #141e26);
                min-height: 55px; /* Sedikit diperkecil tingginya */
                gap: 10px;
            }

            .gavan-icon-base {
                font-size: 1.3rem; /* Icon desktop juga diperkecil */
                height: auto;
                width: auto;
                margin: 0;
                justify-content: flex-start;
            }

            .game-menu-label {
                font-size: 0.8rem;
                text-align: left;
            }
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV26;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V26) ---
    function injectGameMenuV26() {
        const existingMenu = document.querySelector('.gavan-game-menu-grid');
        if (existingMenu) existingMenu.remove();
        
        const targetPanel = document.getElementById('member-status-panel');
        
        if (targetPanel) {
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

            // Tetap 4 kolom untuk tampilan kotak yang proporsional
            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row row-cols-4 row-cols-lg-4">'; 
            
            menuItems.forEach(item => {
                const iconClass = item.type === 'fa' ? `fa-solid ${item.icon}` : `bi ${item.icon}`;
                menuHTML += `
                    <div class="col"> 
                        <a href="${item.href}" class="game-menu-box">
                            <div class="gavan-icon-base"><i class="${iconClass}"></i></div>
                            <div class="game-menu-label">${item.label}</div>
                        </a>
                    </div>
                `;
            });
            
            menuHTML += '</div></div>';
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            setTimeout(injectGameMenuV26, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    const faCheckInterval = setInterval(() => {
        if (document.querySelector('link[href*="font-awesome"]')) {
            clearInterval(faCheckInterval); 
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV26);
            } else {
                injectGameMenuV26();
            }
        }
    }, 100); 
})();
