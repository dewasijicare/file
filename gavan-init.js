<script>
(function() {
    // --- INISIALISASI SKRIP ---
    document.addEventListener('DOMContentLoaded', () => {
        // Pastikan semua fungsi sudah ada sebelum dijalankan
        if (typeof setupPersistentCountdownIntervals !== 'function' || typeof styleProfilePage !== 'function') {
            console.error('Gavan Functions not loaded yet!');
            return;
        }

        setupPersistentCountdownIntervals();
        createSidebarToggleButton();
        runAllOtherScripts();
        injectGacorGame();
        
        const observerCallback = () => {
            initializeSwipeableHeaderMenu();
            updateProfileElements();
            addSidebarBalanceToggle();
            addMainBalanceToggle();
            styleMemberStatusPanel();
            styleTogelTutorialPage();
            initializeTogelCarousel();
            
            const depositForm = document.querySelector('#deposit-form');
            if (depositForm) {
                initializeDepositForm(depositForm);
                updateDepositFormUI(depositForm);
            }
            
            styleWithdrawForm();
            styleRtpModal();
            
            document.querySelectorAll('input[type="password"]:not([data-toggle-added="true"])').forEach(input => {
                addPasswordToggle(input);
            });

            styleBettingPage(); 
            styleQuickLogin();
            styleLoginPage();
            styleRegisterPage(); 
            styleProfilePage();
            styleLogoutButton();
            styleChangePasswordPage();
        };
        
        observer = new MutationObserver(observerCallback);
        observer.observe(document.body, { childList: true, subtree: true });
        
        observerCallback(); 
        
        document.body.addEventListener('change', (event) => {
            if (event.target.id === 'agentmemberbankid') {
                const receiverBankSpan = document.getElementById('receiver-bank');
                if (receiverBankSpan) delete receiverBankSpan.dataset.iconApplied;
            }
        });
        
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            const toggleButton = document.getElementById("custom-sidebar-toggle");
            const toggleObserver = new MutationObserver(() => {
                if (toggleButton) {
                    sidebar.classList.contains("active") ? toggleButton.classList.add("show") : toggleButton.classList.remove("show");
                }
            });
            toggleObserver.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
        }
    });
})();</script>