import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const IceCreamList = ({ onEdit }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [sort, setSort] = useState("date");

  const fetchData = async () => {
    const q = query(collection(db, "iceCreams"), orderBy(sort, "desc"));
    const snapshot = await getDocs(q);
    setIceCreams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchData();
  }, [sort]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "iceCreams", id));
    fetchData();
  };

  return (
    <div>
      <label>Sort by:</label>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="date">Date</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      {iceCreams.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <h4>{item.name}</h4>
          <img src={item.imageURL} alt={item.name} width={100} />
          <p>Price: {item.price} ₸</p>
          <p>Category: {item.category} | Status: {item.status}</p>
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default IceCreamList;
