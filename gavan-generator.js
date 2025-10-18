(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // 1. Cari elemen jangkar yang ada di halaman (form login)
        const loginForm = document.querySelector('form input[name*="userName"]')?.closest('form') || document.querySelector('form input[name*="password"]')?.closest('form');

        // Jika form login tidak ditemukan, hentikan skrip
        if (!loginForm) {
            console.error('Generator Gagal: Form login tidak ditemukan sebagai titik penempatan.');
            return;
        }

        // 2. Buat elemen kontainer secara dinamis dengan JavaScript
        const container = document.createElement('div');
        container.id = '4d-generator-container';

        // 3. Tempatkan kontainer yang baru dibuat ini di bawah form login
        loginForm.parentElement.insertBefore(container, loginForm.nextSibling);
        
        // 4. Siapkan CSS khusus untuk widget (desain baru yang lebih ringkas)
        const widgetStyles = `
            #gavan-generator-widget {
                background: linear-gradient(145deg, #2c3e50, #1a252f);
                border: 1px solid #00aaff;
                box-shadow: 0 0 20px rgba(0, 170, 255, .6);
                border-radius: 15px;
                color: #ecf0f1;
                text-align: center;
                padding: 0.75rem;
                margin: 1rem auto; /* Margin atas bawah diperkecil */
                font-family: 'Exo 2', sans-serif;
                max-width: 400px;
            }
            .generator-display-slot {
                display: flex; justify-content: center; gap: 8px; margin-bottom: 0.75rem; /* Margin bawah display diperkecil */
                background-color: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; border: 1px solid #34495e;
            }
            .digit-container {
                width: 45px; height: 50px; overflow: hidden; border-radius: 5px; background-color: #0c0c1e;
            }
            .digit-reel {
                display: flex; flex-direction: column;
                transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            .digit-reel.spinning {
                 transition: transform 1s linear;
            }
            .digit-reel > div {
                width: 45px; height: 50px; line-height: 50px;
                font-size: 2rem; font-weight: 700; color: #fff;
                text-shadow: 0 0 6px #fff, 0 0 18px rgba(236,240,241,.7);
            }
            /* [DESAIN BARU] Tombol yang berfungsi sebagai judul */
            #generate-btn-slot {
                background: linear-gradient(45deg,#ffd700,#ffa500) !important;
                border: none !important; color: #2c3e50 !important;
                font-weight: 700; text-transform: uppercase;
                box-shadow: 0 0 10px #ffd700, inset 0 0 5px rgba(255,255,255,.7);
                transition: all .3s ease;
                width: 100%; padding: 10px; border-radius: 8px; cursor: pointer;
                font-size: 1rem; /* Ukuran font agar teks terlihat jelas */
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
            /* [DESAIN BARU] Mengatur ukuran ikon di dalam tombol */
            #generate-btn-slot i.bi {
                font-size: 1.1rem;
                font-weight: bold !important; /* Membuat ikon terlihat lebih tebal */
            }
        `;

        // 5. Buat elemen <style> dan suntikkan CSS ke dalam <head>
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // 6. Buat HTML untuk widget (tanpa judul H3)
        let reelHTML = '';
        const numbers = '0123456789'.repeat(10); // Perbanyak angka untuk putaran lebih lama
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
        const baseSpinDuration = 1000; // Durasi putaran dasar sebelum reel pertama berhenti
        const extraDelayPerReel = 500; // Jeda tambahan untuk setiap reel berikutnya

        // Inisialisasi posisi awal reel ke posisi acak
        reels.forEach(reel => {
            reel.style.transition = 'none';
            const randomNumber = Math.floor(Math.random() * 10);
            const startPosition = -((10 * 5) + randomNumber) * digitHeight;
            reel.style.transform = `translateY(${startPosition}px)`;
            setTimeout(() => { reel.style.transition = ''; }, 100);
        });

        generateBtn.addEventListener('click', () => {
            if(isSpinning) return;
            isSpinning = true;

            // [DESAIN BARU] Ubah teks tombol saat berputar
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> MEMUTAR...';
            
            reels.forEach((reel, index) => {
                // [ANIMASI MULUS] Logika baru yang sepenuhnya independen
                reel.classList.add('spinning');
                
                // Tentukan tujuan putaran yang jauh di bawah
                const spinAmount = 80 + Math.floor(Math.random() * 10);
                const spinDestination = -(spinAmount * digitHeight);
                reel.style.transform = `translateY(${spinDestination}px)`;

                // Atur waktu berhenti yang unik untuk setiap reel
                setTimeout(() => {
                    reel.classList.remove('spinning');
                    const randomNumber = Math.floor(Math.random() * 10);
                    const targetPosition = -((10 * 5) + randomNumber) * digitHeight;
                    reel.style.transform = `translateY(${targetPosition}px)`;
                }, baseSpinDuration + (index * extraDelayPerReel));
            });

            // Aktifkan kembali tombol setelah semua animasi selesai
            const totalDuration = baseSpinDuration + ((reels.length - 1) * extraDelayPerReel) + 1200; // Tambah 1.2s untuk durasi animasi 'bounce'
            setTimeout(() => {
                generateBtn.disabled = false;
                // [DESAIN BARU] Kembalikan teks dan ikon tombol ke semula
                generateBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> 4D GENERATOR';
                isSpinning = false;
            }, totalDuration);
        });
        
        console.log('Widget Generator 4D (v4 - Desain Baru) berhasil dimuat.');
    });
})();
