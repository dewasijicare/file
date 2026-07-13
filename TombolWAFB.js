(function() {
    function forceGabanStyle() {
        const target = document.getElementById('row-quicklogin');
        if (!target) return;

        // 1. Paksa Style Card Utama
        target.style.cssText = `
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
            border: 1px solid #00aaff !important;
            box-shadow: 0 0 20px rgba(0, 170, 255, 0.6) !important;
            border-radius: 15px !important;
            padding: 15px !important;
        `;

        // 2. Paksa Style Input
        target.querySelectorAll('input').forEach(input => {
            input.style.cssText = `
                background-color: #1a252f !important;
                border: 1px solid #34495e !important;
                color: #fff !important;
            `;
        });

        // 3. Paksa Style Tombol Login & Daftar
        target.querySelectorAll('button').forEach(btn => {
            btn.style.cssText = `
                background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                color: #fff !important;
                border: none !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                box-shadow: 0 0 10px #00eaff !important;
            `;
        });

        // 4. Integrasi Tombol Sosial Media (WA & FB) dengan style paksa
        if (!target.dataset.socialInjected) {
            const socialLinks = [
                { text: "WHATSAPP", link: "https://wa.me/6282180332553", icon: "bi-whatsapp" },
                { text: "GROUP FACEBOOK", link: "https://www.facebook.com/groups/1633061267257649", icon: "bi-facebook" }
            ];

            socialLinks.forEach(item => {
                const a = document.createElement('a');
                a.href = item.link;
                a.target = "_blank";
                a.style.cssText = `
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    background: linear-gradient(45deg, #0077ff, #00eaff) !important;
                    border: none !important;
                    color: #fff !important;
                    padding: 10px !important;
                    margin-top: 10px !important;
                    border-radius: 8px !important;
                    text-decoration: none !important;
                    font-weight: 700 !important;
                `;
                a.innerHTML = `<i class="bi ${item.icon}"></i> ${item.text}`;
                target.appendChild(a);
            });
            target.dataset.socialInjected = 'true';
        }
    }

    // Jalankan setiap 100ms agar style tidak "kalah" oleh script asli website
    setInterval(forceGabanStyle, 100);
})();
