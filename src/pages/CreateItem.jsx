import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Save, ArrowLeft, Upload } from 'lucide-react';

const CreateItem = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState(null); // Handles single or multiple files

  // Configuration for each module's fields
  const formConfigs = {
    faculty: {
      title: "Add Faculty Member",
      fields: [
        { name: 'name', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'designation', label: 'Designation (e.g. Professor)', type: 'text' },
        { name: 'image', label: 'Profile Photo', type: 'file', multiple: false }
      ]
    },
    news: {
      title: "Post News Update",
      fields: [
        { name: 'title', label: 'News Title', type: 'text' },
        { name: 'content', label: 'Main Content', type: 'textarea' },
        {
          name: 'category', label: 'Category', type: 'select', options: [
            "announcement",
            "academic",
            "event",
            "sports",
            "achievement",
            "admission",
            "holiday",
            "general"
          ]
        },
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'imageUrl', label: 'News Banner', type: 'file', multiple: false }
      ]
    },
    blog: {
      title: "Write New Blog",
      fields: [
        { name: 'title', label: 'Blog Title', type: 'text' },
        { name: 'content', label: 'Article Content', type: 'textarea' },
        { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'thumbnail', label: 'Blog Thumbnail', type: 'file', multiple: false }
      ]
    },
    events: {
      title: "Schedule New Event",
      fields: [
        { name: 'name', label: 'Event Name', type: 'text' },
        { name: 'description', label: 'Details', type: 'textarea' },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'organizer', label: 'Organizer', type: 'text' },
        { name: 'location', label: 'Venue/Location', type: 'text' },
        { name: 'status', label: 'Staus', type: 'select', options: ['scheduled', 'cancelled', 'completed'] },
          { name: 'images', label: 'Upload Multiple Photos', type: 'file', multiple: true },
      ]
    },
    gallery: {
      title: "Create Gallery Album",
      fields: [
        { name: 'title', label: 'Album Name', type: 'text' },
        { name: 'description', label: 'Short Description', type: 'text' },
        { name: 'category', label: 'Category', type: 'select', options: ['Events', 'Sports', 'Campus', 'Academic', 'Other'] },
        { name: 'images', label: 'Upload Multiple Photos', type: 'file', multiple: true },
      ]
    }
  };

  const current = formConfigs[type];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // 1. Append Text Fields
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    // 2. Append Files (Based on your Controller logic)
    if (files) {
      if (type === 'gallery' || type === 'events') {
        // Gallery controller expects 'images' (multiple)
        Array.from(files).forEach(file => data.append('images', file));
      } else {
        // Others expect a single field name like 'image', 'thumbnail', or 'imageUrl'
        const fileField = current.fields.find(f => f.type === 'file').name;
        data.append(fileField, files[0]);
      }
    }

    try {
      const endpoint = `/${type}/create`;

   const response =    await api.post(endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response)
      alert(`${type} created successfully!`);
      navigate(`/manage/${type}`);
    } catch (err) {
      console.error(err);
      alert("Error creating item. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">{current.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' ? "md:col-span-2" : ""}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>

                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    rows="4"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : field.type === 'file' ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition cursor-pointer">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <input
                          type="file"
                          multiple={field.multiple}
                          onChange={(e) => setFiles(e.target.files)}
                          required={field.required}
                        />
                      </div>
                    </div>
                  </div>
                ) : field.type === 'select' ? (
                  <select name={field.name} defaultValue={"general"} className='w-full p-3 border capitalize border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'>
                    {field.options.map((option) => (
                      <option value={option} className='capitalize'>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center space-x-2"
          >
            <Save size={20} />
            <span>{loading ? "Saving..." : "Create Item"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;