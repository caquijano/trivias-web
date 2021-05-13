import React from 'react'
import { useAuth, useFirestore, useFirestoreCollection } from "reactfire";
import "firebase/firestore";
function Home() {
    const auth = useAuth();
  const userRef = useFirestore().collection('users').where('UserId','==', auth.currentUser?.uid || "");
  const jkl:any = useFirestoreCollection(userRef);
  const {docs} = jkl.data || "";
    //console.log(docs && docs[0].data().Nombre)
    return (
        <>
        {
            docs?.map((d:any) => (
               <div key={d.id}>{d.id}{d.data().name}</div> 
                ))
        }
        
        </>
    )
}

export default Home
