(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Gaya LED Digital) ---
    const jackpotStylesLED = `
        /* CSS untuk Progressive Jackpot - Gaya LED Digital */
        @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Exo+2:wght@700;900&display=swap');
        
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important;
            text-align: center;
            position: relative;
            margin-top: 2rem;
            margin-bottom: 2rem;
            z-index: 50;
            padding: 10px; 
            box-sizing: border-box;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Container untuk efek border */
        .jackpot-border-glow {
            position: relative;
            border-radius: 18px;
            padding: 3px; 
            background: linear-gradient(45deg, #0077ff, #00eaff);
            box-shadow: 0 0 15px #00eaff;
            overflow: hidden;
        }

        /* Kotak konten utama Jackpot */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; 
            border-radius: 15px; 
            min-height: 100px;
            position: relative;
            padding: 15px;
            z-index: 2;
        }

        /* Efek Plasma Flow (Border Bergerak) */
        .jackpot-border-glow::before {
            content: '';
            position: absolute;
            inset: -10px;
            background: conic-gradient(from 0deg, transparent, #00eaff, transparent, transparent);
            animation: borderRotate 4s linear infinite;
            z-index: 1;
        }
        
        /* Lapisan kedua (optional) untuk membuat efek lebih tebal */
        .jackpot-border-glow::after {
            content: '';
            position: absolute;
            inset: -10px;
            background: conic-gradient(from 180deg, transparent, #0077ff, transparent, transparent);
            animation: borderRotate 4s linear infinite reverse;
            opacity: 0.8;
            z-index: 1;
        }

        /* Animasi Rotasi Border */
        @keyframes borderRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Header / Judul Utama */
        .jackpot-main-title {
            color: #00eaff; 
            font-size: 1.1rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 5px;
            text-shadow: 0 0 10px #00eaff;
            z-index: 3;
        }

        /* Angka Jackpot (Menggunakan font LED) */
        .jackpot-value-plasma {
            font-family: 'Major Mono Display', monospace !important; /* Font LED/Digital */
            color: #fff;
            font-size: 2.8rem; /* Sedikit diperkecil dari 3.2rem */
            font-weight: 400; /* Font digital biasanya lebih tipis */
            line-height: 1.1;
            letter-spacing: 4px; /* Lebih lebar untuk efek digital */
            text-shadow: 0 0 20px #00eaff, 0 0 10px #fff; /* Shadow biru intens untuk LED glow */
            z-index: 3; 
            white-space: nowrap;
            animation: textGlowLED 1s ease-in-out infinite alternate;
        }

        /* Animasi Text Glow Khusus LED (lebih cepat dan berkedip) */
        @keyframes textGlowLED {
            0% { text-shadow: 0 0 15px #00eaff, 0 0 8px #fff; opacity: 0.95; }
            100% { text-shadow: 0 0 25px #0077ff, 0 0 12px #00eaff; opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .jackpot-value-plasma {
                font-size: 2rem;
                letter-spacing: 3px;
            }
            .jackpot-main-title {
                font-size: 1rem;
            }
        }
        @media (max-width: 480px) {
            .jackpot-value-plasma {
                font-size: 1.6rem;
                letter-spacing: 2px;
            }
            .jackpot-display-box-content {
                padding: 15px 10px;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesLED;
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
