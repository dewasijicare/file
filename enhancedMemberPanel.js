(function() {
    // CSS untuk styling panel member baru
    const panelStyles = `
        /* Target panel yang sudah diberi class baru */
        #member-status-panel.gavan-member-panel-enhanced {
            background: linear-gradient(135deg, #f1c40f, #e67e22) !important; /* Gradient Kuning-Oranye */
            border: 1px solid #f39c12 !important; /* Border oranye sedikit gelap */
            box-shadow: 0 0 20px rgba(243, 156, 18, 0.6) !important; /* Glow oranye */
            border-radius: 15px !important; /* Sesuaikan dengan style card Anda */
            padding: 1.25rem !important;
            color: #2c3e50 !important; /* Teks gelap agar kontras di background terang */
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 0.75rem; /* Jarak antar elemen di dalam panel */
            transition: all 0.3s ease;
        }

        #member-status-panel.gavan-member-panel-enhanced:hover {
             box-shadow: 0 5px 30px rgba(230, 126, 34, 0.7) !important; /* Glow lebih terang saat hover */
             transform: translateY(-3px);
        }

        /* Styling untuk ID Pengguna */
        .gmp-user-id {
            font-size: 0.9em;
            font-weight: 500;
            color: rgba(44, 62, 80, 0.85); /* Sedikit transparan */
            margin-bottom: 0.25rem;
        }

        /* Styling untuk label Saldo */
        .gmp-balance-label {
            font-size: 0.95em;
            font-weight: 600;
            margin-bottom: 0.1rem;
             color: #2c3e50;
        }

        /* Styling untuk Nilai Saldo */
        .gmp-balance-value {
            font-size: 2.2em !important; /* Ukuran font saldo besar */
            font-weight: 700 !important;
            line-height: 1.2 !important;
            color: #2c3e50 !important; /* Warna saldo utama */
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5); /* Shadow tipis agar terbaca */
            display: inline-flex; /* Agar ikon bisa sejajar */
            align-items: center;
        }

        /* Styling ikon mata (Toggle Saldo) */
        .gmp-balance-value .balance-toggle-icon {
            font-size: 0.7em !important; /* Ukuran ikon relatif terhadap saldo */
            margin-left: 10px !important;
            cursor: pointer;
            color: #2c3e50 !important; /* Warna ikon */
            vertical-align: middle;
        }
         .gmp-balance-value .balance-toggle-icon:hover {
             color: #000 !important;
         }

         /* Kontainer untuk tombol */
         .gmp-buttons-container {
             display: flex;
             justify-content: space-between; /* Tombol di sisi berlawanan */
             gap: 0.75rem; /* Jarak antar tombol */
             width: 100%; /* Lebar penuh */
             margin-top: 0.75rem;
         }

         /* Styling tombol aksi (Deposit/Withdraw) */
         .gmp-action-btn {
             flex: 1; /* Agar kedua tombol sama lebar */
             /* Menggunakan gaya dari tema utama Anda */
             /* Pastikan class .btn-primary & .btn-secondary sudah didefinisikan di CSS utama */
             padding: 0.6rem 1rem !important;
             font-size: 0.9em !important;
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 8px; /* Jarak ikon dan teks */
         }
         /* Override jika perlu (contoh: pastikan shadow sesuai) */
          .gmp-action-btn.btn-primary {
             box-shadow: 0 0 10px #00eaff, inset 0 0 5px rgba(255,255,255,.4) !important;
          }
           .gmp-action-btn.btn-secondary {
             /* Gunakan gaya btn-secondary dari tema utama Anda jika berbeda */
             background: linear-gradient(45deg,#2c3e50,#1a252f)!important;
             border-color: #34495e !important;
             color: #ecf0f1 !important;
             box-shadow: 0 0 10px #34495e,inset 0 0 5px rgba(255,255,255,.2) !important;
          }
           .gmp-action-btn.btn-secondary:hover {
             transform: scale(1.05);
             background: linear-gradient(45deg,#34495e,#2c3e50)!important;
             box-shadow: 0 0 15px #34495e, 0 0 20px #566573, inset 0 0 5px rgba(255,255,255,.3) !important;
          }

    `;

    // Fungsi untuk memodifikasi panel member
    function styleEnhancedMemberPanel() {
        const panel = document.getElementById('member-status-panel');
        if (!panel || panel.dataset.enhanced === 'true') {
            return; // Hentikan jika panel tidak ada atau sudah dimodif
        }

        // 1. Simpan elemen penting yang ada
        const usernameElement = panel.querySelector('strong');
        const balanceSpan = panel.querySelector('.text-gradient');
        const originalBalanceValue = balanceSpan ? balanceSpan.textContent.trim() : '0';
        const toggleIconElement = panel.querySelector('.balance-toggle-icon'); // Simpan ikon yang ada

        // Ambil ID dari username jika formatnya "Halo, [USERNAME]" atau hanya [USERNAME]
        let userId = usernameElement ? usernameElement.textContent.replace('Halo,', '').trim() : 'N/A';

        // 2. Kosongkan panel
        panel.innerHTML = '';

        // 3. Buat struktur HTML baru
        panel.innerHTML = `
            <div class="gmp-user-id">ID: ${userId}</div>
            <div class="gmp-balance-area">
                 <div class="gmp-balance-label">Total Aset</div>
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

        // 4. Tambahkan kembali ikon mata dan fungsionalitasnya
        const balanceValueContainer = panel.querySelector('.gmp-balance-value');
        if (balanceValueContainer) {
            const newToggleIcon = document.createElement('i');
            // Salin class dari ikon asli atau set default
            newToggleIcon.className = toggleIconElement ? toggleIconElement.className : 'bi bi-eye-fill balance-toggle-icon';
            newToggleIcon.style.cursor = 'pointer'; // Pastikan cursor pointer

            balanceValueContainer.appendChild(newToggleIcon);

            // Re-attach event listener untuk toggle
            const valueSpan = balanceValueContainer.querySelector('.balance-value');
            const storedState = localStorage.getItem('balanceVisibility') || 'visible';

            const updateView = (state) => {
                 if (!valueSpan) return;
                 if (state === 'hidden') {
                    valueSpan.textContent = '•••••';
                    newToggleIcon.className = 'bi bi-eye-slash-fill balance-toggle-icon';
                 } else {
                    valueSpan.textContent = originalBalanceValue; // Gunakan nilai asli yang disimpan
                    newToggleIcon.className = 'bi bi-eye-fill balance-toggle-icon';
                 }
                 // Update juga ikon di sidebar jika ada
                 const sidebarIcon = document.querySelector("#sidebar .balance-toggle-icon");
                 const sidebarValue = document.querySelector("#sidebar .balance-value");
                 if(sidebarIcon && sidebarValue){
                     sidebarIcon.className = newToggleIcon.className;
                     if(state === 'hidden') sidebarValue.textContent = '•••••';
                     else sidebarValue.textContent = originalBalanceValue; // Asumsi format saldo sama
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

             // Terapkan state awal saat load
             updateView(storedState);
        }


        // 5. Tambahkan class penanda dan styling
        panel.classList.add('gavan-member-panel-enhanced');
        // Hapus class lama jika ada (glassmorphism mungkin ingin dipertahankan atau dihapus)
        panel.classList.remove('glassmorphism', 'py-3', 'my-3', 'text-center'); // Hapus class lama yg tidak perlu
        panel.dataset.enhanced = 'true'; // Tandai sudah dimodif

        console.log("Member status panel enhanced.");
    }

    // Fungsi untuk inject CSS ke head
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

    // Jalankan saat DOM siap dan gunakan Observer
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        styleEnhancedMemberPanel();

        const observer = new MutationObserver((mutations) => {
            // Cek jika panel muncul atau berubah
            const panel = document.getElementById('member-status-panel');
             // Hanya jalankan jika panel ada TAPI belum di-enhance
            if (panel && !panel.dataset.enhanced) {
                 styleEnhancedMemberPanel();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        styleEnhancedMemberPanel(); // Panggil lagi
    });

    // Panggil jika skrip di-inject setelah DOM load
    if (document.readyState === 'complete') {
         injectStyles();
         styleEnhancedMemberPanel();
    }

})();