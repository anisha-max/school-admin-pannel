import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold border-b border-slate-700 pb-4">School Admin</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/faculty" className="hover:text-blue-400">Faculty Management</Link>
          <Link to="/gallery" className="hover:text-blue-400">Gallery / Albums</Link>
          <Link to="/blogs" className="hover:text-blue-400">Blog Posts</Link>
          <Link to="/news" className="hover:text-blue-400">Latest News</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10">
        <Outlet /> {/* This is where the specific pages will render */}
      </main>
    </div>
  );
};

export default Layout;