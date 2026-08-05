/* ===========================
   GLOBAL VARIABLES & CONFIG
=========================== */

const CONFIG = {
    animationDuration: 300,
    debounceDelay: 250,
};

/* ===========================
   UTILITY FUNCTIONS
=========================== */

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ===========================
   PASSWORD TOGGLE FEATURE
=========================== */

function initPasswordToggle() {
    const passwordBoxes = document.querySelectorAll('.password-box');

    passwordBoxes.forEach(box => {
        const eyeIcon = box.querySelector('img');
        const input = box.querySelector('input');

        if (!eyeIcon || !input) return;

        eyeIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            eyeIcon.src = isPassword ? 'images/eye-on.png' : 'images/eye-off.png';
            eyeIcon.style.transition = 'opacity 0.3s ease';
            eyeIcon.style.opacity = '0.8';
        });

        eyeIcon.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });

        eyeIcon.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
        });
    });
}

/* ===========================
   FORM VALIDATION
=========================== */

function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Mohon isi semua field dengan benar', 'error');
            } else {
                e.preventDefault();
                handleFormSubmit(this);
            }
        });

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('focus', function() {
                this.classList.remove('error');
                this.style.borderColor = 'rgba(231, 227, 252, 0.23)';
            });

            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
    const passwordInput = form.querySelector('input[name="password"]');

    if (confirmPasswordInput && passwordInput) {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('error');
            confirmPasswordInput.style.borderColor = '#FF6B6B';
            showNotification('Kata sandi tidak cocok!', 'error');
            isValid = false;
        }
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;

    if (!value) {
        field.classList.add('error');
        field.style.borderColor = '#FF6B6B';
        isValid = false;
    }
    else if (field.name === 'username' && value.length < 3) {
        field.classList.add('error');
        field.style.borderColor = '#FF6B6B';
        isValid = false;
    }
    else if (field.type === 'password' && value.length < 6) {
        field.classList.add('error');
        field.style.borderColor = '#FF6B6B';
        isValid = false;
    }
    else if (type === 'email' && !isValidEmail(value)) {
        field.classList.add('error');
        field.style.borderColor = '#FF6B6B';
        isValid = false;
    }
    else {
        field.classList.remove('error');
        field.style.borderColor = 'rgba(231, 227, 252, 0.23)';
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmit(form) {
    const formId = form.id;
    
    if (formId === 'loginForm') {
        showNotification('✅ Login berhasil!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else if (formId === 'registerForm') {
        showNotification('✅ Pendaftaran berhasil!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

/* ===========================
   GOOGLE AUTH HANDLER
=========================== */

function initGoogleAuth() {
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleGoogleAuth('login');
        });
    }

    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleGoogleAuth('register');
        });
    }
}

function handleGoogleAuth(type) {
    console.log('Google Auth:', type);
    showNotification('🔄 Menghubungkan dengan Google...', 'info');
    
    setTimeout(() => {
        if (type === 'login') {
            showNotification('✅ Login dengan Google Berhasil!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showNotification('✅ Pendaftaran dengan Google Berhasil!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }, 1500);
}

/* ===========================
   FORGOT PASSWORD HANDLER
=========================== */

function initForgotPassword() {
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const backToLoginLink = document.querySelector('.back-to-login');

    if (!forgotPasswordLink) return;

    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        forgotPasswordModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordModal.classList.remove('active');
    });

    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordModal.classList.remove('active');
    });

    forgotPasswordModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailOrUsername = this.querySelector('input[name="emailOrUsername"]').value.trim();

        if (!emailOrUsername) {
            showNotification('Mohon masukkan email atau username', 'error');
            return;
        }

        handleForgotPassword(emailOrUsername);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && forgotPasswordModal.classList.contains('active')) {
            forgotPasswordModal.classList.remove('active');
        }
    });
}

function handleForgotPassword(emailOrUsername) {
    showNotification('🔄 Mengirim link reset password...', 'info');
    
    setTimeout(() => {
        showNotification(`✅ Link reset telah dikirim ke ${emailOrUsername}. Periksa email Anda!`, 'success');
        
        const form = document.getElementById('forgotPasswordForm');
        form.reset();
        
        setTimeout(() => {
            document.getElementById('forgotPasswordModal').classList.remove('active');
        }, 2000);
    }, 1500);
}

