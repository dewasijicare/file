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

    // --- 1. BLOK CSS KHUSUS MENU GAME (V25 - FIXED HEIGHT) ---
    const gameMenuStylesV25 = `
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

        /* Jarak antar kotak */
        .gavan-game-menu-grid .row {
            --bs-gutter-x: 0.8rem; 
            --bs-gutter-y: 0.8rem;
        }

        /* Pastikan kolom memiliki tinggi yang sama (Flex Stretch) */
        .gavan-game-menu-grid .col {
            display: flex; 
        }

        /* --- STYLING KOTAK MENU (MOBILE FIRST) --- */
        .game-menu-box {
            position: relative;
            background: linear-gradient(145deg, #232f3c, #151c24); 
            border: 1px solid rgba(255, 215, 0, 0.3); 
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #bdc3c7;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1); 
            
            /* MOBILE: Tetap Kotak Persegi */
            aspect-ratio: 1 / 1; 
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%; /* [FIX] Paksa isi penuh kolom */
            overflow: hidden;
        }

        .game-menu-box:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: var(--gaban-gold);
            background: linear-gradient(145deg, #2c3e50, #1a252f);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 
                        0 0 15px var(--gaban-gold-glow);
            color: #fff;
        }

        /* --- STYLING IKON --- */
        .gavan-icon-base {
            font-size: 2.2rem;
            display: block; 
            margin-bottom: 5px;
            color: var(--gaban-gold);
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.4));
            transition: all 0.3s ease;
        }

        .game-menu-box:hover .gavan-icon-base {
            transform: scale(1.1);
            color: #fff;
            filter: drop-shadow(0 0 8px var(--gaban-blue-neon));
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
            line-height: 1.2; /* Jaga jarak baris */
        }

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
                padding: 0 1rem; /* Padding Kiri Kanan */
                background: linear-gradient(to right, #1a252f, #141e26);
                
                /* [FIX UTAMA] Mengunci Tinggi Tombol di Desktop */
                min-height: 65px; 
                height: 100%; 
            }

            .gavan-icon-base {
                font-size: 1.6rem;
                margin-right: 12px;
                margin-bottom: 0;
            }

            .game-menu-label {
                font-size: 0.85rem;
                margin-top: 0;
                text-align: left;
                /* Mencegah teks turun baris (opsional, jika ingin 1 baris) */
                white-space: nowrap; 
            }
        }
    `;

    // Tambahkan CSS ke <head>
    const styleEl = document.createElement('style');
    styleEl.innerHTML = gameMenuStylesV25;
    document.head.appendChild(styleEl);


    // --- 2. FUNGSI UNTUK MENYISIPKAN HTML MENU (V25) ---
    function injectGameMenuV25() {
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

            let menuHTML = '<div class="container gavan-game-menu-grid"><div class="row row-cols-4 row-cols-lg-4">'; // Menggunakan 4 kolom agar kotak lebih lebar dan rapi
            
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
            targetPanel.insertAdjacentHTML('afterend', menuHTML);

        } else {
            setTimeout(injectGameMenuV25, 300);
        }
    }

    // --- 3. EKSEKUSI ---
    const faCheckInterval = setInterval(() => {
        if (document.querySelector('link[href*="font-awesome"]')) {
            clearInterval(faCheckInterval); 
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectGameMenuV25);
            } else {
                injectGameMenuV25();
            }
        }
    }, 100); 
})();
