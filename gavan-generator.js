(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // 1. Cari kontainer yang sudah Anda siapkan di HTML
        const container = document.getElementById('4d-generator-container');
        
        // Jika kontainer tidak ditemukan, hentikan skrip dan berikan pesan di konsol
        if (!container) {
            console.error('Generator Gagal: Elemen <div id="4d-generator-container"></div> tidak ditemukan di halaman.');
            return;
        }

        // 2. Siapkan CSS khusus untuk widget (ringkas dan dengan animasi slot)
        const widgetStyles = `
            #gavan-generator-widget {
                background: linear-gradient(145deg, #2c3e50, #1a252f);
                border: 1px solid #00aaff;
                box-shadow: 0 0 20px rgba(0, 170, 255, .6);
                border-radius: 15px;
                color: #ecf0f1;
                text-align: center;
                padding: 1rem;
                margin: 1.5rem 0;
                font-family: 'Exo 2', sans-serif;
            }
            #gavan-generator-widget h3 {
                color: #FFD700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
                text-transform: uppercase; font-weight: 700;
                margin: 0 0 1rem 0; display: flex; align-items: center; justify-content: center; gap: 10px;
                font-size: 1.1rem;
            }
            .generator-display-slot {
                display: flex; justify-content: center; gap: 8px; margin-bottom: 1.25rem;
                background-color: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border: 1px solid #34495e;
            }
            .digit-container {
                width: 45px; height: 60px; overflow: hidden; border-radius: 5px; background-color: #0c0c1e;
            }
            .digit-reel {
                display: flex; flex-direction: column;
                transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            .digit-reel.spinning {
                 transition: transform 0.2s linear;
            }
            .digit-reel > div {
                width: 45px; height: 60px; line-height: 60px;
                font-size: 2.2rem; font-weight: 700; color: #fff;
                text-shadow: 0 0 6px #fff, 0 0 18px rgba(236,240,241,.7);
            }
            /* Styling untuk Tombol */
            #generate-btn-slot {
                background: linear-gradient(45deg,#ffd700,#ffa500) !important;
                border: none !important;
                color: #2c3e50 !important;
                font-weight: 700;
                text-transform: uppercase;
                box-shadow: 0 0 10px #ffd700, inset 0 0 5px rgba(255,255,255,.7);
                transition: all .3s ease;
                width: 100%;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            }
            #generate-btn-slot:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px #ffd700, 0 0 30px #ffa500, inset 0 0 5px rgba(255,255,255,.8);
            }
            #generate-btn-slot:disabled {
                background: #34495e !important;
                color: #7f8c8d !important;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
        `;

        // 3. Buat elemen <style> dan suntikkan CSS ke dalam <head>
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // 4. Buat HTML untuk widget
        let reelHTML = '';
        const numbers = '0123456789'.repeat(5); // Ulangi angka untuk efek putaran
        for(let i = 0; i < numbers.length; i++) {
            reelHTML += `<div>${numbers[i]}</div>`;
        }
        
        container.innerHTML = `
            <div id="gavan-generator-widget">
                <h3><i class="bi bi-shuffle"></i> 4D Generator</h3>
                <div class="generator-display-slot">
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                    <div class="digit-container"><div class="digit-reel">${reelHTML}</div></div>
                </div>
                <button id="generate-btn-slot">
                    <i class="bi bi-arrow-repeat"></i> Generate Angka
                </button>
            </div>
        `;

        // 5. Tambahkan fungsionalitas ke tombol
        const generateBtn = document.getElementById('generate-btn-slot');
        const reels = document.querySelectorAll('.digit-reel');
        if (reels.length === 0) return;

        const digitHeight = 60; // Tinggi per digit (sesuai CSS)
        let isSpinning = false;

        generateBtn.addEventListener('click', () => {
            if(isSpinning) return;
            isSpinning = true;

            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Memutar...';
            
            reels.forEach((reel, index) => {
                reel.classList.add('spinning');
                // Atur posisi awal ke 0 untuk memulai putaran dari atas
                reel.style.transform = 'translateY(0px)';
                
                // Memicu putaran cepat ke bawah
                setTimeout(() => {
                    reel.style.transform = `translateY(-${reel.scrollHeight - digitHeight}px)`;
                }, 10);

                // Hentikan putaran secara berurutan
                setTimeout(() => {
                    reel.classList.remove('spinning');
                    const randomNumber = Math.floor(Math.random() * 10);
                    // Ambil set angka ke-3 atau ke-4 untuk memastikan posisi tengah
                    const targetPosition = -((10 * 3) + randomNumber) * digitHeight;
                    reel.style.transform = `translateY(${targetPosition}px)`;
                }, 1000 + (index * 500)); // Jeda 500ms antar pemberhentian
            });

            // Aktifkan kembali tombol setelah semua animasi selesai
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Generate Angka';
                isSpinning = false;
            }, 1000 + (reels.length * 500));
        });
        
        console.log('Widget Generator 4D berhasil dimuat.');
    });
})();
