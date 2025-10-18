(function() {
    // Fungsi ini akan berjalan setelah seluruh halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {

        // --- PENGATURAN EFEK ---
        const particleCount = 8;
        const particleSpeed = 0.3;
        const particleColors = [
            'rgba(255, 255, 255, 0.9)', // Putih
            'rgba(255, 255, 255, 0.9)', // Putih (dibuat lebih banyak)
            'rgba(255, 225, 50, 0.9)',  // Kuning (Gold) lebih terang
            'rgba(50, 230, 255, 0.9)',  // Biru (Cyan) lebih terang
            'rgba(50, 230, 255, 0.9)',  // Biru (dibuat lebih banyak)
            'rgba(255, 100, 100, 0.8)' // Merah lebih terang
        ];
        // -------------------------
        
        // [SOLUSI FINAL] Buat sebuah div container yang terisolasi
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        particleContainer.style.position = 'fixed'; // Gunakan 'fixed' agar tidak terpengaruh scroll
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100vw'; // Gunakan 'vw' untuk viewport width
        particleContainer.style.height = '100vh'; // Gunakan 'vh' untuk viewport height
        particleContainer.style.zIndex = '9999'; // Letakkan di belakang
        particleContainer.style.pointerEvents = 'none';

        // 1. Membuat Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        // Masukkan canvas ke dalam container, lalu masukkan container ke dalam body
        particleContainer.appendChild(canvas);
        document.body.appendChild(particleContainer);

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

                // Logika respawn untuk canvas 'fixed'
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
            // Menggambar partikel
            draw() {
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
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

        init();
        animate();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(init, 100);
        });
        
        console.log('Efek partikel glowing (v3 - Isolasi) berhasil dimuat.');
    });
})();
