(function() {
    function stylePasaranTogel() {
        // 1. Targetkan kontainer utama pasaran (biasanya berupa grid atau daftar)
        // Kita menggunakan selektor yang umum digunakan pada situs tipe ini
        const pasaranContainer = document.querySelectorAll('.card, .row > div, .mb-3');
        
        pasaranContainer.forEach(card => {
            // Cek apakah elemen ini adalah kartu pasaran (mengandung angka/nama pasaran)
            if (card.innerText.includes('POOLS') || card.innerText.includes('TOTO') || card.innerText.includes('SINGAPORE')) {
                
                // Terapkan gaya GabanTheme
                card.style.cssText = `
                    background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
                    border: 1px solid #00aaff !important;
                    border-radius: 15px !important;
                    box-shadow: 0 5px 15px rgba(0, 170, 255, 0.3) !important;
                    color: #ecf0f1 !important;
                    transition: all 0.3s ease !important;
                `;
            }
        });

        // 2. Styling Header "Pasaran Togel" agar senada
        const title = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => h.textContent.includes('Pasaran Togel'));
        if (title) {
            title.style.cssText = `
                color: #FFD700 !important;
                text-transform: uppercase !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.6) !important;
                margin-bottom: 20px !important;
            `;
        }
    }

    // Jalankan setiap 250ms untuk memastikan style tetap menempel
    setInterval(stylePasaranTogel, 250);
})();