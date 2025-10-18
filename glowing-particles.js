(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // --- PENGATURAN EFEK ---
        // Anda bisa mengubah nilai di bawah ini untuk kustomisasi
        const particleCount = 150; // Jumlah serpihan debu. (Default: 150)
        const particleSpeed = 0.5; // Kecepatan dasar partikel. (Default: 0.5)
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
        canvas.style.zIndex = '9999'; // PENTING: Agar berada di belakang konten lain
        canvas.style.pointerEvents = 'none'; // Agar tidak bisa diklik

        document.body.appendChild(canvas);

        let particlesArray;

        // 2. Class untuk membuat setiap partikel
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 1; // Ukuran dari 1px hingga 3.5px
                this.speedX = (Math.random() - 0.5) * particleSpeed; // Arah gerak horizontal (kanan/kiri)
                this.speedY = Math.random() * particleSpeed + 0.1; // Arah gerak vertikal (selalu ke bawah)
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
            }
            // Memperbarui posisi partikel
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Jika partikel keluar layar, kembalikan ke atas dengan posisi acak
                if (this.y > canvas.height) {
                    this.y = 0 - this.size;
                    this.x = Math.random() * canvas.width;
                }
                if (this.x > canvas.width) {
                    this.x = 0 - this.size;
                }
                if (this.x < 0) {
                    this.x = canvas.width + this.size;
                }
            }
            // Menggambar partikel di canvas
            draw() {
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10; // Efek cahaya glowing
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
        window.addEventListener('resize', () => {
            init();
        });
        
        console.log('Efek partikel glowing berhasil dimuat.');
    });

})();
