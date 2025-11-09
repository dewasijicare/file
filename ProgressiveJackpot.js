(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Stabil & LED Look) ---
    const jackpotStylesStableLED = `
        /* CSS untuk Progressive Jackpot - V6 Stabil & LED Look */
        /* Menggunakan font sistem (monospace) untuk stabilitas tampilan digital */
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif, monospace !important; 
            text-align: center;
            position: relative;
            margin-top: 2rem;
            margin-bottom: 2rem;
            z-index: 50;
            padding: 5px; /* Sedikit padding untuk glow */
            box-sizing: border-box;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Container untuk efek border dan glow */
        .jackpot-border-glow {
            position: relative;
            border-radius: 18px;
            padding: 3px; 
            /* Hapus background glow solid agar hanya border yang bersinar */
            background: transparent; 
            box-shadow: 0 0 10px #00eaff;
            overflow: hidden;
        }

        /* Kotak konten utama Jackpot */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; /* Warna latar belakang card tema */
            border: 3px solid #00eaff; /* Border solid tipis untuk struktur */
            border-radius: 15px; 
            min-height: 100px;
            position: relative;
            padding: 15px;
            z-index: 2;
            box-shadow: inset 0 0 10px rgba(0, 119, 255, 0.5); /* Inner shadow */
        }
        
        /* Efek Plasma Flow (Border Bergerak) */
        .jackpot-border-glow::before {
            content: '';
            position: absolute;
            inset: -10px;
            background: conic-gradient(from 0deg, transparent 50%, #00eaff 50%, transparent 100%);
            animation: borderRotate 4s linear infinite;
            z-index: 1;
            opacity: 0.7;
        }
        
        .jackpot-border-glow::after {
            content: '';
            position: absolute;
            inset: -10px;
            background: conic-gradient(from 180deg, transparent 50%, #0077ff 50%, transparent 100%);
            animation: borderRotate 4s linear infinite reverse;
            opacity: 0.6;
            z-index: 1;
        }

        /* Animasi Rotasi Border */
        @keyframes borderRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Judul Jackpot */
        .jackpot-main-title {
            color: #00eaff; 
            font-size: 1rem; /* Ukuran disesuaikan */
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 8px;
            text-shadow: 0 0 10px #00eaff;
            z-index: 3;
        }

        /* Angka Jackpot (Font stabil LED Look) */
        .jackpot-value-plasma {
            font-family: monospace !important; /* Font Monospace universal (Stabil) */
            color: #fff;
            font-size: 2.2rem; /* Ukuran disesuaikan (diperkecil sedikit dari 2.8rem) */
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: 2px;
            text-shadow: 0 0 15px #00eaff, 0 0 8px #fff; /* Shadow biru intens untuk LED glow */
            z-index: 3; 
            white-space: nowrap;
            animation: textGlowLED 1s ease-in-out infinite alternate;
        }

        /* Animasi Text Glow LED */
        @keyframes textGlowLED {
            0% { text-shadow: 0 0 10px #00eaff, 0 0 5px #fff; opacity: 0.95; }
            100% { text-shadow: 0 0 20px #0077ff, 0 0 10px #00eaff; opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .jackpot-value-plasma {
                font-size: 1.8rem;
                letter-spacing: 1.5px;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
        }
        @media (max-width: 480px) {
            .jackpot-value-plasma {
                font-size: 1.5rem;
                letter-spacing: 1px;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesStableLED;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounterPlasma() {
        const element = document.getElementById('dynamic-jackpot-value-plasma');
        if (!element) return;

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

            // Gabungkan "IDR" dan nilai yang sudah diformat
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
    function injectJackpotHTMLPlasma() {
        const targetElement = document.getElementById('row-togel');
        
        // Cek jika elemen Jackpot sudah ada
        if (document.querySelector('.jackpot-container-main')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLPlasma, 100);
            return;
        }

        const jackpotHTMLPlasma = `
            <div class="jackpot-container-main">
                <div class="jackpot-border-glow">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">PROGRESSIVE JACKPOTS</div>
                        <div id="dynamic-jackpot-value-plasma" class="jackpot-value-plasma">32.462.646.763</div>
                    </div>
                </div>
            </div>
        `;

        // Sisipkan HTML tepat SEBELUM elemen #row-togel
        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLPlasma);

        // Setelah elemen disisipkan, segera mulai counter dinamisnya
        startDynamicJackpotCounterPlasma();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLPlasma);
    setInterval(injectJackpotHTMLPlasma, 500);
})();
