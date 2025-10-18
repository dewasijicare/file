(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // --- PENGATURAN EFEK ---
        const particleCount = 8; // Jumlah partikel sedikit disesuaikan untuk performa scroll
        const particleSpeed = 0.3;
        // [PERUBAHAN] Warna dibuat lebih terang dengan meningkatkan transparansi (alpha)
        const particleColors = [
            'rgba(255, 255, 255, 0.9)', // Putih
            'rgba(255, 255, 255, 0.9)', // Putih (dibuat lebih banyak)
            'rgba(255, 225, 50, 0.9)',  // Kuning (Gold) lebih terang
            'rgba(50, 230, 255, 0.9)',  // Biru (Cyan) lebih terang
            'rgba(50, 230, 255, 0.9)',  // Biru (dibuat lebih banyak)
            'rgba(255, 100, 100, 0.8)' // Merah lebih terang
        ];
        // -------------------------

        // 1. Membuat Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.id = 'glowing-particles-canvas';
        // [PERUBAHAN] Posisi diubah menjadi 'absolute' agar ikut scroll
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';

        // Tempatkan canvas di dalam body, tapi di urutan pertama agar pasti di belakang
        document.body.insertBefore(canvas, document.body.firstChild);

        let particlesArray;

        // 2. Class untuk membuat setiap partikel
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * particleSpeed;
                this.speedY = Math.random() * particleSpeed + 0.1;
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
            }
            // Memperbarui posisi partikel
            update() {
                this.speedX += (Math.random() - 0.5) * 0.05;

                if (this.speedX > particleSpeed) this.speedX = particleSpeed;
                if (this.speedX < -particleSpeed) this.speedX = -particleSpeed;

                this.x += this.speedX;
                this.y += this.speedY;

                // [PERUBAHAN] Logika respawn partikel sekarang sadar posisi scroll
                const topOfScreen = window.scrollY;
                const bottomOfScreen = window.scrollY + window.innerHeight;

                // Jika partikel jatuh ke bawah layar, pindahkan ke atas layar
                if (this.y > bottomOfScreen + this.size) {
                    this.y = topOfScreen - this.size;
                    this.x = Math.random() * canvas.width;
                }
                // Jika partikel tertinggal di atas layar (saat scroll ke bawah), pindahkan ke bawah layar
                if (this.y < topOfScreen - this.size) {
                    this.y = bottomOfScreen + this.size;
                    this.x = Math.random() * canvas.width;
                }
                
                // Jika partikel keluar ke samping, munculkan lagi dari sisi sebaliknya
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
                // [PERUBAHAN] Efek glowing dibuat lebih kuat lagi
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 3. Fungsi untuk inisialisasi
        function init() {
            // [PERUBAHAN] Ukuran canvas sekarang mengikuti TINGGI TOTAL HALAMAN
            canvas.width = document.body.scrollWidth;
            canvas.height = document.body.scrollHeight;
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
        // Beri sedikit jeda agar layout halaman selesai dihitung
        setTimeout(() => {
            init();
            animate();
        }, 100);

        // Buat canvas responsif jika ukuran window atau konten berubah
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(init, 250);
        });
        
        console.log('Efek partikel glowing (versi interaktif & scroll) berhasil dimuat.');
    });
})();
