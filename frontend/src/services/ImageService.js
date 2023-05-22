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

  delete(filename) {
    return http.delete(`image/files/${filename}`);
  }
}

export default new ImageService();