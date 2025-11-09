(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Neon Pulsating & Hyper-Glow) ---
    const jackpotStylesV9 = `
        /* CSS untuk Progressive Jackpot - V9 Neon Pulsating */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&family=Share+Tech+Mono&display=swap');
        
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            z-index: 50;
            /* Padding disetel ke 0 agar glow tidak terpotong */
            padding: 0; 
            box-sizing: border-box;
            max-width: 90%; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Container utama dengan efek denyutan neon */
        .jackpot-neon-pulsate {
            position: relative;
            border-radius: 12px;
            /* Garis luar dan denyutan neon */
            box-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff, inset 0 0 5px #00eaff;
            overflow: hidden;
            border: 2px solid #00eaff;
            transition: all 0.3s ease-in-out;
            animation: neonPulse 1.5s ease-in-out infinite alternate;
            cursor: default;
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

        /* Kotak konten utama Jackpot */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; /* Background Dark Theme */
            border-radius: 10px; 
            min-height: 90px;
            position: relative;
            padding: 10px 15px; 
            z-index: 2;
        }

        /* Judul Jackpot */
        .jackpot-main-title {
            color: #fff; 
            font-size: 1.1rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 5px;
            text-shadow: 0 0 8px #00eaff, 0 0 5px #0077ff;
            z-index: 3;
            white-space: nowrap;
        }

        /* Angka Jackpot (Font Digital Stabil) */
        .jackpot-value-final {
            /* Menggunakan font digital stabil sebagai pengganti monospace */
            font-family: 'Share Tech Mono', monospace !important; 
            color: #fff;
            /* Font size menggunakan unit yang stabil untuk menghindari overflow */
            font-size: 1.8rem; 
            font-weight: 400;
            line-height: 1.2;
            letter-spacing: 2px;
            text-shadow: 0 0 12px #00eaff, 0 0 6px #fff; 
            z-index: 3; 
            white-space: nowrap;
            /* Efek Kedip Angka */
            animation: textFlicker 0.2s linear infinite alternate; 
        }

        /* Animasi Kedip Angka */
        @keyframes textFlicker {
            0% { opacity: 1; }
            50% { opacity: 0.95; }
            100% { opacity: 1; }
        }

        /* Responsive Desktop: Ukuran lebih besar */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 2.2rem; /* Sangat besar di desktop */
                letter-spacing: 3px;
            }
            .jackpot-container-main {
                max-width: 600px;
            }
        }

        /* Responsive Mobile: Ukuran disesuaikan agar tidak overflow */
        @media (max-width: 768px) {
            .jackpot-value-final {
                font-size: 5vw; /* Menggunakan VW di mobile */
                max-width: 90vw;
                overflow: hidden;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
            .jackpot-display-box-content {
                min-height: 80px;
                padding: 10px 5px;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesV9;
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
            // Format manual menggunakan regex untuk tampilan titik yang lebih stabil
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
