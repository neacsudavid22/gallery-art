import { Gallery } from "./Gallery"
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageGalleryPage from "./ImageGallery";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageForm from "./ImageForm";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/add-photo" element={<ImageForm />} />
          <Route path="/add-photo/:id" element={<ImageForm />} />
          <Route path="/collection/:style" element={<ImageGalleryPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
