(function() {
    function fixGabanButtonColors() {
        // Cari semua tombol atau link di halaman
        const allButtons = document.querySelectorAll('button, a');

        allButtons.forEach(btn => {
            const text = btn.textContent.trim().toLowerCase();

            // 1. Tombol LOGIN -> BIRU
            if (text === 'login') {
                btn.style.cssText = `
                    background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                    color: #fff !important;
                    border: none !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                `;
            }
            // 2. Tombol DAFTAR -> KUNING
            else if (text === 'daftar') {
                btn.style.cssText = `
                    background: linear-gradient(45deg, #ffd700, #ffa500) !important;
                    color: #2c3e50 !important;
                    border: none !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                `;
            }
            // 3. Tombol PROMOSI -> MERAH
            else if (text === 'promosi') {
                btn.style.cssText = `
                    background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
                    color: #fff !important;
                    border: none !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                `;
            }
        });
    }

    // Jalankan setiap 200ms
    setInterval(fixGabanButtonColors, 200);
})();
