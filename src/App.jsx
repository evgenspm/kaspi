import './App.scss';
import { useEffect, useRef, useState } from 'react';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import PinchZoom from 'pinch-zoom-js';

function App() {
  const [photo, setPhoto] = useState(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    const storedPhoto = localStorage.getItem('id-photo');
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);

  useEffect(() => {
    if (zoomRef.current && photo) {
      const timeout = setTimeout(() => {
        new PinchZoom(zoomRef.current, {});
      }, 1000); // give DOM time to render
      return () => clearTimeout(timeout);
    }
  }, [photo]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      localStorage.setItem('id-photo', base64);
      setPhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <ArrowBackIosRoundedIcon className="icon" />
        <span className="title">Удостоверение личности</span>
        <span className="icon" style={{ visibility: 'hidden' }}>ok</span>
      </div>

      <div className="tabs">
        <button className="tab active">Документ</button>
        <button className="tab">Реквизиты</button>
      </div>

      <div className="photo-card">
        {photo ? (
          <div className="pinch-zoom" ref={zoomRef} style={{ width: '100%' }}>
            <div>
              <img src={photo} alt="ID" />
            </div>
          </div>
        ) : (
          <label className="upload-label">
            <input type="file" accept="image/*" onChange={handleUpload} hidden />
            Нажмите, чтобы загрузить фото
          </label>
        )}
      </div>

      <div className="button-group">
        <button className="action-button primary">
          <QrCodeScannerRoundedIcon className="btn-icon" />
          Предъявить документ
        </button>
        <button className="action-button secondary">
          <IosShareRoundedIcon className="btn-icon" />
          Отправить документ
        </button>
      </div>
    </div>
  );
}

export default App;
