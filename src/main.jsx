import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import { Toaster } from "react-hot-toast" // Import Toaster

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} /> {/* Tambahkan Toaster */}
    </AuthProvider>
  </BrowserRouter>
)
