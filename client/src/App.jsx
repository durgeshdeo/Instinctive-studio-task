import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TableList from "./components/Table";

function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="pt-14 md:pt-8 md:ml-64 px-4 min-h-screen bg-gray-100  flex-1">
        <Navbar />
        <TableList />
      </div>
    </div>
  );
}

export default App;
