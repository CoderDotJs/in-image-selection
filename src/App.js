import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function App() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 0, height: 0, x: 0, y: 0 });


  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
    
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Image Crop</h1>
      <div>
        <label className="file">
        <input type="file" id="file" accept="image/*" aria-label="File browser example" onChange={onSelectFile} />
          <span className="file-custom"></span>
        </label>
      </div>

      {upImg && 
      <h4>
        X : <span id='red'>{crop.x}</span>, 
        Y : <span id='green'>{crop.y}</span>, 
        Width : <span id="yellow">{crop.width}</span>, 
        Height : <span id="blue">{crop.height}</span>
      </h4>}
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        style={{ maxWidth: '400px' }}
      />
    </div>
  );
}

export default App;
