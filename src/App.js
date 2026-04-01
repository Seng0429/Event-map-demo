import GalleryCorridor from './components/GalleryCorridor/GalleryCorridor';
import ClaudePhotoGallery from './components/ClaudePhotoGallery/ClaudePhotoGallery';
import Timeline from './components/Timeline/Timeline';

import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter basename='/Event-map-demo'>
        <Routes>
          <Route path="/" element={<ClaudePhotoGallery />} />
          <Route path="demo1" element={<ClaudePhotoGallery />} />
          <Route path="demo2" element={<GalleryCorridor />} />
          <Route path="demo3" element={<Timeline />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;