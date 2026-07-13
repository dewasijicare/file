(function() {
    function styleDesktopButtons() {
        // Menargetkan tombol di area barisan tengah desktop (Login, Daftar, Promosi)
        // Kita gunakan querySelectorAll untuk mencari tombol-tombol tersebut
        const navButtons = document.querySelectorAll('button, a[href*="login"], a[href*="register"], a[href*="promosi"]');
        
        navButtons.forEach(btn => {
            // Cek apakah teks tombol mengandung kata kunci
            const text = btn.textContent.toLowerCase();
            if (text.includes('login') || text.includes('daftar') || text.includes('promosi')) {
                
                // Terapkan style Gaban
                btn.style.setProperty('background', 'linear-gradient(45deg, #0077ff, #00eaff)', 'important');
                btn.style.setProperty('color', '#fff', 'important');
                btn.style.setProperty('border', 'none', 'important');
                btn.style.setProperty('font-weight', '700', 'important');
                btn.style.setProperty('text-transform', 'uppercase', 'important');
                btn.style.setProperty('box-shadow', '0 0 10px #00eaff', 'important');
                btn.style.setProperty('transition', 'all 0.3s ease', 'important');
                
                // Tambahkan efek hover agar terlihat premium
                btn.onmouseover = function() {
                    this.style.boxShadow = '0 0 20px #00eaff, 0 0 30px #0077ff';
                };
                btn.onmouseout = function() {
                    this.style.boxShadow = '0 0 10px #00eaff';
                };
            }
        });
    }

    // Jalankan setiap 200ms agar style tidak tertimpa oleh script asli website
    setInterval(styleDesktopButtons, 200);
})();