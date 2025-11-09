(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Desain Mencolok dengan Angka Besar) ---
    const jackpotStylesBold = `
        /* CSS untuk Progressive Jackpot - Desain Mencolok */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        .progressive-jackpot-wrapper-bold {
            font-family: 'Exo 2', sans-serif !important;
            text-align: center;
            position: relative;
            padding-top: 15px;
            margin-top: 2rem;
            margin-bottom: 2rem;
            z-index: 50;
        }
        .progressive-jackpot-header-bold {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(90deg, #00eaff, #0077ff);
            color: #1a252f; /* Teks gelap di background cerah agar kontras */
            padding: 3px 25px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: bold;
            letter-spacing: 2px;
            box-shadow: 0 0 20px rgba(0, 234, 255, 1); /* Sinar yang lebih kuat */
            border: 2px solid #fff;
            z-index: 10;
            white-space: nowrap;
            text-transform: uppercase;
        }
        .jackpot-display-box-bold {
            display: flex;
            flex-direction: column; /* Angka dan keterangan di stack vertikal */
            justify-content: center;
            align-items: center;
            background: #1a252f; /* Menggunakan warna background card tema (dark blue) */
            border: 3px solid #00eaff; /* Border biru neon */
            border-radius: 15px; 
            padding: 20px 15px;
            min-height: 100px;
            box-shadow: 0 0 30px rgba(0, 234, 255, 0.8), inset 0 0 10px rgba(0, 119, 255, 0.5);
            position: relative;
            overflow: hidden;
        }
        
        /* Efek latar belakang bergerak yang intens */
        .jackpot-display-box-bold::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, #0077ff 0%, #00eaff 25%, #0077ff 50%, #00eaff 75%, #0077ff 100%);
            background-size: 400% 400%;
            opacity: 0.2; /* Menjaga agar teks tetap terbaca */
            animation: gradientShift 10s ease-in-out infinite;
        }

        .jackpot-info-text {
            color: #bdc3c7; /* Warna teks sekunder tema Anda */
            font-size: 0.85rem;
            margin-bottom: 5px;
            letter-spacing: 1px;
            z-index: 2;
        }

        .jackpot-value-bold {
            color: #fff;
            font-size: 3rem; /* **UKURAN ANGKA DIBUAT SANGAT BESAR** */
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: 3px;
            text-shadow: 0 0 18px #fff, 0 0 10px #00eaff, 0 0 5px #0077ff;
            z-index: 2; 
            white-space: nowrap;
        }

        /* Animasi Gradient Latar Belakang */
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .jackpot-value-bold {
                font-size: 2.2rem;
                letter-spacing: 2px;
            }
            .progressive-jackpot-header-bold {
                font-size: 0.8rem;
                padding: 3px 20px;
            }
        }
        @media (max-width: 480px) {
            .jackpot-value-bold {
                font-size: 1.8rem;
                letter-spacing: 1px;
            }
            .jackpot-display-box-bold {
                padding: 15px 10px;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesBold;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounterBold() {
        const element = document.getElementById('dynamic-jackpot-value-bold');
        if (!element) {
            console.warn('Dynamic jackpot bold element not found.');
            return;
        }

        let currentValue = 32462646763; // Nilai awal
        const maxIncrement = 15;
        const updateInterval = 80;
        const resetThreshold = 32462700000; // Batas reset

        function updateJackpotValue() {
            const increment = Math.floor(Math.random() * maxIncrement) + 1;
            currentValue += increment;

            if (currentValue > resetThreshold) {
                currentValue = 32462646763;
            }

            // Gunakan format Rupiah (IDR)
            const formattedValue = 'IDR ' + new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(currentValue);

            element.textContent = formattedValue;
        }

        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML KE LOKASI YANG TEPAT ---
    function injectJackpotHTMLBold() {
        const targetElement = document.getElementById('row-togel');
        
        // Cek jika elemen Jackpot sudah ada
        if (document.querySelector('.progressive-jackpot-wrapper-bold')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLBold, 100);
            return;
        }

        const jackpotHTMLBold = `
            <div class="progressive-jackpot-wrapper-bold">
                <div class="progressive-jackpot-header-bold">
                    WIN BIG! PROGRESSIVE JACKPOTS
                </div>
                <div class="jackpot-display-box-bold">
                    <div class="jackpot-info-text">TOTAL HADIAH SAAT INI</div>
                    <div id="dynamic-jackpot-value-bold" class="jackpot-value-bold">32.462.646.763</div>
                </div>
            </div>
        `;

        // Sisipkan HTML tepat SEBELUM elemen #row-togel
        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLBold);

        // Setelah elemen disisipkan, segera mulai counter dinamisnya
        startDynamicJackpotCounterBold();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLBold);
    setInterval(injectJackpotHTMLBold, 500);
})();
