(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT ---
    const jackpotStyles = `
        /* CSS untuk Progressive Jackpot */
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&display=swap');
        .progressive-jackpot-wrapper {
            font-family: 'Exo 2', sans-serif !important;
            text-align: center;
            position: relative;
            padding-top: 15px;
            margin-top: 1.5rem; /* Menambahkan margin atas untuk pemisah visual */
            margin-bottom: 1.5rem;
            z-index: 50; /* Pastikan di atas elemen lain jika perlu */
        }
        .progressive-jackpot-header {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #0077ff;
            color: #fff;
            padding: 2px 15px;
            border-radius: 5px;
            font-size: 0.7rem;
            font-weight: bold;
            letter-spacing: 1px;
            box-shadow: 0 0 10px rgba(0, 119, 255, 0.7);
            z-index: 10;
            white-space: nowrap;
        }
        .jackpot-display-container {
            display: flex;
            justify-content: center;
            align-items: stretch;
            position: relative;
            z-index: 5;
            perspective: 1000px;
        }
        .jackpot-shape-left,
        .jackpot-shape-right,
        .jackpot-value-box {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.5rem;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
            border-color: transparent !important;
        }
        .jackpot-value-box {
            clip-path: polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0 50%);
            min-width: 250px;
            font-size: 1.6rem;
            letter-spacing: 1px;
            line-height: 1.2;
            padding: 15px 30px;
            background: linear-gradient(90deg, #0077ff, #00eaff, #0077ff);
            background-size: 300% 100%;
            animation: jackpotPulse 5s infinite ease-in-out;
            border: 3px solid #fff;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
        }
        .jackpot-shape-left,
        .jackpot-shape-right {
            background: #0077ff; 
            padding: 10px 5px;
            width: 50px;
            box-shadow: 0 0 10px rgba(0, 119, 255, 0.7);
        }
        .jackpot-shape-left {
            clip-path: polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%, 15% 50%);
            margin-right: -20px;
        }
        .jackpot-shape-right {
            clip-path: polygon(0 0, 100% 50%, 0 100%, 15% 50%);
            margin-left: -20px;
            transform: scaleX(-1); /* Membalikkan bentuk agar simetris */
        }
        .chevron-set-left,
        .chevron-set-right {
            color: #fff;
            font-size: 1.8rem;
            opacity: 0.8;
            display: flex;
        }
        .chevron-set-right {
            transform: scaleX(-1); /* Mengembalikan ikon agar menghadap ke kanan */
        }
        @keyframes jackpotPulse {
            0% { background-position: 100% 50%; box-shadow: 0 0 20px #00eaff, inset 0 0 5px #fff; }
            50% { background-position: 0% 50%; box-shadow: 0 0 30px #fff, 0 0 40px #0077ff, inset 0 0 8px #fff; }
            100% { background-position: 100% 50%; box-shadow: 0 0 20px #00eaff, inset 0 0 5px #fff; }
        }
        @keyframes chevronMovementLeft {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-5px); }
        }
        .chevron-set-left i:nth-child(1) { animation: chevronMovementLeft 1.5s infinite linear; }
        .chevron-set-left i:nth-child(2) { animation: chevronMovementLeft 1.5s infinite linear 0.15s; }
        .chevron-set-left i:nth-child(3) { animation: chevronMovementLeft 1.5s infinite linear 0.3s; }

        .chevron-set-right i:nth-child(1) { animation: chevronMovementLeft 1.5s infinite linear 0.3s; }
        .chevron-set-right i:nth-child(2) { animation: chevronMovementLeft 1.5s infinite linear 0.15s; }
        .chevron-set-right i:nth-child(3) { animation: chevronMovementLeft 1.5s infinite linear; }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStyles;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounter() {
        const element = document.getElementById('dynamic-jackpot-value');
        // Pastikan elemen sudah ada sebelum memulai counter
        if (!element) {
            console.warn('Dynamic jackpot element not found.');
            return;
        }

        let currentValue = 32462646763; // Nilai awal
        const maxIncrement = 15;
        const updateInterval = 80;
        const resetThreshold = 32462700000; // Batas reset

        function updateJackpotValue() {
            // Increment nilai secara acak
            const increment = Math.floor(Math.random() * maxIncrement) + 1;
            currentValue += increment;

            // Reset nilai jika melebihi batas
            if (currentValue > resetThreshold) {
                currentValue = 32462646763;
            }

            // Format nilai ke IDR dengan titik sebagai pemisah ribuan
            const formattedValue = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(currentValue);

            element.textContent = formattedValue;
        }

        // Mulai counter
        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML KE LOKASI YANG TEPAT ---
    function injectJackpotHTML() {
        // Cari elemen target: #row-togel (Pasaran Togel)
        const targetElement = document.getElementById('row-togel');
        
        // Cek jika elemen Jackpot sudah ada, untuk mencegah duplikasi jika script dijalankan berkali-kali
        if (document.querySelector('.progressive-jackpot-wrapper')) {
            return;
        }

        // Cek jika target (Pasaran Togel) belum ditemukan, coba lagi nanti
        if (!targetElement) {
            // Ini bisa terjadi jika DOM belum sepenuhnya dimuat, coba lagi dalam 100ms
            setTimeout(injectJackpotHTML, 100);
            return;
        }

        // Blok HTML Jackpot
        const jackpotHTML = `
            <div class="progressive-jackpot-wrapper">
                <div class="progressive-jackpot-header">
                    PROGRESSIVE JACKPOTS
                </div>
                <div class="jackpot-display-container">
                    <div class="jackpot-shape-left">
                        <div class="chevron-set-left">
                            <i class="bi bi-chevron-left"></i>
                            <i class="bi bi-chevron-left"></i>
                            <i class="bi bi-chevron-left"></i>
                        </div>
                    </div>
                    <div class="jackpot-value-box">
                        IDR <span id="dynamic-jackpot-value">32.462.646.763</span>
                    </div>
                    <div class="jackpot-shape-right">
                        <div class="chevron-set-right">
                            <i class="bi bi-chevron-right"></i>
                            <i class="bi bi-chevron-right"></i>
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Sisipkan HTML tepat SEBELUM elemen #row-togel
        targetElement.insertAdjacentHTML('beforebegin', jackpotHTML);

        // Setelah elemen disisipkan, segera mulai counter dinamisnya
        startDynamicJackpotCounter();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTML);
    
    // Juga jalankan secara berkala untuk menangani pemuatan dinamis/AJAX
    setInterval(injectJackpotHTML, 500);
})();