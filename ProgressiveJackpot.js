(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Chasing Lights / Marquee) ---
    const jackpotStylesChasing = `
        /* CSS untuk Progressive Jackpot - V11 Chasing Lights */
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
            max-width: 650px; 
            margin-left: auto;
            margin-right: auto;
        }

        /* Container Neon (Border & Lampu) */
        .jackpot-neon-pulsate {
            position: relative;
            border-radius: 12px;
            /* Border tebal untuk menopang efek lampu */
            border: 4px solid #0c0c1e; /* Warna background utama Anda */
            box-shadow: 0 0 10px #00eaff;
            overflow: hidden;
        }

        /* Efek Lampu Berputar (Marquee) */
        .jackpot-neon-pulsate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 5;
            
            /* Background Berulang yang Berisi Titik/Lampu */
            background-image: 
                radial-gradient(circle at center, #fff 10%, #00eaff 30%, transparent 40%),
                repeating-linear-gradient(90deg, #00eaff 0%, #00eaff 20%, transparent 20%, transparent 40%),
                repeating-linear-gradient(180deg, #00eaff 0%, #00eaff 20%, transparent 20%, transparent 40%);
            
            /* Ukuran dan Posisi Background */
            background-size: 
                4px 4px,   /* Ukuran Titik/Lampu */
                40% 100%,  /* Lebar segment horizontal */
                100% 40%;  /* Tinggi segment vertical */
            background-repeat: repeat;
            
            /* Animasi Gerak */
            animation: chasingLights 2s linear infinite;
        }

        /* Animasi Chasing Lights */
        @keyframes chasingLights {
            0% { 
                background-position: 
                    0 0, /* Rotasi titik (tidak digunakan di sini) */
                    0 0, /* Gerak Horizontal */
                    0 0; /* Gerak Vertikal */
            }
            100% { 
                background-position: 
                    0 0, 
                    100% 0, /* Pindahkan Horizontal 100% */
                    0 100%; /* Pindahkan Vertikal 100% */
            }
        }
        
        /* Kotak konten utama Jackpot (Panel LED) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background: #1a252f; 
            border: 3px solid #00eaff; 
            border-radius: 8px; 
            min-height: 80px;
            position: relative;
            padding: 10px 15px; 
            z-index: 10; /* Z-index tinggi agar konten di atas lampu */
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

        /* Angka Jackpot (Font Monospace Stabil + Efek Digital) */
        .jackpot-value-final {
            font-family: monospace !important; 
            color: #fff;
            font-size: 2.2rem; 
            font-weight: bold;
            line-height: 1.1;
            letter-spacing: 2px;
            text-shadow: 
                0 0 3px #00eaff,    
                0 0 10px #00eaff,   
                0 0 15px #00eaff,   
                0 0 20px #0077ff;
            white-space: nowrap;
            animation: textFlicker 0.15s linear infinite alternate; 
        }

        /* Animasi Kedip Angka */
        @keyframes textFlicker {
            0% { opacity: 1; }
            50% { opacity: 0.9; }
            100% { opacity: 1; }
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
    styleElement.innerHTML = jackpotStylesChasing;
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
