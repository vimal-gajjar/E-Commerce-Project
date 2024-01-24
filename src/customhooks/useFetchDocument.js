import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/config";

const useFetchDocument = (collectionname, documentID) => {
  const [document, setDocument] = useState(null);
  useEffect(() => {
    getDocumentData();
  }, []);

  let getDocumentData = async () => {
    let docRef = doc(database, collectionname, documentID);
    const docSnap = await getDoc(docRef);
    setDocument({ ...docSnap.data(), id: documentID });
  };
  return { document };
};

export default useFetchDocument;
