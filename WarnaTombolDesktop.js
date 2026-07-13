(function() {
    function applyCorrectGabanButtonColors() {
        // Mencari semua tombol di area navigasi utama
        // Sesuaikan selector dengan struktur HTML web Anda
        const navButtons = document.querySelectorAll('.d-flex button, .d-flex a, .row button, .row a');
        
        // Filter tombol yang hanya ada 3 (Login, Daftar, Promosi)
        // Kita gunakan Array.from untuk memudahkan indexing
        const targetButtons = Array.from(navButtons).filter(btn => {
            const text = btn.textContent.toLowerCase();
            return text.includes('login') || text.includes('daftar') || text.includes('promosi');
        });

        if (targetButtons.length < 3) return;

        // 1. Tombol Login (Indeks 0) -> BIRU
        targetButtons[0].style.cssText = `
            background: linear-gradient(45deg, #0077ff, #00eaff) !important;
            color: #fff !important;
            border: none !important;
        `;

        // 2. Tombol Daftar (Indeks 1) -> KUNING
        targetButtons[1].style.cssText = `
            background: linear-gradient(45deg, #ffd700, #ffa500) !important;
            color: #2c3e50 !important;
            border: none !important;
        `;

        // 3. Tombol Promosi (Indeks 2) -> MERAH
        targetButtons[2].style.cssText = `
            background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
            color: #fff !important;
            border: none !important;
        `;

        // Menambahkan properti umum untuk ketiga tombol agar seragam
        targetButtons.forEach(btn => {
            btn.style.setProperty('font-weight', '700', 'important');
            btn.style.setProperty('text-transform', 'uppercase', 'important');
            btn.style.setProperty('box-shadow', '0 0 10px rgba(0,0,0,0.3)', 'important');
        });
    }

    // Jalankan setiap 150ms agar warna tidak berubah kembali
    setInterval(applyCorrectGabanButtonColors, 150);
})();
