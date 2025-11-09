(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (Desain Minimalis Persegi) ---
    const jackpotStylesMinimalist = `
        /* CSS untuk Progressive Jackpot - Desain Minimalis */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        .progressive-jackpot-wrapper-minimalist {
            font-family: 'Exo 2', sans-serif !important;
            text-align: center;
            position: relative;
            padding-top: 15px;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            z-index: 50;
            box-sizing: border-box; /* Pastikan padding dihitung dalam width */
        }
        .progressive-jackpot-header-minimalist {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(90deg, #0077ff, #00eaff);
            color: #fff;
            padding: 3px 20px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: bold;
            letter-spacing: 1.5px;
            box-shadow: 0 0 15px rgba(0, 234, 255, 0.8);
            z-index: 10;
            white-space: nowrap;
            text-transform: uppercase;
        }
        .jackpot-display-box-minimalist {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #000; /* Latar belakang gelap untuk kontras */
            border: 3px solid #00eaff; /* Border biru neon */
            border-radius: 12px; /* Sudut sedikit membulat */
            padding: 15px 25px;
            min-height: 70px; /* Tinggi minimum */
            box-shadow: 0 0 25px rgba(0, 234, 255, 0.7), inset 0 0 10px rgba(0, 234, 255, 0.3);
            position: relative;
            overflow: hidden; /* Penting untuk animasi background */
        }
        .jackpot-display-box-minimalist::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 300%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 234, 255, 0.2), transparent);
            animation: shineEffect 3s infinite linear;
        }
        .jackpot-value-minimalist {
            color: #fff;
            font-size: 2.2rem; /* Ukuran font lebih besar */
            font-weight: 900;
            letter-spacing: 2px;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 5px rgba(0, 234, 255, 0.9);
            z-index: 2; /* Pastikan teks di atas efek shine */
        }
        .jackpot-currency-minimalist {
            font-size: 1.5rem;
            margin-right: 8px;
            font-weight: 700;
        }

        /* Animasi Efek Shine */
        @keyframes shineEffect {
            0% { left: -150%; }
            100% { left: 150%; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .jackpot-value-minimalist {
                font-size: 1.8rem;
                letter-spacing: 1px;
            }
            .jackpot-currency-minimalist {
                font-size: 1.2rem;
            }
            .progressive-jackpot-header-minimalist {
                font-size: 0.7rem;
                padding: 2px 15px;
            }
        }
        @media (max-width: 480px) {
            .jackpot-value-minimalist {
                font-size: 1.5rem;
            }
            .jackpot-currency-minimalist {
                font-size: 1rem;
            }
            .jackpot-display-box-minimalist {
                padding: 10px 15px;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesMinimalist;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounterMinimalist() {
        const element = document.getElementById('dynamic-jackpot-value-minimalist');
        if (!element) {
            console.warn('Dynamic jackpot minimalist element not found.');
            return;
        }

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

            const formattedValue = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(currentValue);

            element.textContent = formattedValue;
        }

        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML KE LOKASI YANG TEPAT ---
    function injectJackpotHTMLMinimalist() {
        const targetElement = document.getElementById('row-togel');
        
        // Cek jika elemen Jackpot sudah ada, untuk mencegah duplikasi
        if (document.querySelector('.progressive-jackpot-wrapper-minimalist')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLMinimalist, 100);
            return;
        }

        const jackpotHTMLMinimalist = `
            <div class="progressive-jackpot-wrapper-minimalist">
                <div class="progressive-jackpot-header-minimalist">
                    PROGRESSIVE JACKPOTS
                </div>
                <div class="jackpot-display-box-minimalist">
                    <span class="jackpot-currency-minimalist">IDR</span>
                    <span id="dynamic-jackpot-value-minimalist">32.462.646.763</span>
                </div>
            </div>
        `;

        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLMinimalist);

        // Setelah elemen disisipkan, segera mulai counter dinamisnya
        startDynamicJackpotCounterMinimalist();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLMinimalist);
    setInterval(injectJackpotHTMLMinimalist, 500); // Cadangan untuk dynamic content
})();
