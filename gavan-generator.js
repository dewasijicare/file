(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // ==========================================
        // BAGIAN 0: FILTER URL (KHUSUS /login & /register)
        // ==========================================
        
        // Ambil path URL saat ini (misal: /login atau /register)
        // Kita ubah ke huruf kecil untuk antisipasi kesalahan penulisan (case-insensitive)
        const path = window.location.pathname.toLowerCase();

        // 1. Cek Halaman Utama (Root /, index.php, atau home)
        const isHomePage = path === '/' || path === '/index.php' || path === '/index.html' || path === '/home';
        
        // 2. Cek Halaman Login (Hanya persis '/login' atau '/login/')
        const isLoginPage = path === '/login' || path === '/login/';
        
        // 3. Cek Halaman Daftar (Hanya persis '/register' atau '/register/')
        const isRegisterPage = path === '/register' || path === '/register/';

        // LOGIKA PEMBATASAN:
        // Jika BUKAN Home, BUKAN Login, dan BUKAN Register, script BERHENTI.
        if (!isHomePage && !isLoginPage && !isRegisterPage) {
            // Uncomment baris bawah ini jika ingin melihat log debug di Console browser
            // console.log('Generator: Script berhenti. Ini bukan halaman Home, Login, atau Register.');
            return; 
        }

        // ==========================================
        // BAGIAN 1: LOGIKA PENEMPATAN
        // ==========================================
        
        let anchorElement = null;

        // Cek elemen target
        const pintasWidget = document.getElementById('pintas-widget-wrapper');
        
        // Cari Form (Hanya diproses jika lolos filter URL di atas)
        // Kita cari form yang punya input username/password, atau form general
        const formWidget = document.querySelector('form input[name*="userName"]')?.closest('form') || 
                           document.querySelector('form input[name*="password"]')?.closest('form') ||
                           document.querySelector('form');

        // LOGIKA PILIH POSISI:
        if (isHomePage && pintasWidget) {
            // KONDISI 1: Di Home & Ada Widget Pintas
            anchorElement = pintasWidget;
            console.log('Generator: Aktif di Home (Target: Widget Pintas).');
        } else if ((isLoginPage || isRegisterPage) && formWidget) {
            // KONDISI 2: Di Login/Register & Ada Form
            anchorElement = formWidget;
            console.log('Generator: Aktif di Login/Register (Target: Form).');
        } else if (isHomePage && !pintasWidget) {
             // Fallback Home: Jika di Home tapi tidak ada widget pintas, matikan atau cari body
             console.log('Generator: Di Home, tapi target widget tidak ditemukan.');
             return;
        } else {
            // Fallback Umum
            console.log('Generator: Halaman cocok, tapi elemen target tidak ketemu.');
            return;
        }

        // ==========================================
        // BAGIAN 2: UI & CSS (TIDAK BERUBAH)
        // ==========================================

        const container = document.createElement('div');
        container.id = '4d-generator-container';

        // Sisipkan elemen (Insert After)
        if (anchorElement.nextSibling) {
            anchorElement.parentElement.insertBefore(container, anchorElement.nextSibling);
        } else {
            anchorElement.parentElement.appendChild(container);
        }
        
        const widgetStyles = `
            @keyframes spinReel {
                from { transform: translateY(0); }
                to { transform: translateY(-500px); }
            }

            #gavan-generator-widget {
                background: linear-gradient(145deg, #2c3e50, #1a2f2f);
                border: 1px solid #00aaff;
                box-shadow: 0 0 20px rgba(0, 170, 255, .6);
                border-radius: 15px;
                color: #ecf0f1;
                text-align: center;
                padding: 0.75rem;
                margin: 1rem auto;
                font-family: 'Exo 2', sans-serif;
                max-width: 400px;
                width: 100%;
                box-sizing: border-box;
            }
            .generator-display-slot {
                display: flex; justify-content: center; gap: 8px; margin-bottom: 0.75rem;
                background-color: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; border: 1px solid #34495e;
            }
            .digit-container {
                width: 45px; height: 50px; overflow: hidden; border-radius: 5px; background-color: #0c0c1e;
            }
            .digit-reel {
                display: flex; flex-direction: column;
                transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            .digit-reel.is-spinning {
                animation: spinReel 0.5s linear infinite;
                transition: none;
            }
            .digit-reel > div {
                width: 45px; height: 50px; line-height: 50px;
                font-size: 2rem; font-weight: 700; color: #fff;
                text-shadow: 0 0 6px #fff, 0 0 18px rgba(236,240,241,.7);
            }
            #generate-btn-slot {
                background: linear-gradient(45deg,#ffd700,#ffa500) !important;
                border: none !important; color: #2c3e50 !important;
                font-weight: 700; text-transform: uppercase;
                box-shadow: 0 0 10px #ffd700, inset 0 0 5px rgba(255,255,255,.7);
                transition: all .3s ease;
                width: 100%; padding: 10px; border-radius: 8px; cursor: pointer;
                font-size: 1rem;
                display: flex; align-items: center; justify-content: center; gap: 8px;
            }
            #generate-btn-slot:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px #ffd700, 0 0 30px #ffa500, inset 0 0 5px rgba(255,255,255,.8);
            }
            #generate-btn-slot:disabled {
                background: #34495e !important; color: #7f8c8d !important;
                cursor: not-allowed; transform: none; box-shadow: none;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        let reelHTML = '';
        const numbers = '0123456789'.repeat(10);
        for(let i = 0; i < numbers.length; i++) {
            reelHTML += `<div>${numbers[i]}</div>`;
        }
        
        container.innerHTML = `
            <div id="gavan-generator-widget">
                <div class="generator-display-slot">
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                </div>
                <button id="generate-btn-slot">
                    <i class="bi bi-arrow-clockwise"></i> 4D GENERATOR
                </button>
            </div>
        `;

        // ==========================================
        // BAGIAN 3: FUNGSIONALITAS
        // ==========================================
        const generateBtn = document.getElementById('generate-btn-slot');
        const reels = document.querySelectorAll('.digit-reel');
        if (reels.length === 0) return;

        const digitHeight = 50; 
        let isSpinning = false;
        const baseSpinDuration = 1000;
        const extraDelayPerReel = 500;

        reels.forEach(reel => {
            reel.style.transition = 'none';
            const randomNumber = Math.floor(Math.random() * 10);
            const startPosition = -((10 * 5) + randomNumber) * digitHeight;
            reel.style.transform = `translateY(${startPosition}px)`;
        });

        generateBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            if(isSpinning) return;
            isSpinning = true;

            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> MEMUTAR...';
            
            reels.forEach((reel, index) => {
                reel.classList.add('is-spinning');
                setTimeout(() => {
                    const computedStyle = window.getComputedStyle(reel);
                    const matrix = new DOMMatrix(computedStyle.transform);
                    const currentY = matrix.m42;
                    
                    reel.classList.remove('is-spinning');
                    reel.style.transform = `translateY(${currentY}px)`;

                    const randomNumber = Math.floor(Math.random() * 10);
                    const targetPosition = -((10 * 5) + randomNumber) * digitHeight;

                    setTimeout(() => {
                        reel.style.transform = `translateY(${targetPosition}px)`;
                    }, 50);

                }, baseSpinDuration + (index * extraDelayPerReel));
            });

            const totalDuration = baseSpinDuration + ((reels.length - 1) * extraDelayPerReel) + 1200;
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> 4D GENERATOR';
                isSpinning = false;
            }, totalDuration);
        });
        
        console.log('Widget Generator 4D (v7.1 - Strict URL) berhasil dimuat.');
    });
})();
