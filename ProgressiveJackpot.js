(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Dominan Desktop & LED Look Final) ---
    const jackpotStylesFinal = `
        /* CSS untuk Progressive Jackpot - V7 Stabil & Dominan */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Exo+2:wght@700;900&display=swap');
        
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin-top: 2.5rem; /* Margin atas lebih besar */
            margin-bottom: 1.5rem; /* Jarak ke Pasaran Togel */
            z-index: 50;
            padding: 5px;
            box-sizing: border-box;
            /* Ukuran Desktop: Lebar maks 600px agar dominan di tengah */
            max-width: 600px; 
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
            padding: 10px; /* Padding lebih kecil */
            z-index: 2;
            box-shadow: inset 0 0 10px rgba(0, 119, 255, 0.5); 
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
            font-size: 1.1rem; /* Ukuran tetap */
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 8px;
            text-shadow: 0 0 10px #00eaff;
            z-index: 3;
            white-space: nowrap;
        }

        /* Angka Jackpot (Menggunakan font digital yang lebih tebal) */
        .jackpot-value-final {
            font-family: 'Orbitron', monospace !important; /* Font LED/Digital baru yang tebal */
            color: #fff;
            font-size: 2.5rem; /* Ukuran disesuaikan agar pas dengan lebar */
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: 1px;
            text-shadow: 0 0 15px #00eaff, 0 0 8px #fff; 
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
            .jackpot-container-main {
                max-width: 100%; /* Full width di mobile */
                padding: 0 10px;
            }
            .jackpot-value-final {
                font-size: 1.8rem;
                letter-spacing: 1px;
            }
            .jackpot-main-title {
                font-size: 0.9rem;
            }
            .jackpot-display-box-content {
                min-height: 80px;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesFinal;
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

            // Gunakan format Rupiah (IDR)
            // Note: Menggunakan 'id-ID' akan otomatis menggunakan titik sebagai pemisah ribuan
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
        // Cari elemen target: #row-togel (Pasaran Togel)
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
                <div class="jackpot-border-glow">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">PROGRESSIVE JACKPOTS</div>
                        <div id="dynamic-jackpot-value-final" class="jackpot-value-final">32.462.646.763</div>
                    </div>
                </div>
            </div>
        `;

        // Sisipkan HTML tepat SEBELUM elemen #row-togel
        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);

        // Setelah elemen disisipkan, segera mulai counter dinamisnya
        startDynamicJackpotCounterFinal();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
    setInterval(injectJackpotHTMLFinal, 500);
})();
