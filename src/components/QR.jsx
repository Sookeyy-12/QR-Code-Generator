import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QR = () => {
    const [inputText, setInputText] = useState('');

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
        </div>
    );
};

export default QR;
