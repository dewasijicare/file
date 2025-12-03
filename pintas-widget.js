(function() {
    // 1. Tentukan Target Elemen (Jackpot Container)
    var target = document.querySelector('.jackpot-container-main');

    // Hanya jalankan jika elemen jackpot ditemukan
    if (target) {
        
        // 2. Desain HTML Widget (Menggunakan class bawaan situs: glassmorphism, d-flex, dll)
        // Style tambahan inline ditambahkan untuk memastikan tampilan rapi di background gelap
        var widgetHTML = `
            <div class="row my-3 g-1 fade-in-pintas">
                <div class="col-12">
                    <div class="p-2 rounded-3 glassmorphism d-flex align-items-center justify-content-between" 
                         style="border: 1px solid rgba(255,255,255,0.15); background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.0) 100%); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                        
                        <div class="d-flex align-items-center gap-3 ps-2">
                            <div style="font-size: 1.8rem; filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.8)); animation: floatRocket 3s ease-in-out infinite;">
                                🚀
                            </div>
                            
                            <div class="lh-1">
                                <div style="font-size: 0.7rem; color: #adb5bd; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">
                                    Susah Akses Link?
                                </div>
                                <div style="font-size: 0.95rem; font-weight: bold; color: #fff;">
                                    Cari Kata Kunci di <span style="color: #60a5fa; text-shadow: 0 0 10px rgba(59,130,246,0.5);">PintasDomain.com</span>
                                </div>
                            </div>
                        </div>

                        <a href="https://pintasdomain.com" target="_blank" class="btn btn-primary btn-sm rounded-pill px-4 fw-bold d-flex align-items-center gap-2 shadow-sm" style="border:none; background: linear-gradient(135deg, #2563eb, #1d4ed8);">
                            <span>CARI</span> <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <style>
                /* Animasi Halus Roket */
                @keyframes floatRocket {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-3px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                /* Efek Fade In saat muncul */
                .fade-in-pintas {
                    animation: fadeInPintas 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(10px);
                }
                @keyframes fadeInPintas {
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;

        // 3. Sisipkan Widget TEPAT SEBELUM (beforebegin) elemen Jackpot
        target.insertAdjacentHTML('beforebegin', widgetHTML);
    }
})();