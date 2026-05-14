document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle between Login and Signup forms
    const switchLinks = document.querySelectorAll('.switch-link');
    const authCard = document.querySelector('.auth-card');

    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Fix height during transition to make it smooth
            authCard.style.height = authCard.offsetHeight + 'px';
            
            const currentView = document.querySelector('.form-view.active');
            const nextView = document.getElementById(targetId);
            
            if (currentView === nextView) return;

            // Transition logic
            currentView.classList.remove('active');
            currentView.classList.add('slide-out-left');
            
            setTimeout(() => {
                currentView.classList.remove('slide-out-left');
                currentView.style.display = 'none';
                
                nextView.style.display = 'block';
                // Force reflow
                void nextView.offsetWidth;
                
                // Adjust height for new content
                const newHeight = nextView.scrollHeight + 80; // Add padding
                authCard.style.height = newHeight + 'px';
                
                nextView.classList.add('active');
                
                // Clean up inline height after transition
                setTimeout(() => {
                    authCard.style.height = 'auto';
                }, 400);
            }, 300); // Wait for fade out
        });
    });

    // 2. Toggle Password Visibility
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // 3. Form Validation and Dummy Submit
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(input, message) {
        const group = input.closest('.input-group');
        group.classList.add('error');
        const errorText = group.querySelector('.error-text');
        if(errorText) errorText.textContent = message;
    }

    function clearError(input) {
        const group = input.closest('.input-group');
        group.classList.remove('error');
    }

    // Clear errors on input
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
    });

    // Login Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const emailInput = document.getElementById('loginEmail');
            const passInput = document.getElementById('loginPassword');
            
            clearError(emailInput);
            clearError(passInput);
            
            if (!emailInput.value || !emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!passInput.value) {
                showError(passInput, 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                const btn = loginForm.querySelector('.submit-btn');
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Authenticating...</span>';
                btn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    showToast('Successfully logged in!', 'success');
                    // Redirect simulation
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 1500);
            }
        });
    }

    // Signup Submit
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const nameInput = document.getElementById('signupName');
            const deptInput = document.getElementById('signupDept');
            const levelInput = document.getElementById('signupLevel');
            const emailInput = document.getElementById('signupEmail');
            const passInput = document.getElementById('signupPassword');
            const confirmPassInput = document.getElementById('signupConfirmPassword');
            const termsCheck = document.getElementById('termsCheck');
            
            // Basic validation
            [nameInput, deptInput, levelInput, emailInput, passInput, confirmPassInput].forEach(clearError);
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Full name is required');
                isValid = false;
            }
            
            if (!deptInput.value.trim()) {
                showError(deptInput, 'Department is required');
                isValid = false;
            }
            
            if (!levelInput.value) {
                showError(levelInput, 'Level is required');
                isValid = false;
            }
            
            if (!emailInput.value || !emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (passInput.value.length < 8) {
                showError(passInput, 'Min 8 characters required');
                isValid = false;
            }
            
            if (passInput.value !== confirmPassInput.value) {
                showError(confirmPassInput, 'Passwords do not match');
                isValid = false;
            }
            
            if (!termsCheck.checked) {
                showToast('Please accept the Terms & Conditions', 'error');
                isValid = false;
            }
            
            if (isValid) {
                const btn = signupForm.querySelector('.submit-btn');
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Creating Account...</span>';
                btn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    showToast('Account created successfully! Please login.', 'success');
                    
                    // Switch to login tab
                    setTimeout(() => {
                        document.querySelector('[data-target="loginView"]').click();
                    }, 1500);
                }, 2000);
            }
        });
    }

    // Toast Notification System
    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if(container.contains(toast)) container.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Social buttons interaction
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showToast(`Connecting to ${provider}...`, 'success');
        });
    });
});
