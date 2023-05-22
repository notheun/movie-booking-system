import { useState } from "react";
import ImageService from "../../services/ImageService";

import "./image.css";

const UploadImage = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (selectedImage) {
      setUploadProgress(0);
      setUploadMessage("Uploading...");

      ImageService.upload(selectedImage, (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      })
        .then((response) => {
          setUploadProgress(100);
          setUploadMessage("Upload successful!");
          onImageUpload(selectedImage.name);
        })
        .catch((error) => {
          setUploadProgress(0);
          setUploadMessage("Upload failed. Please try again.");
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedImage}
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>

      {selectedImage && (
        <div className="preview-container">
          <div>
            <img src={previewImage} alt="Preview" className="preview-image" />
          </div>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {uploadProgress}%
          </div>
        </div>
      )}
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
};

export default UploadImage;
