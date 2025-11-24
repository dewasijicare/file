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

    // --- 1. BLOK CSS KHUSUS MENU GAME (V34 - MATCHING BLUE BORDER) ---
    const gameMenuStylesV34 = `
        :root {
            --gaban-gold: #FFD700;
            --gaban-blue: #00aaff; /* Warna Biru Tema GabanToto */
            --gaban-dark: #0f151c;
            --gaban-panel: #1a252f;
        }

        .gavan-game-menu-grid {
            padding: 1rem 0;
            animation: fadeInMenu 0.8s ease-out forwards;
            opacity: 0;
        }

        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.5rem; 
            --bs-gutter-y: 0.5rem;
        }

        .gavan-game-menu-grid .col {
            display: flex; 
        }

        /* --- STYLING KOTAK MENU --- */
        .game-menu-box {
            position: relative;
            background: linear-gradient(145deg, #1e2936, #121921); 
            
            /* [UBAH DISINI] Border Biru Cyan Tipis (Matching Tema) */
            border: 1px solid rgba(0, 170, 255, 0.4); 
            
            border-radius: 10px;
            text-align: center;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4); 
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%; 
            
            overflow: visible; 
            gap: 6px; 
            padding: 4px; 
            aspect-ratio: 1 / 1; 
        }

        .game-menu-box:hover {
            transform: translateY(-3px);
            background: linear-gradient(145deg, #253241, #1a222b);
            
            /* [HOVER] Border berubah jadi Emas saat disentuh */
            border-color: var(--gaban-gold);
            
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(255, 215, 0, 0.3);
            z-index: 10; 
        }

        /* --- STYLING WRAPPER ICON (TOKEN) --- */
        .icon-token-wrapper {
            /* Ukuran Mobile (Compact) */
            width: 35px;  
            height: 35px; 
            
            border-radius: 50%; 
            background: radial-gradient(circle at 30% 30%, #2c3e50, #000); 
            
            /* Border Token tetap Emas agar kontras dengan Border Kotak Biru */
            border: 1.5px solid transparent;
            background-image: linear-gradient(#1a252f, #1a252f), linear-gradient(135deg, #FFD700, #FDB931, #996515);
            background-origin: border-box;
            background-clip: content-box, border-box;
            
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0; 
            
            box-shadow: 0 0 8px rgba(0,0,0,0.5), inset 0 0 4px rgba(0,0,0,0.8);
            transition: all 0.3s ease;
        }

        .game-menu-box:hover .icon-token-wrapper {
            /* Saat hover, glow token makin terang */
            box-shadow: 0 0 12px var(--gaban-gold); 
            transform: scale(1.1) rotate(5deg); 
        }

        /* --- STYLING ICON --- */
        .gavan-icon-base {
            /* Ukuran Mobile */
            font-size: 0.95rem; 
            line-height: 1; 
            
            /* Warna Emas Metallic */
            background: linear-gradient(to bottom, #FFF 0%, #FFD700 50%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            
            filter: drop-shadow(0 1px 1px rgba(0,0,0,0.8));
            
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding-top: 1px; 
        }

        /* --- STYLING TEKS LABEL --- */
        .game-menu-label {
            font-family: 'Exo 2', 'Segoe UI', sans-serif;
            font-weight: 700;
            font-size: 0.6rem; 
            text-transform: uppercase;
            letter-spacing: 0.3px;
            
            /* Warna Teks Normal: Abu-abu terang (Bukan Emas, agar tidak ramai) */
            color: #bdc3c7; 
            
            margin: 0;
            line-height: 1.1;
            white-space: nowrap;
            transition: color 0.3s ease;
        }

        .game-menu-box:hover .game-menu-label {
            color: var(--gaban-gold); /* Jadi Emas saat Hover */
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }

        @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* --- TAMPILAN DESKTOP --- */
        @media (min-width: 992px) {
            .gavan-game-menu-grid .row {
                --bs-gutter-x: 0.8rem;
                --bs-gutter-y: 0.8rem;
            }

            .game-menu-box {
                aspect-ratio: auto; 
                flex-direction: row; 
                padding: 0 1rem; 
                background: linear-gradient(to right, #1a252f, #141e26);
                min-height: 70px; 
                gap: 12px;
                justify-content: flex-start; 
            }
            
            .icon-token-wrapper {
                width: 38px;
                height: 38px;
            }
            
            .gavan-icon-base {
                font-size: 1.1rem; 
            }

            .game-menu-label {
                font-size: 0.85rem;
                text-align: left;
            }
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV34;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V34) ---
    function injectGameMenuV34() {
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

            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row row-cols-4 row-cols-lg-4">'; 
            
            menuItems.forEach(item => {
                const iconClass = item.type === 'fa' ? `fa-solid ${item.icon}` : `bi ${item.icon}`;
                menuHTML += `
                    <div class="col"> 
                        <a href="${item.href}" class="game-menu-box">
                            <div class="icon-token-wrapper">
                                <i class="${iconClass} gavan-icon-base"></i>
                            </div>
                            <div class="game-menu-label">${item.label}</div>
                        </a>
                    </div>
                `;
            });
            
            menuHTML += '</div></div>';
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            setTimeout(injectGameMenuV34, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    const faCheckInterval = setInterval(() => {
        if (document.querySelector('link[href*="font-awesome"]')) {
            clearInterval(faCheckInterval); 
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV34);
            } else {
                injectGameMenuV34();
            }
        }
    }, 100); 
})();
