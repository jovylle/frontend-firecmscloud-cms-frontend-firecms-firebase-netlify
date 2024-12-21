// src/firebaseConfig.ts
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAH3DTJmfZKU48q9CUzojMdzXEJHHcHC04",
  authDomain: "mecms-firecms.firebaseapp.com",
  projectId: "mecms-firecms",
  storageBucket: "mecms-firecms.appspot.com",
  messagingSenderId: "228528126214",
  appId: "1:228528126214:web:e5b9acfa74a6f2a9dd0687",
}

const app = initializeApp(firebaseConfig)

export default app
