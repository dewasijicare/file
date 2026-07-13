(function() {
    function applyGabanStyleToAuth() {
        const target = document.getElementById('row-quicklogin');
        if (!target) return;

        // 1. Terapkan CSS ke Card Utama (Sesuai tema Anda)
        target.style.background = "linear-gradient(145deg, #2c3e50, #1a252f)";
        target.style.border = "1px solid #00aaff";
        target.style.boxShadow = "0 0 20px rgba(0, 170, 255, 0.6)";
        target.style.borderRadius = "15px";
        target.style.padding = "15px";

        // 2. Styling Input (Username & Password)
        const inputs = target.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.backgroundColor = "#1a252f";
            input.style.border = "1px solid #34495e";
            input.style.color = "#fff";
            input.style.borderRadius = "5px";
        });

        // 3. Styling Tombol Login & Daftar
        const buttons = target.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.background = "linear-gradient(45deg, #0077ff, #00eaff)";
            btn.style.color = "#fff";
            btn.style.border = "none";
            btn.style.fontWeight = "700";
            btn.style.textTransform = "uppercase";
            btn.style.boxShadow = "0 0 10px #00eaff";
        });

        // 4. Integrasi Tombol Sosial Media (WA & FB) dengan tema .btn-custom-promo
        if (!target.dataset.socialInjected) {
            const socialLinks = [
                { text: "WHATSAPP", link: "https://wa.me/6282180332553", icon: "bi-whatsapp" },
                { text: "GROUP FACEBOOK", link: "https://www.facebook.com/groups/1633061267257649", icon: "bi-facebook" }
            ];

            socialLinks.forEach(item => {
                const a = document.createElement('a');
                a.href = item.link;
                a.target = "_blank";
                // Menggunakan class btn-custom-promo yang sudah ada di CSS Anda
                a.className = "btn btn-custom-promo mt-2"; 
                a.innerHTML = `<i class="bi ${item.icon}"></i> ${item.text}`;
                target.appendChild(a);
            });
            target.dataset.socialInjected = 'true';
        }
    }

    // Jalankan pengecekan berkala (200ms) untuk menangkap elemen setelah dirender
    const observer = setInterval(() => {
        if (document.getElementById('row-quicklogin')) {
            applyGabanStyleToAuth();
        }
    }, 200);

    // Hentikan observer setelah 5 detik agar tidak membebani performa
    setTimeout(() => clearInterval(observer), 5000);
})();
