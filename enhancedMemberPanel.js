(function() {
    // CSS untuk styling panel member baru (Layout Grid 2x2 Atas)
    const panelStyles = `
        #member-status-panel.gavan-member-panel-enhanced {
            background: linear-gradient(135deg, #f1c40f, #e67e22) !important;
            border: 1px solid #f39c12 !important;
            box-shadow: 0 0 12px rgba(243, 156, 18, 0.4) !important;
            border-radius: 10px !important;
            padding: 0.6rem 0.8rem !important;
            color: #2c3e50 !important;
            display: flex;
            flex-direction: column;
            gap: 0.5rem !important; /* Jarak antara top-area dan buttons sedikit ditambah */
            transition: all 0.2s ease;
        }

        #member-status-panel.gavan-member-panel-enhanced:hover {
             box-shadow: 0 3px 18px rgba(230, 126, 34, 0.5) !important;
             transform: translateY(-1px);
        }

        /* === AREA ATAS (GRID 2x2) === */
        .gmp-top-area {
            display: grid;
            grid-template-columns: 1fr auto; /* Kolom kiri isi sisa, Kolom kanan auto */
            grid-template-rows: auto auto; /* 2 baris, tinggi otomatis */
            align-items: baseline; /* Sejajarkan baseline teks per baris */
            width: 100%;
            row-gap: 0.1rem; /* Jarak vertikal antar baris grid */
            column-gap: 0.5rem; /* Jarak horizontal antar kolom grid */
        }
        /* ============================ */

        /* Styling untuk label Saldo (Kiri Atas) */
        .gmp-balance-label {
            grid-column: 1; grid-row: 1; /* Posisi Grid */
            font-size: 0.8em;
            font-weight: 600;
            color: #2c3e50;
            line-height: 1.1;
            text-transform: uppercase; /* Uppercase */
            text-align: left;
            align-self: end; /* Rata bawah di sel grid */
        }

         /* Styling untuk Nama Username (Kanan Atas) */
         .gmp-user-id-value {
             grid-column: 2; grid-row: 1; /* Posisi Grid */
             /* === UKURAN FONT SAMA DENGAN SALDO === */
             font-size: 1.6em !important;
             /* ==================================== */
             font-weight: 700 !important;
             color: #1a252f !important; /* Warna gelap */
             line-height: 1;
             text-align: right;
             align-self: end; /* Rata bawah di sel grid */
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
             max-width: 150px; /* Batasi lebar username jika terlalu panjang */
        }

        /* Styling untuk Nilai Saldo (Kiri Bawah) */
        .gmp-balance-value {
            grid-column: 1; grid-row: 2; /* Posisi Grid */
            font-size: 1.6em !important;
            font-weight: 700 !important;
            line-height: 1 !important;
            color: #2c3e50 !important;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: baseline;
            white-space: nowrap;
            text-align: left;
            align-self: start; /* Rata atas di sel grid */
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
            font-size: 0.8em !important;
            margin-left: 6px !important;
            cursor: pointer;
            color: #2c3e50 !important;
            vertical-align: middle;
        }
         .gmp-balance-value .balance-toggle-icon:hover {
             color: #000 !important;
         }

         /* Teks Kecil di Kanan Bawah (Placeholder ID) */
        .gmp-user-info-extra {
            grid-column: 2; grid-row: 2; /* Posisi Grid */
            font-size: 0.75em;
            font-weight: 500;
            color: rgba(44, 62, 80, 0.8);
            line-height: 1;
            text-align: right;
            align-self: start; /* Rata atas di sel grid */
            text-transform: uppercase;
        }


         /* Kontainer untuk tombol */
         .gmp-buttons-container {
             display: flex;
             justify-content: space-between;
             gap: 0.5rem !important;
             width: 100%;
             margin-top: 0.5rem !important; /* Jarak dari grid atas */
         }

         /* Styling tombol aksi (Deposit/Withdraw) - Kecil */
         .gmp-action-btn {
             flex: 1;
             padding: 0.25rem 0.5rem !important;
             font-size: 0.75em !important;
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 4px;
             border-radius: 5px !important;
             white-space: nowrap;
             border: none !important;
             transition: all 0.2s ease !important;
         }

         /* Warna Tombol (Sama seperti sebelumnya) */
          .gmp-action-btn.btn-primary {
             background: linear-gradient(45deg, #1a252f, #2c3e50) !important;
             color: #ecf0f1 !important;
             border: 1px solid rgba(255, 255, 255, 0.3) !important;
             box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0px rgba(255,255,255,0.1);
          }
          .gmp-action-btn.btn-primary:hover {
              background: linear-gradient(45deg, #2c3e50, #34495e) !important;
              border-color: rgba(255, 255, 255, 0.5) !important;
              box-shadow: 0 2px 5px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15);
              transform: translateY(-1px);
          }
           .gmp-action-btn.btn-secondary {
             background: linear-gradient(45deg, #465a70, #566573) !important;
             color: #ecf0f1 !important;
             border: 1px solid rgba(255, 255, 255, 0.2) !important;
             box-shadow: 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0px rgba(255,255,255,0.05);
          }
           .gmp-action-btn.btn-secondary:hover {
             background: linear-gradient(45deg, #566573, #6c757d) !important;
             border-color: rgba(255, 255, 255, 0.3) !important;
             box-shadow: 0 2px 5px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1);
             transform: translateY(-1px);
          }

          .gmp-action-btn i.bi {
              font-size: 1.1em;
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
        // Ambil ID number jika ada, jika tidak, kosongkan saja atau beri placeholder
        let idNumber = ""; // Kosongkan saja jika tidak ada ID terpisah
        // Jika Anda ingin menampilkan teks statis seperti "Member ID":
        let idLabelText = "Member ID"; // Atau biarkan kosong: ""

        panel.innerHTML = ''; // Kosongkan panel

        // === STRUKTUR HTML BARU (Grid 2x2 Atas) ===
        panel.innerHTML = `
            <div class="gmp-top-area">
                <div class="gmp-balance-label">SALDO AKTIF</div>
                <div class="gmp-user-id-value">${userId}</div>
                <div class="gmp-balance-value">
                    <span class="balance-value">${originalBalanceValue}</span>
                    <span class="currency-label"> IDR</span>
                    </div>
                <div class="gmp-user-info-extra">${idLabelText}</div>
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

        console.log("Member status panel enhanced (Grid Layout).");
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
