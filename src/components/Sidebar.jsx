import { Link } from 'react-router-dom';
import { Users, Newspaper, Image, Calendar, BookOpen, MessageSquare, LayoutDashboard } from 'lucide-react';



function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
    { name: 'Faculty', icon: <Users />, path: '/manage/faculty' },
    { name: 'News', icon: <Newspaper />, path: '/manage/news' },
    { name: 'Gallery', icon: <Image />, path: '/manage/gallery' },
    { name: 'Events', icon: <Calendar />, path: '/manage/event' },
    { name: 'Blogs', icon: <BookOpen />, path: '/manage/blog' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">
      <div className="p-6 text-xl font-bold border-b border-slate-800">Admin Panel</div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="flex items-center space-x-3 p-4 hover:bg-slate-800 transition">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar

