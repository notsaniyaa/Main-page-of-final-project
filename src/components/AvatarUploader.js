import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";

function AvatarUploader({ onUpload }) {
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!avatarFile || !auth.currentUser) return;

    const storage = getStorage();
    const fileRef = ref(storage, `avatars/${auth.currentUser.uid}`);

    setLoading(true);
    try {
      await uploadBytes(fileRef, avatarFile);
      const downloadURL = await getDownloadURL(fileRef);
      onUpload(downloadURL);
    } catch (error) {
      alert("Ошибка при загрузке: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading || !avatarFile}>
        {loading ? "Загрузка..." : "Загрузить аватар"}
      </button>
    </div>
  );
}

export default AvatarUploader;
