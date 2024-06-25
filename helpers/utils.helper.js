import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

const storage = getStorage(app);
export const UploadSingleImage = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileRef = ref(storage, `intern/${fileName}`);
 
    const metadata = {
      contentType: file.mimetype, // Set the correct MIME type
    };

    await uploadBytes(fileRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};