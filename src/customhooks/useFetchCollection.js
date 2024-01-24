import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../firebase/config";

const useFetchCollection = (collectionname) => {
  let [data, setData] = useState([]);
  let [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCollectionData();
  }, []);

  let getCollectionData = () => {
    setIsLoading(true);
    try {
      const docref = collection(database, collectionname);
      const q = query(docref, orderBy("createdAt", "desc"));
      onSnapshot(q, (docSnap) => {
        const allData = docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(allData);
        // console.log(allData);
        setIsLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  return { data, IsLoading };
};

export default useFetchCollection;
