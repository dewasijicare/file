(function() {
    function injectPintasWidget() {
        var target = document.querySelector('.jackpot-container-main');
        var existingWidget = document.getElementById('pintas-widget-container');

        if (target && !existingWidget) {
            var widgetHTML = `
                <div id="pintas-widget-container" class="row my-3 g-1 fade-in-pintas">
                    <div class="col-12">
                        <a href="https://pintasdomain.com" target="_blank" class="text-decoration-none">
                            <div class="pintas-card d-flex align-items-center justify-content-between p-3 position-relative overflow-hidden">
                                
                                <div class="shine-effect"></div>

                                <div class="d-flex align-items-center gap-3 position-relative z-10">
                                    <div class="rocket-icon-wrapper">
                                        <div class="rocket-emoji">🚀</div>
                                        <div class="rocket-glow"></div>
                                    </div>
                                    <div class="lh-sm">
                                        <div class="text-uppercase text-warning fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">
                                            <i class="bi bi-shield-check me-1"></i> Anti-Nawala & Blokir
                                        </div>
                                        <div class="fw-black text-white mt-1" style="font-size: 1.35rem; text-shadow: 0 2px 10px rgba(0,0,0,0.5); font-family: 'Arial Black', sans-serif;">
                                            Pintas<span style="color: #3b82f6;">Domain</span>.com
                                        </div>
                                    </div>
                                </div>

                                <div class="btn-action position-relative z-10 d-none d-sm-block">
                                    <span class="badge rounded-pill bg-primary px-4 py-2 fw-bold shadow-lg">
                                        CARI LINK <i class="bi bi-search ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <style>
                    /* Container Utama */
                    .pintas-card {
                        background: linear-gradient(145deg, #1a1d29, #11131b);
                        border: 1px solid rgba(59, 130, 246, 0.3);
                        border-radius: 12px;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
                    }

                    /* Hover Effect: Border Menyala */
                    .pintas-card:hover {
                        border-color: #3b82f6;
                        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2);
                        transform: translateY(-2px);
                    }

                    /* Animasi Roket */
                    .rocket-emoji {
                        font-size: 2.2rem;
                        animation: rocketFloat 3s ease-in-out infinite;
                        position: relative;
                        z-index: 2;
                    }
                    .rocket-glow {
                        position: absolute;
                        width: 40px; height: 40px;
                        background: rgba(59, 130, 246, 0.6);
                        filter: blur(15px);
                        border-radius: 50%;
                        top: 50%; left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                        animation: pulseGlow 2s infinite;
                    }

                    /* Efek Kilau Berjalan */
                    .shine-effect {
                        position: absolute;
                        top: 0; left: -100%;
                        width: 50%; height: 100%;
                        background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
                        transform: skewX(-25deg);
                        animation: shinePass 6s infinite;
                    }

                    @keyframes rocketFloat {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-6px) rotate(5deg); }
                    }
                    @keyframes pulseGlow {
                        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
                    }
                    @keyframes shinePass {
                        0% { left: -100%; }
                        20% { left: 200%; } /* Cepat lewat */
                        100% { left: 200%; } /* Diam sebentar */
                    }
                    .fade-in-pintas { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
                    @keyframes fadeIn { to { opacity: 1; } }
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
