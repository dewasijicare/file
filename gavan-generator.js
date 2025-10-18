(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // 1. Temukan kartu login sebagai titik referensi
        const loginCard = document.querySelector('form[action="/login"]')?.closest('.card.shadow');
        
        // Jika kartu login tidak ditemukan, hentikan skrip
        if (!loginCard) {
            console.error('Login card not found. Generator widget cannot be placed.');
            return;
        }

        // 2. Siapkan CSS untuk widget (menggunakan gaya Gavan Theme)
        const widgetStyles = `
            #gavan-generator-widget {
                background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
                border: 1px solid #00aaff !important;
                box-shadow: 0 0 20px rgba(0, 170, 255, .6) !important;
                border-radius: 15px !important;
                color: #ecf0f1;
                text-align: center;
            }
            #gavan-generator-widget h3 {
                color: #FFD700 !important;
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
                text-transform: uppercase;
                font-weight: 700;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .generator-display {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 1.5rem;
            }
            .generator-display span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 65px;
                background-color: rgba(0,0,0,0.3);
                border-radius: 8px;
                border: 1px solid #34495e;
                font-size: 2.5rem;
                font-weight: 700;
                color: #fff;
                text-shadow: 0 0 6px #fff, 0 0 18px rgba(236,240,241,.7);
                font-family: 'Exo 2', sans-serif;
            }
            @keyframes number-flicker {
                0% { opacity: 0.5; transform: translateY(-10px); }
                50% { opacity: 1; transform: translateY(5px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .generator-display span.flicker {
                animation: number-flicker 0.3s ease-in-out;
            }
        `;

        // 3. Buat elemen <style> dan suntikkan CSS ke dalam <head>
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // 4. Buat HTML untuk widget
        const widgetElement = document.createElement('div');
        widgetElement.id = 'gavan-generator-widget';
        widgetElement.className = 'card p-3 my-3 shadow';
        widgetElement.innerHTML = `
            <h3><i class="bi bi-shuffle"></i> 4D Generator</h3>
            <div class="generator-display">
                <span>0</span><span>0</span><span>0</span><span>0</span>
            </div>
            <button id="generate-btn" class="btn btn-secondary w-100">
                <i class="bi bi-arrow-repeat"></i> Generate Angka
            </button>
        `;

        // 5. Tempatkan widget di bawah kartu login
        loginCard.parentElement.appendChild(widgetElement);

        // 6. Tambahkan fungsionalitas ke tombol
        const generateBtn = document.getElementById('generate-btn');
        const numberSpans = document.querySelectorAll('.generator-display span');

        generateBtn.addEventListener('click', () => {
            numberSpans.forEach((span, index) => {
                // Tambahkan animasi flicker
                span.classList.add('flicker');
                
                // Ganti angka setelah sedikit jeda agar animasi terlihat
                setTimeout(() => {
                    const randomNumber = Math.floor(Math.random() * 10);
                    span.textContent = randomNumber;
                }, index * 50); // jeda kecil antar digit

                // Hapus kelas animasi setelah selesai agar bisa diulang
                span.addEventListener('animationend', () => {
                    span.classList.remove('flicker');
                }, { once: true });
            });
        });
    });
})();