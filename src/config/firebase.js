import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyB80Ku7YQrDO3cpjqGlh1-P16foeI4SGU4",
//   authDomain: "jaymart-e0669.firebaseapp.com",
//   databaseURL: "https://jaymart-e0669-default-rtdb.firebaseio.com",
//   projectId: "jaymart-e0669",
//   storageBucket: "jaymart-e0669.appspot.com",
//   messagingSenderId: "937049196634",
//   appId: "1:937049196634:web:31ef67d4fd22cc5382f063",
//   measurementId: "G-C36HSYMRR9",
// };

// NEW CONFIGURATION

// const firebaseConfig = {
//   apiKey: "AIzaSyCOa8bFKulk6Q71GUMGEdmuMOFycG7OuMc",
//   authDomain: "zaytoona-2c425.firebaseapp.com",
//   databaseURL: "https://zaytoona-2c425-default-rtdb.firebaseio.com",
//   projectId: "zaytoona-2c425",
//   storageBucket: "zaytoona-2c425.appspot.com",
//   messagingSenderId: "952598013385",
//   appId: "1:952598013385:web:cd7371022f0a9432b57418",
//   measurementId: "G-YZW02JC4C5"
// };



const firebaseConfig = {
  apiKey: "AIzaSyCY7KesAsA_keMgIX9XxQKwFd2MsZKjNig",
  authDomain: "partyfixers-53c7d.firebaseapp.com",
  projectId: "partyfixers-53c7d",
  storageBucket: "partyfixers-53c7d.appspot.com",
  messagingSenderId: "10405373829",
  appId: "1:10405373829:web:bf7e8d17004a6c859906ec",
  measurementId: "G-WW2ZG1RD75"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
