(function() {
    function applyGabanButtonStyles() {
        // Mengambil semua tombol yang ada di area navigasi/home
        const buttons = document.querySelectorAll('button, a');
        
        buttons.forEach(btn => {
            const text = btn.textContent.trim().toLowerCase();
            
            // 1. STYLE LOGIN & DAFTAR (Biru ke Cyan)
            if (text.includes('login') || text.includes('daftar')) {
                btn.style.cssText = `
                    background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                    color: #fff !important;
                    border: none !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    box-shadow: 0 0 10px #00eaff, inset 0 0 5px rgba(255,255,255,.4) !important;
                `;
            } 
            // 2. STYLE PROMOSI (Kuning ke Oranye)
            else if (text.includes('promosi')) {
                btn.style.cssText = `
                    background: linear-gradient(45deg, #ffd700, #ffa500) !important;
                    color: #2c3e50 !important;
                    border: none !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    box-shadow: 0 0 10px #ffd700, inset 0 0 5px rgba(255,255,255,.7) !important;
                `;
            }
        });
    }

    // Interval untuk memastikan gaya tidak tertimpa oleh CSS bawaan website
    setInterval(applyGabanButtonStyles, 200);
})();
