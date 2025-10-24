(function() {
    // CSS untuk styling panel member baru (lebih ringkas, layout horizontal atas)
    const panelStyles = `
        /* Target panel yang sudah diberi class baru */
        #member-status-panel.gavan-member-panel-enhanced {
            background: linear-gradient(135deg, #f1c40f, #e67e22) !important;
            border: 1px solid #f39c12 !important;
            box-shadow: 0 0 12px rgba(243, 156, 18, 0.4) !important; /* Glow lebih halus */
            border-radius: 10px !important; /* Radius lebih kecil */
            /* === PADDING LEBIH KECIL === */
            padding: 0.6rem 0.8rem !important;
            /* ========================= */
            color: #2c3e50 !important;
            display: flex;
            flex-direction: column;
            /* === GAP LEBIH KECIL === */
            gap: 0.4rem !important; /* Jarak antara top-area dan buttons */
            /* ======================= */
            transition: all 0.2s ease; /* Transisi lebih cepat */
        }

        #member-status-panel.gavan-member-panel-enhanced:hover {
             box-shadow: 0 3px 18px rgba(230, 126, 34, 0.5) !important;
             transform: translateY(-1px); /* Angkat sedikit saja */
        }

        /* === AREA ATAS (SALDO & ID) === */
        .gmp-top-area {
            display: flex;
            justify-content: space-between; /* Saldo kiri, ID kanan */
            align-items: center; /* Sejajar vertikal */
            width: 100%;
        }
        /* ============================ */

        /* Area Saldo (di kiri) */
        .gmp-balance-area {
            text-align: left;
        }

        /* Area ID (di kanan) */
        .gmp-user-id-area {
            text-align: right;
        }

        /* Styling untuk ID Pengguna (di kanan) */
        .gmp-user-id {
            font-size: 0.8em; /* Lebih kecil */
            font-weight: 500;
            color: rgba(44, 62, 80, 0.8);
            line-height: 1.1; /* Rapatkan */
        }
         .gmp-user-id strong { /* Jika ID dibungkus strong */
              font-weight: 600;
              color: #2c3e50;
         }


        /* Styling untuk label Saldo (di kiri) */
        .gmp-balance-label {
            font-size: 0.8em; /* Lebih kecil */
            font-weight: 600;
            margin-bottom: 0;
            color: #2c3e50;
            line-height: 1.1; /* Rapatkan */
        }

        /* Styling untuk Nilai Saldo (di kiri) */
        .gmp-balance-value {
            font-size: 1.6em !important; /* Ukuran font saldo lebih kecil lagi */
            font-weight: 700 !important;
            line-height: 1 !important; /* Sangat rapat */
            color: #2c3e50 !important;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: baseline; /* Sejajarkan baseline teks */
            white-space: nowrap; /* Jangan pindah baris */
        }
         .gmp-balance-value .currency-label {
             font-size: 0.5em;
             vertical-align: baseline;
             margin-left: 4px;
             font-weight: 500;
             opacity: 0.9;
         }


        /* Styling ikon mata (Toggle Saldo) */
        .gmp-balance-value .balance-toggle-icon {
            font-size: 0.8em !important; /* Icon sedikit lebih besar relatif thd saldo */
            margin-left: 6px !important;
            cursor: pointer;
            color: #2c3e50 !important;
            vertical-align: middle; /* Tengah vertikal */
        }
         .gmp-balance-value .balance-toggle-icon:hover {
             color: #000 !important;
         }

         /* Kontainer untuk tombol */
         .gmp-buttons-container {
             display: flex;
             justify-content: space-between;
             /* === GAP TOMBOL LEBIH KECIL === */
             gap: 0.5rem !important;
             /* ============================ */
             width: 100%;
             margin-top: 0.4rem !important; /* Jarak dari atas dikurangi */
         }

         /* Styling tombol aksi (Deposit/Withdraw) - LEBIH KECIL */
         .gmp-action-btn {
             flex: 1;
             /* === PADDING & FONT LEBIH KECIL === */
             padding: 0.25rem 0.5rem !important;
             font-size: 0.75em !important;
             /* ================================= */
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 4px; /* Jarak ikon & teks lebih kecil */
             border-radius: 5px !important; /* Sudut lebih kecil */
             white-space: nowrap; /* Jangan pindah baris teks tombol */
         }
         /* Override jika perlu */
          .gmp-action-btn.btn-primary {
             box-shadow: 0 0 6px rgba(0, 234, 255, 0.7), inset 0 0 3px rgba(255,255,255,.2) !important;
          }
           .gmp-action-btn.btn-secondary {
             background: linear-gradient(45deg,#465a70,#34495e)!important;
             border-color: #566573 !important;
             color: #ecf0f1 !important;
             box-shadow: 0 0 6px rgba(52, 73, 94, 0.6),inset 0 0 3px rgba(255,255,255,.1) !important;
          }
           .gmp-action-btn.btn-secondary:hover {
             transform: scale(1.03); /* Hover lebih halus */
             background: linear-gradient(45deg,#566573,#465a70)!important;
             box-shadow: 0 0 10px #566573, 0 0 15px #7f8c8d, inset 0 0 4px rgba(255,255,255,.2) !important;
          }

          /* Pastikan ikon di tombol tidak terlalu besar */
          .gmp-action-btn i.bi {
              font-size: 1.1em; /* Sesuaikan ukuran ikon di tombol */
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

        // === STRUKTUR HTML BARU (Horizontal Atas) ===
        panel.innerHTML = `
            <div class="gmp-top-area">
                <div class="gmp-balance-area">
                    <div class="gmp-balance-label">Saldo Aktif</div>
                    <div class="gmp-balance-value">
                        <span class="balance-value">${originalBalanceValue}</span>
                        <span class="currency-label"> IDR</span>
                        </div>
                </div>
                <div class="gmp-user-id-area">
                    <div class="gmp-user-id">ID: <strong>${userId}</strong></div>
                    </div>
            </div>
            <div class="gmp-buttons-container">
                <a href="/deposit" class="btn btn-primary gmp-action-btn"><i class="bi bi-wallet2"></i> Deposit</a>
                <a href="/withdraw" class="btn btn-secondary gmp-action-btn"><i class="bi bi-cash-coin"></i> Withdraw</a>
            </div>
        `;
        // ============================================

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
                         const sidebarOriginalValue = originalBalanceValue.replace(/[^\d.]/g, '');
                         sidebarValue.textContent = formatNumberWithCommas(sidebarOriginalValue);
                     }
                 }
            };

            newToggleIcon.addEventListener('click', (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 const currentState = (localStorage.getItem('balanceVisibility') || 'visible');
                 const newState = currentState === 'visible' ? 'hidden' : 'visible';
                 localStorage.setItem('balanceVisibility', newState);
                 updateView(newState);
            });

             updateView(storedState);
        }

        panel.classList.add('gavan-member-panel-enhanced');
        panel.classList.remove('glassmorphism', 'py-3', 'my-3', 'text-center');
        panel.dataset.enhanced = 'true';

        console.log("Member status panel enhanced (compact horizontal).");
    }

     function formatNumberWithCommas(val) {
        if (val === null || val === undefined) return '';
        let stringVal = val.toString().replace(/,/g, '');
        if (isNaN(stringVal) || stringVal.trim() === '') return '';
        try {
            return Number(stringVal).toLocaleString('en-US');
        } catch (e) {
            return stringVal;
        }
    }

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
