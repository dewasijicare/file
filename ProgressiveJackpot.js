(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Hyper-Responsive & LED Look Final) ---
    const jackpotStylesV8 = `
        /* CSS untuk Progressive Jackpot - V8 Stabil & Dominan */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            z-index: 50;
            padding: 5px;
            box-sizing: border-box;
            /* Lebar Maksimal untuk Desktop */
            max-width: 90%; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Container untuk efek border dan glow */
        .jackpot-border-glow {
            position: relative;
            border-radius: 18px;
            padding: 3px; 
            box-shadow: 0 0 10px #00eaff;
            overflow: hidden;
            transition: box-shadow 0.3s ease-in-out;
            cursor: pointer;
        }
        /* Efek Hover/Sentuh */
        .jackpot-border-glow:hover {
            box-shadow: 0 0 25px #00eaff, 0 0 40px #0077ff; 
        }


        /* Kotak konten utama Jackpot */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; 
            border: 3px solid #00eaff; 
            border-radius: 15px; 
            min-height: 90px;
            position: relative;
            padding: 10px 10px; /* Padding seragam */
            z-index: 2;
            box-shadow: inset 0 0 15px rgba(0, 119, 255, 0.4); 
        }

        /* Garis Horizontal Tipis untuk efek Panel Digital */
        .jackpot-display-box-content::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 5%;
            right: 5%;
            height: 1px;
            background: rgba(0, 234, 255, 0.2);
            transform: translateY(-50%);
        }
        
        /* Efek Plasma Flow (Border Bergerak) - Ditinggalkan untuk fokus pada kestabilan glow box-shadow */


        /* Judul Jackpot */
        .jackpot-main-title {
            color: #00eaff; 
            font-size: 1rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 5px;
            text-shadow: 0 0 10px #00eaff;
            z-index: 3;
            white-space: nowrap;
        }

        /* Angka Jackpot (Font stabil Monospace) */
        .jackpot-value-final {
            font-family: monospace !important; 
            color: #fff;
            /* Font size menggunakan vw untuk otomatis responsif dan menghindari overflow */
            font-size: 3.5vw; 
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: 0.5vw; /* Spasi antar huruf responsif */
            text-shadow: 0 0 15px #00eaff, 0 0 8px #fff; 
            z-index: 3; 
            white-space: nowrap;
            animation: textGlowLED 1s ease-in-out infinite alternate;
        }

        /* Animasi Text Glow LED */
        @keyframes textGlowLED {
            0% { text-shadow: 0 0 10px #00eaff, 0 0 5px #fff; opacity: 0.98; }
            100% { text-shadow: 0 0 20px #0077ff, 0 0 10px #00eaff; opacity: 1; }
        }

        /* Responsive Desktop: Overwrite VW units untuk ukuran stabil yang besar */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 2.5rem; /* Ukuran besar yang stabil di desktop */
                letter-spacing: 2px;
            }
            .jackpot-container-main {
                max-width: 700px; /* Lebar maksimal lebih besar */
            }
        }

        /* Responsive Mobile: Batasi ukuran font agar tidak overflow */
        @media (max-width: 768px) {
            .jackpot-value-final {
                font-size: 5vw; /* Ukuran font lebih kecil di mobile */
                letter-spacing: 0.2vw;
            }
            .jackpot-container-main {
                padding: 0;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesV8;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounterFinal() {
        const element = document.getElementById('dynamic-jackpot-value-final');
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
    function injectJackpotHTMLFinal() {
        const targetElement = document.getElementById('row-togel');
        
        if (document.querySelector('.jackpot-container-main')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLFinal, 100);
            return;
        }

        const jackpotHTMLFinal = `
            <div class="jackpot-container-main">
                <div class="jackpot-border-glow">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">PROGRESSIVE JACKPOTS</div>
                        <div id="dynamic-jackpot-value-final" class="jackpot-value-final">32.462.646.763</div>
                    </div>
                </div>
            </div>
        `;

        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);

        startDynamicJackpotCounterFinal();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
    setInterval(injectJackpotHTMLFinal, 500);
})();
