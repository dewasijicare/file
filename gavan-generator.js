(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // 1. [DIPERBARUI] Cari elemen jangkar yang baru (Widget Pintas Domain)
        const anchorElement = document.getElementById('pintas-widget-wrapper');

        // Jika elemen target tidak ditemukan, hentikan skrip agar tidak error
        if (!anchorElement) {
            console.error('Generator Gagal: Widget PintasDomain (#pintas-widget-wrapper) tidak ditemukan sebagai titik penempatan.');
            return;
        }

        // 2. Buat elemen kontainer secara dinamis dengan JavaScript
        const container = document.createElement('div');
        container.id = '4d-generator-container';

        // 3. [DIPERBARUI] Tempatkan kontainer di bawah widget Pintas Domain
        // Logika: Masukkan ke parent dari anchor, tepat sebelum elemen setelah anchor (efektifnya: di bawah anchor)
        anchorElement.parentElement.insertBefore(container, anchorElement.nextSibling);
        
        // 4. Siapkan CSS khusus untuk widget (dengan animasi @keyframes)
        const widgetStyles = `
            /* [ANIMASI FINAL] Definisikan animasi putaran yang mulus */
            @keyframes spinReel {
                from {
                    transform: translateY(0);
                }
                to {
                    /* Putar sejauh 10 blok angka (5000px) */
                    transform: translateY(-500px); 
                }
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
                /* Transisi ini HANYA untuk efek berhenti 'bounce' */
                transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            /* [ANIMASI FINAL] Gunakan @keyframes saat berputar */
            .digit-reel.is-spinning {
                /* Durasi 0.5 detik per putaran penuh, berulang tak terbatas */
                animation: spinReel 0.5s linear infinite;
                transition: none; /* Matikan transisi 'bounce' saat berputar */
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
            #generate-btn-slot i.bi {
                font-size: 1.1rem;
                font-weight: bold !important;
            }
        `;

        // 5. Buat elemen <style> dan suntikkan CSS ke dalam <head>
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // 6. Buat HTML untuk widget
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

        // 7. Tambahkan fungsionalitas ke tombol
        const generateBtn = document.getElementById('generate-btn-slot');
        const reels = document.querySelectorAll('.digit-reel');
        if (reels.length === 0) return;

        const digitHeight = 50; 
        let isSpinning = false;
        const baseSpinDuration = 1000;
        const extraDelayPerReel = 500;

        // Inisialisasi posisi awal reel ke posisi acak
        reels.forEach(reel => {
            reel.style.transition = 'none';
            const randomNumber = Math.floor(Math.random() * 10);
            const startPosition = -((10 * 5) + randomNumber) * digitHeight;
            reel.style.transform = `translateY(${startPosition}px)`;
        });

        generateBtn.addEventListener('click', () => {
            if(isSpinning) return;
            isSpinning = true;

            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> MEMUTAR...';
            
            reels.forEach((reel, index) => {
                // [ANIMASI FINAL] Logika baru dengan @keyframes
                // 1. Mulai animasi putaran tak terbatas yang mulus
                reel.classList.add('is-spinning');

                // 2. Atur waktu berhenti yang unik untuk setiap reel
                setTimeout(() => {
                    // Ambil posisi visual reel saat ini
                    const computedStyle = window.getComputedStyle(reel);
                    const matrix = new DOMMatrix(computedStyle.transform);
                    const currentY = matrix.m42;
                    
                    // Hentikan animasi @keyframes
                    reel.classList.remove('is-spinning');
                    
                    // Tahan posisi visual saat ini agar tidak melompat
                    reel.style.transform = `translateY(${currentY}px)`;

                    // Hitung angka acak dan posisi akhir
                    const randomNumber = Math.floor(Math.random() * 10);
                    const targetPosition = -((10 * 5) + randomNumber) * digitHeight;

                    // Beri jeda sangat singkat agar browser bisa memproses,
                    // lalu perintahkan untuk berhenti dengan transisi 'bounce'
                    setTimeout(() => {
                        reel.style.transform = `translateY(${targetPosition}px)`;
                    }, 50);

                }, baseSpinDuration + (index * extraDelayPerReel));
            });

            // Aktifkan kembali tombol setelah semua animasi selesai
            const totalDuration = baseSpinDuration + ((reels.length - 1) * extraDelayPerReel) + 1200;
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> 4D GENERATOR';
                isSpinning = false;
            }, totalDuration);
        });
        
        console.log('Widget Generator 4D (Posisi: Bawah PintasDomain) berhasil dimuat.');
    });
})();
