import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const IceCreamForm = ({ selected, onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    tags: "",
    status: "available",
    image: null,
  });

  useEffect(() => {
    if (selected) {
      setForm({ ...selected, tags: selected.tags.join(", "), image: null });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = selected?.imageURL || "";
    if (form.image) {
      const storageRef = ref(storage, `icecreams/${form.image.name}`);
      await uploadBytes(storageRef, form.image);
      imageURL = await getDownloadURL(storageRef);
    }

    const data = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()),
      status: form.status,
      imageURL,
      date: new Date().toISOString().slice(0, 10),
    };

    if (selected?.id) {
      const refDoc = doc(db, "iceCreams", selected.id);
      await updateDoc(refDoc, data);
    } else {
      await addDoc(collection(db, "iceCreams"), data);
    }

    onSaved();
    setForm({ name: "", price: "", category: "", tags: "", status: "available", image: null });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="out of stock">Out of Stock</option>
      </select>
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">{selected ? "Update" : "Add"} Ice Cream</button>
    </form>
  );
};

export default IceCreamForm;
