import './App.css'
import QRgen from './components/QRgen';
import QRReader from './components/QRred';

function App() {
  return (
    <>
      <div className="container">
        <div className="gen-container">
          <h1>QR Code Generator</h1>
          <QRgen />
        </div>
        <div className="read-container">
          <h1>QR Code Reader</h1>
          <QRReader />
        </div>
      </div>
    </>
  )
}

export default App;
