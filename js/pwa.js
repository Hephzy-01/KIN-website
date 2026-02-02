/**
 * PWA Installation and Mobile Features
 * Handles service worker registration and install prompts
 */

// ===================================
// SERVICE WORKER REGISTRATION
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully:', registration.scope);

                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// ===================================
// INSTALL TO HOME SCREEN PROMPT
// ===================================

let deferredPrompt;
const installButton = document.getElementById('installApp');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show install button if it exists
    if (installButton) {
        installButton.style.display = 'block';
    } else {
        // Create floating install prompt
        showInstallPrompt();
    }
});

function showInstallPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'pwa-install-prompt';
    prompt.innerHTML = `
        <div class="install-prompt-content">
            <button class="install-prompt-close" onclick="this.parentElement.parentElement.remove()">×</button>
            <img src="images/logo.png" alt="KIN Logo" style="width: 48px; height: 48px; margin-bottom: 8px;">
            <h4 style="margin: 0 0 4px 0; color: var(--color-white);">Install KIN App</h4>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--color-gray-300);">
                Access devotionals offline & get quick shortcuts on your home screen!
            </p>
            <button class="btn btn-primary btn-small" onclick="installPWA()">Install Now</button>
        </div>
    `;
    document.body.appendChild(prompt);

    // Show with animation
    setTimeout(() => prompt.classList.add('show'), 100);
}

async function installPWA() {
    if (!deferredPrompt) {
        return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to install prompt: ${outcome}`);

    // Clear the deferredPrompt
    deferredPrompt = null;

    // Hide the install prompt
    const prompt = document.getElementById('pwa-install-prompt');
    if (prompt) {
        prompt.remove();
    }
}

// Track when app is installed
window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully!');
    deferredPrompt = null;

    // Hide any install prompts
    const prompt = document.getElementById('pwa-install-prompt');
    if (prompt) {
        prompt.remove();
    }
});

// ===================================
// MOBILE-SPECIFIC FEATURES
// ===================================

// Detect if running as PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
}

// Add PWA class to body for styling
if (isPWA()) {
    document.body.classList.add('pwa-mode');
    console.log('✅ Running as installed PWA');
}

// ===================================
// PULL TO REFRESH
// ===================================

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;

    // If user is at top of page and pulling down
    if (window.scrollY === 0 && touchEndY > touchStartY + 100) {
        // Show refresh indicator (you can enhance this)
        console.log('Pull to refresh triggered');
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    if (window.scrollY === 0 && touchEndY > touchStartY + 150) {
        // Refresh the page
        location.reload();
    }
    touchStartY = 0;
    touchEndY = 0;
}, { passive: true });

// ===================================
// SWIPE GESTURES (Future Enhancement)
// ===================================

// Add swipe navigation between pages
// This can be enhanced to navigate between devotionals
