// Simple script to test font loading
console.log('Testing font loading...');

// Check if fonts are loaded
const checkFonts = () => {
    const interLoaded = document.fonts.check('16px Inter');
    const jetbrainsLoaded = document.fonts.check('16px "JetBrains Mono"');

    console.log('Inter loaded:', interLoaded);
    console.log('JetBrains Mono loaded:', jetbrainsLoaded);

    if (interLoaded && jetbrainsLoaded) {
        console.log('✅ All fonts loaded successfully!');
    } else {
        console.log('⚠️ Some fonts not loaded yet');
    }
};

// Check immediately and after a delay
checkFonts();
setTimeout(checkFonts, 2000);
