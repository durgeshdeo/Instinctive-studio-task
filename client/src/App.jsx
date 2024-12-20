import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TableList from "./components/Table";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="pt-14 md:pt-8 md:ml-64 px-4 min-h-screen w-screen bg-gray-100">
        <Navbar />
        <TableList />
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
