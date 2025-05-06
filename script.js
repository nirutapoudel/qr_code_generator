import QRCode from 'qrcode';

const urlInput = document.getElementById('url-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qrcode-container');
const downloadLink = document.getElementById('download-link');

generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    downloadLink.style.display = 'none'; // Hide download link initially

    if (!url) {
        alert('Please enter a URL.');
        return;
    }

    // Basic URL validation (can be improved)
    try {
        new URL(url); // Check if it's a valid URL structure
    } catch (_) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
    }


    QRCode.toDataURL(url, { width: 256, margin: 2, errorCorrectionLevel: 'H' })
        .then(dataUrl => {
            const img = document.createElement('img');
            img.src = dataUrl;
            img.alt = `QR Code for ${url}`;
            qrCodeContainer.appendChild(img);

            // Setup download link
            downloadLink.href = dataUrl;
            downloadLink.download = 'qrcode.png'; // Suggested filename
            downloadLink.style.display = 'inline-block'; // Show download link

        })
        .catch(err => {
            console.error('QR Code generation failed:', err);
            alert('Failed to generate QR code. Check the console for details.');
        });
});

