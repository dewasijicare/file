(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Flowing Energy) ---
    const jackpotStylesV13 = `
        /* CSS untuk Progressive Jackpot - V13 Flowing Energy */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        
        /* Mendefinisikan warna neon utama */
        :root {
            --neon-blue: #00eaff;
            --neon-green: #2ecc71;
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

        /* Border Animasi (Flowing Energy) */
        .jackpot-animated-border {
            position: relative;
            border-radius: 12px;
            padding: 4px; /* Ketebalan border */
            
            /* Background gradien yang akan kita animasikan */
            background: linear-gradient(90deg, var(--neon-blue), var(--neon-green), var(--neon-blue));
            background-size: 300% 100%;
            
            /* Animasi aliran border */
            animation: borderFlow 4s ease-in-out infinite alternate;
            
            /* Outer glow */
            box-shadow: 0 0 15px var(--neon-blue), 0 0 25px var(--neon-blue);
        }

        @keyframes borderFlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }

        /* Kotak konten utama Jackpot (Panel LED) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: var(--dark-bg); 
            border-radius: 8px; /* Lebih kotak agar pas di dalam frame */
            min-height: 80px;
            position: relative;
            padding: 10px 15px; 
            z-index: 2;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
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

        /* Ikon Trophy */
        .jackpot-main-title i {
            font-size: 1.1rem;
            margin-right: 10px;
            color: var(--neon-green); /* Warna ikon hijau neon */
            text-shadow: 0 0 10px var(--neon-green);
        }

        /* Teks Judul yang Berjalan (Warna-warni) */
        .jackpot-animated-text {
            background: linear-gradient(90deg, #fff, var(--neon-blue), var(--neon-green), #fff);
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

        /* Angka Jackpot (Font Monospace Stabil) */
        .jackpot-value-final {
            font-family: monospace !important; 
            color: #fff;
            font-size: 2.2rem; 
            font-weight: bold;
            line-height: 1.1;
            letter-spacing: 2px;
            /* Shadow yang sangat tajam untuk efek LED */
            text-shadow: 
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px var(--neon-blue),
                0 0 25px var(--neon-blue);
            white-space: nowrap;
        }

        /* Responsive Desktop */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 2.6rem; 
                letter-spacing: 3px;
            }
            .jackpot-container-main {
                max-width: 700px; 
            }
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
            .jackpot-value-final {
                font-size: 5.5vw; 
                letter-spacing: 0.5vw;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesV13;
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

            // Format manual menggunakan regex (paling stabil)
            let formattedNumber = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            // Tambahkan "IDR " ke depan
            element.textContent = 'IDR ' + formattedNumber;
        }

        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML KE LOKASI YANG TEPAT ---
    function injectJackpotHTMLFinal() {
        const targetElement = document.getElementById('row-togel');
        
        // Cek jika elemen Jackpot sudah ada
        if (document.querySelector('.jackpot-container-main')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLFinal, 100);
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

        // Sisipkan HTML tepat SEBELUM elemen #row-togel
        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);

        startDynamicJackpotCounterFinal();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
    setInterval(injectJackpotHTMLFinal, 500);
})();
