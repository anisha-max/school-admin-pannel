import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Added useNavigate
import api from '../api/axios';
import DataTable from '../components/DataTable';

const ManagementPage = () => {
  const { type } = useParams();
  const navigate = useNavigate(); // 2. Initialize navigate
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configuration for different modules
  const configs = {
    faculty: { title: "Faculty Members", endpoint: "/faculty/all", imgKey: "image", cols: [{header: 'Name', field: 'name'}, {header: 'Designation', field: 'designation'}] },
    news: { title: "School News", endpoint: "/news", imgKey: "imageUrl", cols: [{header: 'Title', field: 'title'}, {header: 'Category', field: 'category'}] },
    blog: { title: "Blog Posts", endpoint: "/blog/all", imgKey: "thumbnail", cols: [{header: 'Title', field: 'title'}] },
    gallery: { title: "Gallery Albums", endpoint: "/gallery/all", imgKey: "coverImage", cols: [{header: 'Title', field: 'title'}, {header: 'Category', field: 'category'}] },
    event: { title: "Events", endpoint: "/event/all", imgKey: null, cols: [{header: 'Title', field: 'title'}, {header: 'Status', field: 'status'}] },
    contact: { title: "Contact Inquiries", endpoint: "/contact/all", imgKey: null, cols: [{header: 'Name', field: 'name'}, {header: 'Email', field: 'email'}] },
  };

  const currentConfig = configs[type];

  const fetchData = async () => {
    if (!currentConfig) return; // Guard clause
    setLoading(true);
    try {
      const res = await api.get(currentConfig.endpoint);
      // Handling your specific controller responses:
      // Faculty/Blog/Contact use .data | Event uses .events | News/Gallery use direct array
      const result = res.data.data || res.data.events || res.data;
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [type]);

  // Unified delete handler based on your controller filenames
  const handleDelete = async (id) => {
    try {
      // Logic to match your specific backend route naming
      let deletePath = `/${type}/delete/${id}`;
      if (type === 'blog') deletePath = `/blog/delete/${id}`; // Matches Blog.controller.js
      
      await api.delete(deletePath);
      fetchData();
    } catch (err) { 
      alert("Delete failed: " + (err.response?.data?.message || err.message)); 
    }
  };

  if (!currentConfig) return <div className="p-10 text-center">Invalid Section</div>;
  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{currentConfig.title}</h1>
        {type !== 'contact' && (
          <button 
            onClick={() => navigate(`/manage/${type}/create`)} // Now works!
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add New {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        )}
      </div>

      <DataTable 
        title={`${currentConfig.title} List`}
        data={data}
        columns={[
          ...(currentConfig.imgKey ? [{ header: 'Preview', field: currentConfig.imgKey, type: 'image' }] : []),
          ...currentConfig.cols
        ]}
        onDelete={handleDelete}
        onEdit={(id) => navigate(`/manage/${type}/edit/${id}`)} // Fixed Edit navigation
      />
    </div>
  );
};

export default ManagementPage;