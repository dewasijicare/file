(function() {
    // Fungsi Check & Inject
    function injectPintasWidget() {
        var target = document.querySelector('.jackpot-container-main');
        var existingWidget = document.getElementById('pintas-widget-wrapper');

        if (target && !existingWidget) {
            
            // HTML WIDGET BARU (Desain Ramping & Neon)
            var widgetHTML = `
                <div id="pintas-widget-wrapper" style="margin-bottom: 15px; margin-top: 5px;">
                    <a href="https://pintasdomain.com" target="_blank" style="text-decoration: none;">
                        
                        <div class="pintas-neon-bar">
                            
                            <div class="pintas-icon">
                                <span class="rocket-move">🚀</span>
                            </div>

                            <div class="pintas-content">
                                <div class="pintas-sub">SUSAH AKSES / TERBLOKIR?</div>
                                <div class="pintas-title">
                                    Gunakan <span class="highlight">PintasDomain.com</span>
                                </div>
                            </div>

                            <div class="pintas-action">
                                <div class="btn-glitch">BUKA SEKARANG</div>
                            </div>

                        </div>
                    </a>
                </div>

                <style>
                    /* 1. Container Style - Ramping & Modern */
                    .pintas-neon-bar {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: rgba(0, 0, 0, 0.6); /* Gelap Transparan */
                        backdrop-filter: blur(10px); /* Efek Kaca */
                        border: 1px solid rgba(60, 244, 244, 0.3); /* Border Cyan Halus */
                        border-radius: 80px; /* Sisi Bulat Penuh (Capsule) */
                        padding: 8px 15px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
                        transition: all 0.3s ease;
                    }

                    /* Efek Hover pada Container */
                    .pintas-neon-bar:hover {
                        border-color: #00e5ff;
                        box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
                        transform: scale(1.01);
                    }

                    /* 2. Icon Roket */
                    .pintas-icon {
                        background: rgba(255, 255, 255, 0.1);
                        width: 40px; height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        flex-shrink: 0;
                        margin-right: 10px;
                    }
                    .rocket-move {
                        display: inline-block;
                        animation: blastOff 2s infinite ease-in-out;
                    }

                    /* 3. Typography */
                    .pintas-content {
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        line-height: 1.1;
                        text-align: left;
                    }
                    .pintas-sub {
                        font-family: sans-serif;
                        font-size: 0.65rem;
                        color: #fbbf24; /* Kuning Emas */
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                    .pintas-title {
                        font-family: 'Arial Black', sans-serif;
                        font-size: 1.1rem;
                        color: #fff;
                        font-weight: 900;
                    }
                    .highlight {
                        color: #38bdf8; /* Biru Langit Cerah */
                        text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
                    }

                    /* 4. Tombol Aksi Kanan */
                    .pintas-action {
                        display: none; /* Sembunyikan di HP kecil sekali */
                    }
                    .btn-glitch {
                        background: linear-gradient(90deg, #2563eb, #06b6d4);
                        color: white;
                        font-size: 0.75rem;
                        font-weight: bold;
                        padding: 5px 15px;
                        border-radius: 20px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    }

                    /* RESPONSIVE: Tampilkan tombol di layar > 360px */
                    @media (min-width: 360px) {
                        .pintas-action { display: block; margin-left: 10px; }
                    }

                    /* ANIMASI ROKET */
                    @keyframes blastOff {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(2px, -2px) rotate(5deg); }
                    }
                </style>
            `;

            // Inject Tepat di ATAS Jackpot Container
            target.insertAdjacentHTML('beforebegin', widgetHTML);
            return true;
        }
        return false;
    }

    // Retry Logic (Penting untuk memastikan widget muncul walau loading lambat)
    if (!injectPintasWidget()) {
        document.addEventListener('DOMContentLoaded', function() {
            if (!injectPintasWidget()) {
                var attempts = 0;
                var interval = setInterval(function() {
                    attempts++;
                    if (injectPintasWidget() || attempts >= 5) clearInterval(interval);
                }, 1000);
            }
        });
    }
})();
