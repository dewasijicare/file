(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Digital Scoreboard & Ultra Stabil) ---
    const jackpotStylesScoreboard = `
        /* CSS untuk Progressive Jackpot - V10 Digital Scoreboard */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            z-index: 50;
            padding: 0; 
            box-sizing: border-box;
            /* Lebar Kontainer Maksimal */
            max-width: 650px; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Container Neon (Border & Pulsating) */
        .jackpot-neon-pulsate {
            position: relative;
            border-radius: 12px;
            /* Box Shadow untuk efek cahaya Neon di sekitar border */
            box-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff, inset 0 0 5px #00eaff;
            overflow: hidden;
            border: 2px solid #00eaff;
            animation: neonPulse 1.5s ease-in-out infinite alternate;
        }

        /* Animasi Denyutan Neon */
        @keyframes neonPulse {
            0% {
                box-shadow: 0 0 8px #00eaff, 0 0 15px #00eaff, inset 0 0 4px #00eaff;
            }
            100% {
                box-shadow: 0 0 15px #0077ff, 0 0 30px #00eaff, inset 0 0 8px #00eaff;
            }
        }

        /* Kotak konten utama Jackpot (Panel LED) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; 
            border-radius: 10px; 
            min-height: 80px; /* Tinggi disesuaikan */
            position: relative;
            padding: 10px 15px; 
            z-index: 2;
            /* Efek Garis Horizontal (LED Panel Look) */
            background-image: linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px);
            background-size: 100% 5px;
        }

        /* Judul Jackpot */
        .jackpot-main-title {
            color: #fff; 
            font-size: 1rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 5px;
            text-shadow: 0 0 8px #00eaff;
            white-space: nowrap;
        }

        /* Angka Jackpot (Font Monospace Stabil + Efek Digital Scoreboard) */
        .jackpot-value-final {
            font-family: monospace !important; 
            color: #fff;
            font-size: 2.2rem; 
            font-weight: bold;
            line-height: 1.1;
            /* Spasi antar huruf untuk tampilan Digital yang lebih jelas */
            letter-spacing: 2px; 
            
            /* Lapisan Glow yang Intens */
            text-shadow: 
                0 0 3px #00eaff,    /* Base glow biru muda */
                0 0 10px #00eaff,   /* Cahaya utama */
                0 0 15px #00eaff,   /* Cahaya penyebar */
                0 0 20px #0077ff;   /* Cahaya luar biru tua */
            
            white-space: nowrap;
            /* Animasi Kedip Angka */
            animation: textFlicker 0.15s linear infinite alternate; 
        }

        /* Animasi Kedip Angka (lebih cepat) */
        @keyframes textFlicker {
            0% { opacity: 1; }
            50% { opacity: 0.9; }
            100% { opacity: 1; }
        }

        /* Responsive Desktop: Ukuran lebih besar */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 2.6rem; /* Ukuran besar di desktop */
                letter-spacing: 3px;
            }
            .jackpot-container-main {
                max-width: 700px; /* Lebar maksimal diperbesar */
            }
        }

        /* Responsive Mobile: Ukuran disesuaikan agar tidak overflow */
        @media (max-width: 768px) {
            .jackpot-value-final {
                font-size: 5.5vw; /* Ukuran font fleksibel */
                letter-spacing: 0.5vw;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesScoreboard;
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

            // Format manual menggunakan regex (paling stabil untuk tampilan titik)
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
                <div class="jackpot-neon-pulsate">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">PROGRESSIVE JACKPOTS</div>
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
