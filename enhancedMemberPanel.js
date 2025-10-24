(function() {
    // CSS untuk styling panel member baru (lebih ringkas)
    const panelStyles = `
        /* Target panel yang sudah diberi class baru */
        #member-status-panel.gavan-member-panel-enhanced {
            background: linear-gradient(135deg, #f1c40f, #e67e22) !important; /* Gradient Kuning-Oranye */
            border: 1px solid #f39c12 !important; /* Border oranye sedikit gelap */
            box-shadow: 0 0 15px rgba(243, 156, 18, 0.5) !important; /* Glow oranye (sedikit redup) */
            border-radius: 12px !important; /* Sedikit lebih kecil radiusnya */
            /* === PENGURANGAN PADDING === */
            padding: 0.8rem 1rem !important; /* Padding atas/bawah dikurangi */
            /* ========================= */
            color: #2c3e50 !important; /* Teks gelap agar kontras */
            text-align: center;
            display: flex;
            flex-direction: column;
            /* === PENGURANGAN GAP === */
            gap: 0.4rem !important; /* Jarak antar elemen lebih kecil */
            /* ======================= */
            transition: all 0.3s ease;
        }

        #member-status-panel.gavan-member-panel-enhanced:hover {
             box-shadow: 0 4px 20px rgba(230, 126, 34, 0.6) !important; /* Glow sedikit beda saat hover */
             transform: translateY(-2px); /* Efek angkat sedikit */
        }

        /* Styling untuk ID Pengguna */
        .gmp-user-id {
            font-size: 0.85em; /* Sedikit lebih kecil */
            font-weight: 500;
            color: rgba(44, 62, 80, 0.85);
            /* margin-bottom: 0.1rem; (Gap sudah cukup) */
        }

        /* Styling untuk label Saldo */
        .gmp-balance-label {
            font-size: 0.9em; /* Sedikit lebih kecil */
            font-weight: 600;
            margin-bottom: 0; /* Hapus margin bawah */
             color: #2c3e50;
        }

        /* Styling untuk Nilai Saldo */
        .gmp-balance-value {
            /* === PENGURANGAN FONT SALDO === */
            font-size: 1.9em !important; /* Ukuran font saldo dikurangi */
            /* ============================ */
            font-weight: 700 !important;
            line-height: 1.1 !important; /* Line height lebih rapat */
            color: #2c3e50 !important;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.4);
            display: inline-flex;
            align-items: center;
        }

        /* Styling ikon mata (Toggle Saldo) */
        .gmp-balance-value .balance-toggle-icon {
            font-size: 0.7em !important;
            margin-left: 8px !important; /* Jarak ikon sedikit dikurangi */
            cursor: pointer;
            color: #2c3e50 !important;
            vertical-align: middle;
        }
         .gmp-balance-value .balance-toggle-icon:hover {
             color: #000 !important;
         }

         /* Kontainer untuk tombol */
         .gmp-buttons-container {
             display: flex;
             justify-content: space-between;
             gap: 0.6rem; /* Jarak antar tombol sedikit dikurangi */
             width: 100%;
             /* === PENGURANGAN MARGIN TOMBOL === */
             margin-top: 0.5rem !important; /* Jarak dari saldo dikurangi */
             /* =============================== */
         }

         /* Styling tombol aksi (Deposit/Withdraw) */
         .gmp-action-btn {
             flex: 1;
             padding: 0.5rem 0.8rem !important; /* Padding tombol dikurangi */
             font-size: 0.85em !important; /* Font tombol dikurangi */
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 6px; /* Jarak ikon & teks tombol dikurangi */
             border-radius: 6px !important; /* Sudut tombol lebih kecil */
         }
         /* Override jika perlu */
          .gmp-action-btn.btn-primary {
             box-shadow: 0 0 8px rgba(0, 234, 255, 0.8), inset 0 0 4px rgba(255,255,255,.3) !important;
          }
           .gmp-action-btn.btn-secondary {
             background: linear-gradient(45deg,#465a70,#34495e)!important; /* Warna secondary lebih gelap */
             border-color: #566573 !important;
             color: #ecf0f1 !important;
             box-shadow: 0 0 8px rgba(52, 73, 94, 0.7),inset 0 0 4px rgba(255,255,255,.1) !important;
          }
           .gmp-action-btn.btn-secondary:hover {
             transform: scale(1.05);
             background: linear-gradient(45deg,#566573,#465a70)!important;
             box-shadow: 0 0 12px #566573, 0 0 18px #7f8c8d, inset 0 0 4px rgba(255,255,255,.2) !important;
          }

    `;

    // Fungsi untuk memodifikasi panel member
    function styleEnhancedMemberPanel() {
        const panel = document.getElementById('member-status-panel');
        if (!panel || panel.dataset.enhanced === 'true') {
            return;
        }

        const usernameElement = panel.querySelector('strong');
        const balanceSpan = panel.querySelector('.text-gradient');
        const originalBalanceValue = balanceSpan ? balanceSpan.textContent.trim() : '0';
        const toggleIconElement = panel.querySelector('.balance-toggle-icon');

        let userId = usernameElement ? usernameElement.textContent.replace('Halo,', '').trim() : 'N/A';

        panel.innerHTML = ''; // Kosongkan panel

        // === PERUBAHAN LABEL ===
        panel.innerHTML = `
            <div class="gmp-user-id">ID: ${userId}</div>
            <div class="gmp-balance-area">
                 <div class="gmp-balance-label">Saldo Aktif</div>
                 <div class="gmp-balance-value">
                    <span class="balance-value">${originalBalanceValue}</span>
                    <span style="font-size: 0.5em; vertical-align: middle; margin-left: 5px;"> IDR</span>
                    </div>
            </div>
            <div class="gmp-buttons-container">
                <a href="/deposit" class="btn btn-primary gmp-action-btn"><i class="bi bi-wallet2"></i> Deposit</a>
                <a href="/withdraw" class="btn btn-secondary gmp-action-btn"><i class="bi bi-cash-coin"></i> Withdraw</a>
            </div>
        `;
        // =======================

        const balanceValueContainer = panel.querySelector('.gmp-balance-value');
        if (balanceValueContainer) {
            const newToggleIcon = document.createElement('i');
            newToggleIcon.className = toggleIconElement ? toggleIconElement.className : 'bi bi-eye-fill balance-toggle-icon';
            newToggleIcon.style.cursor = 'pointer';

            balanceValueContainer.appendChild(newToggleIcon);

            const valueSpan = balanceValueContainer.querySelector('.balance-value');
            const storedState = localStorage.getItem('balanceVisibility') || 'visible';

            const updateView = (state) => {
                 if (!valueSpan) return;
                 if (state === 'hidden') {
                    valueSpan.textContent = '•••••';
                    newToggleIcon.className = 'bi bi-eye-slash-fill balance-toggle-icon';
                 } else {
                    valueSpan.textContent = originalBalanceValue;
                    newToggleIcon.className = 'bi bi-eye-fill balance-toggle-icon';
                 }
                 const sidebarIcon = document.querySelector("#sidebar .balance-toggle-icon");
                 const sidebarValue = document.querySelector("#sidebar .balance-value");
                 if(sidebarIcon && sidebarValue){
                     sidebarIcon.className = newToggleIcon.className;
                     if(state === 'hidden') sidebarValue.textContent = '•••••';
                     else {
                         // Coba format nilai sidebar jika perlu (asumsi nilai sama)
                         const sidebarOriginalValue = originalBalanceValue.replace(/[^\d.]/g, ''); // Ambil angka saja
                         sidebarValue.textContent = formatNumberWithCommas(sidebarOriginalValue); // Gunakan fungsi format jika ada
                     }
                 }
            };

            // Event listener di-attach lagi
             newToggleIcon.addEventListener('click', (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 const currentState = (localStorage.getItem('balanceVisibility') || 'visible');
                 const newState = currentState === 'visible' ? 'hidden' : 'visible';
                 localStorage.setItem('balanceVisibility', newState);
                 updateView(newState);
            });

             updateView(storedState); // Terapkan state awal
        }

        panel.classList.add('gavan-member-panel-enhanced');
        panel.classList.remove('glassmorphism', 'py-3', 'my-3', 'text-center');
        panel.dataset.enhanced = 'true';

        console.log("Member status panel enhanced (compact).");
    }

    // Fungsi format angka (diperlukan untuk update sidebar)
     function formatNumberWithCommas(val) {
        if (val === null || val === undefined) return '';
        let stringVal = val.toString().replace(/,/g, '');
        if (isNaN(stringVal) || stringVal.trim() === '') return '';
        try {
            // Gunakan locale 'id-ID' jika ingin pemisah ribuan titik
            return Number(stringVal).toLocaleString('en-US');
        } catch (e) {
            return stringVal;
        }
    }

    // Fungsi inject CSS (Sama)
    function injectStyles() {
        if (document.getElementById('gavan-panel-styles')) {
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'gavan-panel-styles';
        styleElement.innerHTML = panelStyles;
        document.head.appendChild(styleElement);
        console.log("Panel styles injected.");
    }

    // Inisialisasi dan Observer (Sama)
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        styleEnhancedMemberPanel();

        const observer = new MutationObserver((mutations) => {
            const panel = document.getElementById('member-status-panel');
            if (panel && !panel.dataset.enhanced) {
                 styleEnhancedMemberPanel();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        styleEnhancedMemberPanel();
    });

    if (document.readyState === 'complete') {
         injectStyles();
         styleEnhancedMemberPanel();
    }

})();
