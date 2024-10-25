import { useState, useRef } from 'react';
import QrReader from 'qrcode-reader';
import { createCanvas, loadImage } from 'canvas';
import "./QRred.css"
const QRReader = () => {
    const [qrResult, setQrResult] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            alert('No file selected. Please try again.');
            return;
        }
        const file = files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const qrCodeContent = await decodeQRCode(imageUrl);
            if (qrCodeContent) {
                setQrResult(qrCodeContent);
                redirectBasedOnContent(qrCodeContent); // Redirect based on content type
                console.log(qrCodeContent);
            } else {
                alert('Failed to read QR Code. Please try again.');
            }
        }
    };

    const decodeQRCode = (imageUrl: string): Promise<string | null> => {
        return new Promise(async (resolve, reject) => {
            try {
                const image = await loadImage(imageUrl);
                const canvas = createCanvas(image.width, image.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, image.width, image.height);

                const qr = new QrReader();
                qr.callback = (err: Error | null, value: { result: string }) => {
                    if (err) {
                        console.error('QR Code Error:', err);
                        resolve(null as string | null);
                    } else {
                        resolve(value.result);
                    }
                };

                const imageData = ctx.getImageData(0, 0, image.width, image.height);
                qr.decode(imageData);
            } catch (error) {
                console.error('Error decoding QR Code:', error);
                reject(null);
            }
        });
    };

    const redirectBasedOnContent = (content: string) => {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}.*$/;

        if (urlPattern.test(content)) {
            // If the content is a valid URL, open it directly
            const url = content.startsWith('http') ? content : `https://${content}`;
            openInNewTab(url);
        } else {
            // If the content is not a URL, search it on Google
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(content)}`;
            openInNewTab(googleSearchUrl);
        }
    };

    const openInNewTab = (url: string) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (newTab) newTab.focus(); // Focus on the new tab if it opened successfully
    };

    return (
        <div className="qr-reader-container">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="file-input"
            />
            {qrResult && (
                <div className="qr-result">
                    <p>QR Code Content: </p>
                    <p> {qrResult}</p>
                </div>
            )}
        </div>
    );
};

export default QRReader;
