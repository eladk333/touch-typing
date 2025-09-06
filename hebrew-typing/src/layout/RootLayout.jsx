import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function RootLayout() {
  return (
    <div dir="rtl" style={{display:"grid", gridTemplateColumns:"260px 1fr", minHeight:"100vh"}}>
      <Sidebar />
      <main style={{padding:"24px", background:"#f7fbff"}}>
        <Outlet />
      </main>
    </div>
  );
}
