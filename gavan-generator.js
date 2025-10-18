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
        
        // 4. Siapkan CSS khusus untuk widget (dengan ukuran lebih kecil)
        const widgetStyles = `
            /* [UKURAN] Mengurangi margin dan padding utama */
            #gavan-generator-widget {
                background: linear-gradient(145deg, #2c3e50, #1a252f);
                border: 1px solid #00aaff;
                box-shadow: 0 0 20px rgba(0, 170, 255, .6);
                border-radius: 15px;
                color: #ecf0f1;
                text-align: center;
                padding: 0.75rem;
                margin: 1.5rem auto;
                font-family: 'Exo 2', sans-serif;
                max-width: 400px;
            }
            /* [UKURAN] Mengurangi margin bawah judul */
            #gavan-generator-widget h3 {
                color: #FFD700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
                text-transform: uppercase; font-weight: 700;
                margin: 0 0 0.75rem 0; 
                display: flex; align-items: center; justify-content: center; gap: 10px;
                font-size: 1.1rem;
            }
            /* [UKURAN] Mengurangi margin bawah dan padding display angka */
            .generator-display-slot {
                display: flex; justify-content: center; gap: 8px; margin-bottom: 1rem;
                background-color: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; border: 1px solid #34495e;
            }
            /* [UKURAN] Mengurangi tinggi kontainer angka */
            .digit-container {
                width: 45px; height: 50px; overflow: hidden; border-radius: 5px; background-color: #0c0c1e;
            }
            .digit-reel {
                display: flex; flex-direction: column;
                /* [ANIMASI] Transisi untuk efek berhenti yang 'bounce' */
                transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            /* [ANIMASI] Transisi untuk putaran cepat & linear */
            .digit-reel.spinning {
                 transition: transform 0.15s linear;
            }
            /* [UKURAN] Menyesuaikan tinggi, line-height, dan font-size angka */
            .digit-reel > div {
                width: 45px; height: 50px; line-height: 50px;
                font-size: 2rem; font-weight: 700; color: #fff;
                text-shadow: 0 0 6px #fff, 0 0 18px rgba(236,240,241,.7);
            }
            /* [UKURAN] Mengurangi padding tombol */
            #generate-btn-slot {
                background: linear-gradient(45deg,#ffd700,#ffa500) !important;
                border: none !important; color: #2c3e50 !important;
                font-weight: 700; text-transform: uppercase;
                box-shadow: 0 0 10px #ffd700, inset 0 0 5px rgba(255,255,255,.7);
                transition: all .3s ease;
                width: 100%; padding: 8px; border-radius: 5px; cursor: pointer;
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

        // 5. Buat elemen <style> dan suntikkan CSS ke dalam <head>
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // 6. Buat HTML untuk widget di dalam kontainer yang sudah dibuat
        let reelHTML = '';
        const numbers = '0123456789'.repeat(5);
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

        // 7. Tambahkan fungsionalitas ke tombol
        const generateBtn = document.getElementById('generate-btn-slot');
        const reels = document.querySelectorAll('.digit-reel');
        if (reels.length === 0) return;

        // [UKURAN] Sesuaikan tinggi digit sesuai CSS
        const digitHeight = 50; 
        let isSpinning = false;

        // [ANIMASI] Inisialisasi posisi awal reel ke posisi acak agar tidak statis
        reels.forEach(reel => {
            reel.style.transition = 'none'; // Hapus transisi untuk pengaturan awal
            const randomNumber = Math.floor(Math.random() * 10);
            const startPosition = -((10 * 2) + randomNumber) * digitHeight; // Ambil posisi dari set angka ke-2
            reel.style.transform = `translateY(${startPosition}px)`;
        });

        generateBtn.addEventListener('click', () => {
            if(isSpinning) return;
            isSpinning = true;

            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Memutar...';
            
            reels.forEach((reel, index) => {
                // [ANIMASI] Logika baru untuk putaran langsung
                // 1. Hapus transisi 'bounce' agar bisa langsung di-reset posisinya tanpa terlihat
                reel.style.transition = 'none';
                
                // Ambil posisi saat ini dan reset ke blok angka sebelumnya untuk memberikan ruang putar
                const currentTransform = reel.style.transform || 'translateY(0px)';
                const currentY = parseInt(currentTransform.replace(/[^0-9-]/g, ''), 10);
                const resetPosition = currentY % (10 * digitHeight); // Reset ke blok angka pertama
                reel.style.transform = `translateY(${resetPosition}px)`;

                // 2. Paksa browser menggambar ulang posisi baru ini
                // lalu aktifkan kembali transisi putaran cepat
                setTimeout(() => {
                    reel.classList.add('spinning');
                    reel.style.transition = ''; // Biarkan kelas CSS yang mengatur transisi

                    // 3. Tentukan tujuan putaran (beberapa blok ke bawah)
                    const spinDestination = resetPosition - (30 * digitHeight); // Putar sejauh 3 blok angka
                    reel.style.transform = `translateY(${spinDestination}px)`;
                }, 20); // Jeda sangat singkat

                // 4. Hentikan putaran di angka acak secara berurutan
                setTimeout(() => {
                    reel.classList.remove('spinning');
                    const randomNumber = Math.floor(Math.random() * 10);
                    // Ambil dari set angka ke-3 (30) atau ke-4 (40) untuk posisi tengah
                    const targetPosition = -((10 * 3) + randomNumber) * digitHeight;
                    reel.style.transform = `translateY(${targetPosition}px)`;
                }, 1000 + (index * 500));
            });

            // Aktifkan kembali tombol setelah semua animasi selesai
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Generate Angka';
                isSpinning = false;
            }, 1000 + (reels.length * 500));
        });
        
        console.log('Widget Generator 4D (v2) berhasil dimuat dan ditempatkan.');
    });
})();