/* ===========================
   PROFILE DROPDOWN
=========================== */

function initProfileDropdown() {
    const profileElement = document.querySelector('.profile');
    if (!profileElement) return;

    profileElement.style.cursor = 'pointer';

    profileElement.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const existingDropdown = document.querySelector('.profile-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }

        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <a href="profile.html">
                <span>👤</span> Profil Saya
            </a>
            <a href="settings.html">
                <span>⚙️</span> Pengaturan
            </a>
            <a href="help.html">
                <span>❓</span> Bantuan
            </a>
            <hr style="border: none; border-top: 1px solid rgba(231, 227, 252, 0.23); margin: 8px 0;">
            <a href="login.html" class="logout-btn">
                <span>🚪</span> Keluar
            </a>
        `;

        profileElement.style.position = 'relative';
        profileElement.appendChild(dropdown);

        if (!document.querySelector('style[data-profile-dropdown="true"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-profile-dropdown', 'true');
            style.textContent = `
                .profile-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: rgba(24, 26, 28, 0.95);
                    border: 1px solid rgba(231, 227, 252, 0.23);
                    border-radius: 12px;
                    padding: 8px 0;
                    min-width: 200px;
                    margin-top: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                    animation: slideDown 0.3s ease forwards;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .profile-dropdown a {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #C1C2C4;
                    text-decoration: none;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                }

                .profile-dropdown a:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #FFFFFF;
                    border-left-color: #3254FF;
                    padding-left: 20px;
                }

                .profile-dropdown .logout-btn:hover {
                    background: rgba(255, 107, 107, 0.15);
                    color: #FF6B6B;
                }
            `;
            document.head.appendChild(style);
        }

        document.addEventListener('click', function closeDropdown(e) {
            if (!profileElement.contains(e.target)) {
                const dd = document.querySelector('.profile-dropdown');
                if (dd) dd.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    });
}

/* ===========================
   VOLUME CONTROL
=========================== */

function initVolumeControl() {
    const volumeControl = document.querySelector('.volume-control');
    if (!volumeControl) return;

    let isMuted = false;

    volumeControl.addEventListener('click', function(e) {
        e.preventDefault();
        isMuted = !isMuted;
        
        const icon = this.querySelector('img');
        icon.style.transition = 'transform 0.3s ease';
        icon.style.transform = isMuted ? 'scale(0.8) rotate(-20deg)' : 'scale(1) rotate(0)';
        
        if (isMuted) {
            icon.src = 'images/volume-off.png';
            icon.title = 'Unmute';
        } else {
            icon.src = 'images/volume-icon.png';
            icon.title = 'Mute';
        }

        showNotification(isMuted ? '🔇 Volume Muted' : '🔊 Volume On', 'info');
    });

    volumeControl.style.cursor = 'pointer';
}

/* ===========================
   HERO BUTTONS
=========================== */

function initHeroButtons() {
    const playBtn = document.querySelector('.btn-primary');
    const detailBtn = document.querySelector('.btn-secondary');

    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openVideoPlayer('Duty After School');
        });
    }

    if (detailBtn) {
        detailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openDetailModal('Duty After School');
        });
    }
}

function openVideoPlayer(movieTitle) {
    showNotification(`▶ Playing: ${movieTitle}`, 'success');
    console.log('Opening player for:', movieTitle);
}

function openDetailModal(movieTitle) {
    showNotification(`📺 Detail: ${movieTitle}`, 'info');
    console.log('Opening detail for:', movieTitle);
}

/* ===========================
   MOVIE CARDS INTERACTION
=========================== */

function initMovieCards() {
    const cards = document.querySelectorAll('.landscape-card, .portrait-card');

    cards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(50, 84, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });

        card.addEventListener('click', function(e) {
            e.preventDefault();
            const img = this.querySelector('img');
            const movieTitle = img.alt;
            openVideoPlayer(movieTitle);
        });
    });
}

/* ===========================
   NAVBAR ACTIVE STATE
=========================== */

function initNavbar() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.style.color = '#FFFFFF');
            this.style.color = '#3254FF';
        });
    });
}

/* ===========================
   FOOTER LINKS HANDLER
=========================== */

function initFooterLinks() {
    const footerLinks = document.querySelectorAll('footer a');

    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Jika link adalah file HTML, biarkan navigasi normal
        if (href && href.endsWith('.html')) {
            return;
        }

        link.addEventListener('click', function(e) {
            // Double check jangan intercept HTML files
            if (this.href && this.href.includes('.html')) {
                return;
            }

            e.preventDefault();
            
            const linkText = this.textContent.trim();
            
            if (linkText === 'f') {
                showNotification('📱 Membuka Facebook...', 'info');
            } else if (linkText === '𝕏') {
                showNotification('🐦 Membuka Twitter/X...', 'info');
            } else if (linkText === '📷') {
                showNotification('📸 Membuka Instagram...', 'info');
            } else if (linkText === '▶') {
                showNotification('▶ Membuka YouTube...', 'info');
            } else if (linkText === 'Action') {
                showNotification('🎬 Menampilkan Genre Action...', 'info');
            } else if (linkText === 'Comedy') {
                showNotification('😂 Menampilkan Genre Comedy...', 'info');
            } else if (linkText === 'Drama') {
                showNotification('🎭 Menampilkan Genre Drama...', 'info');
            } else if (linkText === 'Horror') {
                showNotification('😱 Menampilkan Genre Horror...', 'info');
            } else if (linkText === 'Sci-Fi') {
                showNotification('🚀 Menampilkan Genre Sci-Fi...', 'info');
            } else if (linkText === 'Live Chat') {
                showNotification('💬 Membuka Live Chat...', 'info');
            }
        });
    });
}

/* ===========================
   NOTIFICATION SYSTEM
=========================== */

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    if (!document.querySelector('style[data-notification="true"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 24px;
                right: 24px;
                background: ${type === 'error' ? '#FF6B6B' : type === 'success' ? '#51CF66' : '#3254FF'};
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease forwards;
                z-index: 9999;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            .notification.remove {
                animation: slideOut 0.3s ease forwards;
            }

            @media (max-width: 480px) {
                .notification {
                    bottom: 16px;
                    right: 16px;
                    left: 16px;
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('remove');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ===========================
   SMOOTH SCROLL
=========================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===========================
   LAZY LOADING IMAGES
=========================== */

function initLazyLoading() {
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/* ===========================
   RESPONSIVE MENU TOGGLE
=========================== */

function initResponsiveMenu() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.innerWidth <= 768) {
        const existingMenu = document.querySelector('.hamburger-menu');
        if (!existingMenu) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '☰';
            
            if (!document.querySelector('style[data-hamburger="true"]')) {
                const style = document.createElement('style');
                style.setAttribute('data-hamburger', 'true');
                style.textContent = `
                    .hamburger-menu {
                        display: none;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 8px;
                    }

                    @media (max-width: 768px) {
                        .hamburger-menu {
                            display: block;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

/* ===========================
   KEYBOARD SHORTCUTS
=========================== */

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const dropdown = document.querySelector('.profile-dropdown');
            if (dropdown) dropdown.remove();
        }

        if (e.key === ' ' && document.querySelector('.hero')) {
            e.preventDefault();
            const playBtn = document.querySelector('.btn-primary');
            if (playBtn && isElementInViewport(playBtn)) {
                playBtn.click();
            }
        }
    });
}

/* ===========================
   WINDOW RESIZE HANDLER
=========================== */

const handleResize = debounce(() => {
    console.log('Window resized');
    initResponsiveMenu();
}, CONFIG.debounceDelay);

window.addEventListener('resize', handleResize);

/* ===========================
   INITIALIZE ALL FEATURES
=========================== */

function initializeApp() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }

    console.log('🚀 Initializing Chill App...');

    initPasswordToggle();
    initFormValidation();
    initGoogleAuth();
    initProfileDropdown();
    initVolumeControl();
    initHeroButtons();
    initMovieCards();
    initNavbar();
    initSmoothScroll();
    initLazyLoading();
    initResponsiveMenu();
    initKeyboardShortcuts();
    initForgotPassword();
    initFooterLinks();

    console.log('✅ App initialized successfully!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}