import React from 'react'
import db from '../../config/firebase'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";


const Notifcations = async (uid, noticeStatus, status, type) => {

    const data = {
        noticeStatus,
        status,
        type
    }

    const notificationRef = doc(db, "notification", uid);

    await setDoc(notificationRef, {
        Notices: arrayUnion(data)
    }, { merge: true });

}

export default Notifcations