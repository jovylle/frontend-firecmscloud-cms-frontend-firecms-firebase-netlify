// src/App.tsx
import React from "react"
import { FireCMSCloudApp } from "@firecms/cloud"
import appConfig from "./index"
import "./firebaseConfig" // Ensure Firebase is initialized

function App() {
  return <FireCMSCloudApp projectId={"mecms-firecms"} appConfig={appConfig} />
}

export default App
