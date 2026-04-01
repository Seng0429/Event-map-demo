import GalleryCorridor from './components/GalleryCorridor/GalleryCorridor';
import ClaudePhotoGallery from './components/ClaudePhotoGallery/ClaudePhotoGallery';
import Timeline from './components/Timeline/Timeline';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // This automatically detects if you are on GitHub (/Event-map-demo) 
  // or Localhost (/) so it doesn't break either one.
  const isGithubPages = window.location.hostname.includes('github.io');
  const basename = isGithubPages ? '/Event-map-demo' : '/';

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
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

//