import { useEffect, useState } from 'react';
import api from '../api/axios';
import DataTable from '../components/DataTable';


function FacultyList() {
  const [faculties, setFaculties] = useState([]);

  const fetchFaculties = async () => {
    const res = await api.get('/faculty/all');
    setFaculties(res.data.data); 
  };

  useEffect(() => { fetchFaculties(); }, []);

  const handleDelete = async (id) => {
    await api.delete(`/faculty/delete/${id}`);
    fetchFaculties(); 
  };

  const columns = [
    { header: 'Photo', field: 'image', type: 'image' },
    { header: 'Name', field: 'name' },
    { header: 'Designation', field: 'designation' },
    { header: 'Email', field: 'email' },
  ];

  return (
    <DataTable 
      title="Faculty Management" 
      data={faculties} 
      columns={columns} 
      onDelete={handleDelete} 
      onEdit={(id) => console.log("Edit", id)} 
    />
  );
}

export default FacultyList
