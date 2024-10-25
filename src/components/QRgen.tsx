import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const QRgen = () => {
    const [inputText, setInputText] = useState('');

    const downloadQRCode = () => {
        const qrCodeElement = document.querySelector('.qr-code-container > svg');
        if (qrCodeElement) {
            toPng(qrCodeElement as HTMLElement)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'qrcode.png';
                    link.click();
                })
                .catch((err) => {
                    console.error('Failed to generate QR code image', err);
                });
        }
    };
    return (
        <div className="qr-generator-container">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or URL"
                className="input-text"
            />
            <div className="qr-code-container">
                {inputText && (
                    <QRCode
                        value={inputText}
                        size={256}    // You can adjust the size as needed
                        level="H"     // Error correction level: Low (L), Medium (M), High (H)
                    />
                )}
            </div>
            <div className="downloader">
                <button onClick={downloadQRCode}>Download QR Code</button>
            </div>
        </div>
    );
};

export default QRgen;
