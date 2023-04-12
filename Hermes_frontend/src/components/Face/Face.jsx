import React, { useState } from 'react';
import { loadModels } from './helpers/faceApi';
import { createFaLibrary } from './helpers/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import Camera from './components/Camera/Camera.js'


import './Face.css';
createFaLibrary();
loadModels();
function Face() {
  const [mode, setMode] = useState(false); //true = photo mode; false = video mode

  return (
    <div className="App">
      <header>
        <div className="App__header">
          <h1>
            <span>Emotion-Analysis</span>
          </h1>
          <div className="App__switcher">
            <FontAwesomeIcon icon="camera" color={mode ? 'white' : '#cccccc'} />
            <Switch
              onChange={() => setMode(!mode)}
              uncheckedIcon={false}
              checkedIcon={false}
              checked={!mode}
              className="App__switcher-switch"
            />
            <FontAwesomeIcon icon="video" color={!mode ? 'white' : '#cccccc'} />
          </div>
        </div>
      </header>
      <Camera photoMode={mode} />
    </div>
  );
}

export default Face;
