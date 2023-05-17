/*import axios from "axios";

const API_URL = "http://localhost:8080";

class ImageService {
    upload(image, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", image);
  
      return http.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getImages() {
      return http.get("/image/files");
    }
  }
  
  export default new ImageService();
*/
/*
import http from "./http";

class ImageService {
  upload(formData, onProgress) {
    return http.post("/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    });
  }
}

export default new ImageService();
*/

import http from "./http";

class ImageService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return http.post("/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getImages() {
    return http.get("image/files");
  }
}

export default new ImageService();