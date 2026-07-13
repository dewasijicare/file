(function() {
    function injectCustomAuthAndContact() {
        // Cari lokasi target (misalnya card quicklogin)
        const target = document.getElementById('row-quicklogin');
        if (!target || target.dataset.injected === 'true') return;

        // 1. Definisikan Tombol Tambahan (WA & Facebook)
        const socialButtons = [
            { text: "WHATSAPP", link: "https://wa.me/6282180332553", icon: "bi-whatsapp" },
            { text: "GROUP FACEBOOK", link: "https://www.facebook.com/groups/1633061267257649", icon: "bi-facebook" }
        ];

        // 2. Buat Container untuk tombol sosial
        const socialContainer = document.createElement('div');
        socialContainer.className = 'mt-3 d-grid gap-2';
        
        socialButtons.forEach(btn => {
            const a = document.createElement('a');
            a.href = btn.link;
            a.target = "_blank";
            a.className = "btn btn-custom-promo";
            a.style.cssText = "display: flex; align-items: center; justify-content: center; gap: 10px; background: #1a252f; border: 1px solid #00aaff; color: #fff; padding: 10px;";
            a.innerHTML = `<i class="bi ${btn.icon}"></i> ${btn.text}`;
            socialContainer.appendChild(a);
        });

        // 3. Masukkan ke dalam card login/daftar
        const cardBody = target.querySelector('.card-body');
        if (cardBody) {
            cardBody.appendChild(socialContainer);
            target.dataset.injected = 'true';
        }
    }

    // Jalankan dengan interval singkat untuk memastikan elemen sudah dirender oleh web
    const checkExist = setInterval(() => {
        if (document.getElementById('row-quicklogin')) {
            injectCustomAuthAndContact();
            clearInterval(checkExist);
        }
    }, 500);

    // Timeout untuk menghentikan interval jika tidak ditemukan setelah 10 detik
    setTimeout(() => clearInterval(checkExist), 10000);
})();
