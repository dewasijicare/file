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
                        justify-content: center;
                        background: rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(10px);
                        
                        /* PERUBAHAN DISINI: Border Kuning Lebih Tebal */
                        border: 2px solid #fbbf24; 
                        box-shadow: 0 0 15px rgba(251, 191, 36, 0.2);
                        
                        border-radius: 80px;
                        padding: 10px 15px;
                        position: relative;
                        overflow: hidden;
                        transition: all 0.3s ease;
                    }

                    /* Efek Hover: Border Lebih Terang & Glow Kuat */
                    .pintas-neon-bar:hover {
                        border-color: #fcd34d;
                        box-shadow: 0 0 25px rgba(251,
