 import React from 'react'
import { useAuth, useFirestore, useFirestoreCollection } from "reactfire";
import "firebase/firestore";

export default function UserData() {
    const auth = useAuth();
  const userRef = useFirestore().collection('users').where('UserId','==', auth.currentUser?.uid || "");
  const jkl:any = useFirestoreCollection(userRef);
  const {docs} = jkl.data || "";

  return docs ? docs[0]?.data() : "";;
}
