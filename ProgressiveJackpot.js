(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Cyber Matrix Pulse) ---
    const jackpotStylesCyber = `
        /* CSS untuk Progressive Jackpot - V12 Cyber Matrix Pulse */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        
        /* Warna Neon Baru */
        :root {
            --neon-blue: #00eaff;
            --neon-green: #2ecc71;
            --dark-bg: #1a252f;
        }

        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 3rem; /* Jarak lebih besar */
            margin-bottom: 2rem;
            z-index: 50;
            padding: 0; 
            box-sizing: border-box;
            max-width: 650px; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Container 3D Frame Luar */
        .jackpot-cyber-frame {
            position: relative;
            border-radius: 15px;
            padding: 5px;
            background: linear-gradient(145deg, var(--neon-blue), var(--neon-green));
            box-shadow: 0 0 15px var(--neon-blue);
            transform-style: preserve-3d;
            animation: frameGlow 2s ease-in-out infinite alternate;
        }

        /* Animasi Glow Frame Luar */
        @keyframes frameGlow {
            0% {
                box-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-green);
            }
            100% {
                box-shadow: 0 0 25px var(--neon-blue), 0 0 40px var(--neon-green);
            }
        }
        
        /* Kotak konten utama Jackpot (Layar Digital) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: var(--dark-bg); 
            border: 3px solid var(--neon-blue); 
            border-radius: 10px; 
            min-height: 90px;
            position: relative;
            padding: 10px 15px; 
            z-index: 10;
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8), 0 0 5px var(--neon-blue);
        }

        /* Tanda Senter (Marker) di sudut untuk efek 3D */
        .jackpot-display-box-content::before,
        .jackpot-display-box-content::after {
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            border: 2px solid var(--neon-green);
            z-index: 11;
        }
        .jackpot-display-box-content::before {
            top: -2px;
            left: -2px;
            border-right: none;
            border-bottom: none;
            box-shadow: 0 0 10px var(--neon-green);
        }
        .jackpot-display-box-content::after {
            bottom: -2px;
            right: -2px;
            border-left: none;
            border-top: none;
            box-shadow: 0 0 10px var(--neon-green);
        }

        /* Judul Jackpot */
        .jackpot-main-title {
            color: var(--neon-blue); 
            font-size: 1.1rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 5px;
            text-shadow: 0 0 8px var(--neon-blue), 0 0 5px #fff;
            white-space: nowrap;
        }

        /* Angka Jackpot (Font Monospace Stabil + Hyper Glow) */
        .jackpot-value-final {
            font-family: monospace !important; 
            color: var(--neon-green); /* Angka Hijau Neon */
            font-size: 2.2rem; 
            font-weight: bold;
            line-height: 1.1;
            letter-spacing: 2px; 
            
            /* Lapisan Hyper Glow */
            text-shadow: 
                0 0 5px var(--neon-green),  
                0 0 10px var(--neon-green), 
                0 0 20px var(--neon-blue),  
                0 0 30px var(--neon-blue); 
            
            white-space: nowrap;
            animation: textFlicker 0.15s linear infinite alternate; 
        }

        /* Animasi Kedip Angka */
        @keyframes textFlicker {
            0% { opacity: 1; text-shadow: 0 0 10px var(--neon-green); }
            100% { opacity: 0.95; text-shadow: 0 0 20px var(--neon-blue); }
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
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesCyber;
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
                <div class="jackpot-cyber-frame">
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
