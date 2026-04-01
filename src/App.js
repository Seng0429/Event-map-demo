import GalleryCorridor from './components/GalleryCorridor/GalleryCorridor';
import ClaudePhotoGallery from './components/ClaudePhotoGallery/ClaudePhotoGallery';
import Timeline from './components/Timeline/Timeline';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/Event-map-demo'>
        <Routes>
          <Route path="/" element={<ClaudePhotoGallery />} />
          <Route path="demo1" element={<ClaudePhotoGallery />} />
          <Route path="demo2" element={<GalleryCorridor />} />
          <Route path="demo3" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;