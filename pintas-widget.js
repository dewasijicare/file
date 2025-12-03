(function() {
    // Fungsi Check & Inject
    function injectPintasWidget() {
        var target = document.querySelector('.jackpot-container-main');
        var existingWidget = document.getElementById('pintas-widget-wrapper');

        if (target && !existingWidget) {
            
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

                        </div>
                    </a>
                </div>

                <style>
                    /* 1. Container Style */
                    .pintas-neon-bar {
                        display: flex;
                        align-items: center;
                        justify-content: center; /* Posisi di tengah */
                        background: rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(60, 244, 244, 0.3);
                        border-radius: 80px;
                        padding: 10px 15px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
                        transition: all 0.3s ease;
                    }

                    .pintas-neon-bar:hover {
                        border-color: #00e5ff;
                        box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
                        transform: scale(1.01);
                    }

                    /* 2. Icon Roket (Minimalis) */
                    .pintas-icon {
                        font-size: 2rem; /* Ukuran icon */
                        margin-right: 15px;
                        flex-shrink: 0;
                        line-height: 1;
                        /* Tidak ada background */
                    }
                    .rocket-move {
                        display: inline-block;
                        animation: blastOff 2s infinite ease-in-out;
                    }

                    /* 3. Typography */
                    .pintas-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        line-height: 1.2;
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
                        font-size: 1.2rem;
                        color: #fff;
                        font-weight: 900;
                    }
                    .highlight {
                        color: #38bdf8; /* Biru Langit */
                        text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
                    }

                    /* ANIMASI ROKET */
                    @keyframes blastOff {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(3px, -3px) rotate(5deg); }
                    }
                </style>
            `;

            target.insertAdjacentHTML('beforebegin', widgetHTML);
            return true;
        }
        return false;
    }

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
