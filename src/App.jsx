import './App.scss';
import { useEffect, useState } from 'react';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';

function App() {
  const [photo, setPhoto] = useState(null);

  // Load photo from localStorage on first render
  useEffect(() => {
    const storedPhoto = localStorage.getItem('id-photo');
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);

  // Handle file upload
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
          <div className="zoom-container">
            <img src={photo} alt="ID" />
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
