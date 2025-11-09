(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (V20 - Font Aldrich) ---
    const jackpotStylesV20 = `
        /* CSS untuk Progressive Jackpot - V20 Font Digital 'Aldrich' */
        /* --- PERUBAHAN: Menambahkan font 'Aldrich' --- */
        @import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Exo+2:wght@700;900&display=swap');
        
        :root {
            --neon-blue: #00eaff;
            --neon-blue-dark: #0077ff;
            --dark-bg: #1a252f;
        }

        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            z-index: 50;
            padding: 0; 
            box-sizing: border-box;
            max-width: 650px; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Border Animasi (Denyutan Biru Neon) */
        .jackpot-animated-border {
            position: relative;
            border-radius: 12px;
            padding: 4px; /* Ketebalan border */
            
            background: var(--dark-bg);
            border: 2px solid var(--neon-blue);
            
            animation: borderPulseBlue 2s ease-in-out infinite alternate;
        }

        @keyframes borderPulseBlue {
            0% { 
                box-shadow: 0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue), inset 0 0 3px var(--neon-blue);
            }
            100% { 
                box-shadow: 0 0 15px var(--neon-blue), 0 0 25px var(--neon-blue-dark), inset 0 0 8px var(--neon-blue);
            }
        }

        /* Kotak konten utama Jackpot (Panel LED) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background-color: var(--dark-bg); 
            border-radius: 8px; 
            min-height: 80px;
            position: relative;
            padding: 10px 15px; 
            z-index: 2;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.5);

            /* Background Dot-Matrix (Efek Panel LED) */
            background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.7) 1px, transparent 0);
            background-size: 3px 3px;
        }
        
        /* Judul Jackpot */
        .jackpot-main-title {
            color: #fff; 
            font-size: 1.1rem;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Ikon Trophy (Warna Biru Neon) */
        .jackpot-main-title i {
            font-size: 1.1rem;
            margin-right: 10px;
            color: var(--neon-blue); 
            text-shadow: 0 0 10px var(--neon-blue);
        }

        /* Teks Judul yang Berjalan (Biru dan Putih) */
        .jackpot-animated-text {
            background: linear-gradient(90deg, #fff, var(--neon-blue), #fff);
            background-size: 300% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: textFlow 3s linear infinite;
        }

        @keyframes textFlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
        }

        /* --- PERUBAHAN HANYA DI BAGIAN INI --- */
        .jackpot-value-final {
            font-family: 'Aldrich', sans-serif !important; /* Font 'Aldrich' yang baru */
            color: #fff; 
            font-size: 2.4rem; /* Ukuran disesuaikan untuk font baru */
            font-weight: 400; /* Font ini hanya punya 1 ketebalan */
            line-height: 1.1;
            letter-spacing: 2px; 
            
            /* Efek Glow disesuaikan untuk font yang lebih bersih */
            text-shadow: 
                0 0 5px #fff,
                0 0 15px var(--neon-blue), 
                0 0 25px var(--neon-blue); 
            
            white-space: nowrap;
            animation: textGlowLED 1.5s ease-in-out infinite alternate;
        }
        /* --- AKHIR PERUBAHAN --- */

        @keyframes textGlowLED {
            0% { opacity: 0.95; }
            100% { opacity: 1; }
        }

        /* Responsive Desktop */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 2.8rem; /* Ukuran desktop disesuaikan */
                letter-spacing: 3px;
            }
            .jackpot-container-main {
                max-width: 700px; 
            }
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
            .jackpot-value-final {
                font-size: 6vw; /* Menggunakan VW agar pas */
                letter-spacing: 0.5vw;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesV20;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS (Tidak Berubah) ---
    function startDynamicJackpotCounterFinal() {
        const element = document.getElementById('dynamic-jackpot-value-final');
        if (!element) return;

        let currentValue = 32462646763;
        const maxIncrement = 15;
        const updateInterval = 80;
        const resetThreshold = 32462700000;

        function updateJackpotValue() {
            const increment = Math.floor(Math.random() * maxIncrement) + 1;
            currentValue += increment;

            if (currentValue > resetThreshold) {
                currentValue = 32462646763;
            }

            let formattedNumber = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            element.textContent = 'IDR ' + formattedNumber;
        }

        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML (Tidak Berubah) ---
    function injectJackpotHTMLFinal() {
        const targetElement = document.getElementById('row-togel');
        
        if (document.querySelector('.jackpot-container-main')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLFinal, 200);
            return;
        }

        const jackpotHTMLFinal = `
            <div class="jackpot-container-main">
                <div class="jackpot-animated-border">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">
                            <i class="bi bi-trophy-fill"></i>
                            <span class="jackpot-animated-text">PROGRESSIVE JACKPOTS</span>
                        </div>
                        <div id="dynamic-jackpot-value-final" class="jackpot-value-final">IDR 32.462.646.763</div>
                    </div>
                </div>
            </div>
        `;

        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);
        startDynamicJackpotCounterFinal();
    }

    // --- 4. EKSEKUSI (Tidak Berubah) ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
})();
