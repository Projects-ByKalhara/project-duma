import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBs65eMF7P2fzQFoIVl7C-Qu0IxRSx7cXk",
  authDomain: "project-duma-80aed.firebaseapp.com",
  projectId: "project-duma-80aed",
  storageBucket: "project-duma-80aed.appspot.com",
  messagingSenderId: "666765972050",
  appId: "1:666765972050:web:f7bc77da5188d9ab3a858b"
};

const app=initializeApp(firebaseConfig);
const DB=getDatabase(app);

export default DB;
