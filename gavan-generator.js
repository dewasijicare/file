(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // ==========================================
        // BAGIAN 1: LOGIKA PENEMPATAN CERDAS
        // ==========================================
        
        let anchorElement = null;
        let placementMethod = 'after'; // default: sisipkan setelah elemen

        // Cek 1: Apakah ada widget PintasDomain? (Biasanya di Home)
        const pintasWidget = document.getElementById('pintas-widget-wrapper');
        
        // Cek 2: Apakah ada Form Login/Daftar? (Biasanya di /login atau /register)
        // Kita cari form yang punya input username, password, atau form apa saja
        const formWidget = document.querySelector('form input[name*="userName"]')?.closest('form') || 
                           document.querySelector('form input[name*="password"]')?.closest('form') ||
                           document.querySelector('form');

        // LOGIKA PEMILIHAN POSISI:
        if (pintasWidget) {
            // Jika ada di Home (ada pintas domain), tempel di situ
            anchorElement = pintasWidget;
            console.log('Generator: Target ditemukan di Widget Pintas Domain.');
        } else if (formWidget) {
            // Jika TIDAK ada pintas domain, tapi ada FORM (Halaman Login/Daftar), tempel di situ
            anchorElement = formWidget;
            console.log('Generator: Target ditemukan di Form Login/Daftar.');
        } else {
            // Jika tidak ada keduanya
            console.error('Generator Gagal: Tidak menemukan Widget Pintas maupun Form Login.');
            return;
        }

        // ==========================================
        // BAGIAN 2: PEMBUATAN WIDGET
        // ==========================================

        // Buat elemen kontainer
        const container = document.createElement('div');
        container.id = '4d-generator-container';

        // Sisipkan elemen (Insert After Logic)
        if (anchorElement.nextSibling) {
            anchorElement.parentElement.insertBefore(container, anchorElement.nextSibling);
        } else {
            anchorElement.parentElement.appendChild(container);
        }
        
        // Siapkan CSS
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
                width: 100%; /* Pastikan responsif di dalam form */
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

        // Buat HTML
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
            e.preventDefault(); // Mencegah form submit jika tombol berada di dalam tag <form>
            
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
        
        console.log('Widget Generator 4D (v6 - Multi Page Support) berhasil dimuat.');
    });
})();
