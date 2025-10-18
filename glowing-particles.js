(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // --- PENGATURAN EFEK ---
        // [PERUBAHAN] Jumlah partikel dikurangi agar tidak terlalu ramai
        const particleCount = 60;
        // [PERUBAHAN] Kecepatan dasar partikel sedikit dikurangi untuk efek lebih lambat
        const particleSpeed = 0.3;
        const particleColors = [
            'rgba(255, 255, 255, 0.8)', // Putih
            'rgba(255, 255, 255, 0.8)', // Putih (dibuat lebih banyak)
            'rgba(255, 215, 0, 0.7)',  // Kuning (Gold)
            'rgba(0, 229, 255, 0.7)',  // Biru (Cyan)
            'rgba(0, 229, 255, 0.7)',  // Biru (dibuat lebih banyak)
            'rgba(255, 77, 77, 0.6)'   // Merah (sedikit)
        ];
        // -------------------------

        // 1. Membuat Canvas dan menempatkannya di latar belakang
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.id = 'glowing-particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '9999';
        canvas.style.pointerEvents = 'none';

        document.body.appendChild(canvas);

        let particlesArray;

        // 2. Class untuk membuat setiap partikel
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // [PERUBAHAN] Ukuran partikel dibuat jauh lebih kecil
                this.size = Math.random() * 1.5 + 0.5; // Ukuran dari 0.5px hingga 2.0px
                this.speedX = (Math.random() - 0.5) * particleSpeed;
                this.speedY = Math.random() * particleSpeed + 0.1;
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
            }
            // Memperbarui posisi partikel
            update() {
                // [PERUBAHAN] Menambahkan efek "angin" yang membuat gerakan horizontal tidak beraturan
                // Setiap frame, arah horizontal sedikit berubah secara acak
                this.speedX += (Math.random() - 0.5) * 0.05;

                // Batasi kecepatan horizontal agar tidak terlalu liar
                if (this.speedX > particleSpeed) this.speedX = particleSpeed;
                if (this.speedX < -particleSpeed) this.speedX = -particleSpeed;

                this.x += this.speedX;
                this.y += this.speedY;

                // Jika partikel keluar layar, kembalikan ke atas
                if (this.y > canvas.height + this.size) {
                    this.y = 0 - this.size;
                    this.x = Math.random() * canvas.width;
                }
                if (this.x > canvas.width + this.size) {
                    this.x = 0 - this.size;
                }
                if (this.x < 0 - this.size) {
                    this.x = canvas.width + this.size;
                }
            }
            // Menggambar partikel di canvas
            draw() {
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                // [PERUBAHAN] Efek glowing dibuat lebih kuat
                ctx.shadowBlur = 15;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 3. Fungsi untuk inisialisasi
        function init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesArray = [];
            for (let i = 0; i < particleCount; i++) {
                particlesArray.push(new Particle());
            }
        }

        // 4. Loop animasi utama
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        // Jalankan semuanya
        init();
        animate();

        // Buat canvas responsif jika ukuran window berubah
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(init, 100);
        });
        
        console.log('Efek partikel glowing (versi melayang) berhasil dimuat.');
    });
})();


