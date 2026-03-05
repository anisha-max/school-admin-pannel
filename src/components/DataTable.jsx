import { Edit, Trash2, ExternalLink } from 'lucide-react';

const DataTable = ({ title, data, columns, onDelete, onEdit }) => {
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {data.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4">{col.header}</th>
              ))}
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-gray-700">
                    {/* Render logic: handle images, strings, or dates */}
                    {col.type === "image" ? (
                      <img
                        src={getNestedValue(item, col.field)}
                        onError={(e) => (e.target.src = "/placeholder.png")}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    ) : col.type === "date" ? (
                      new Date(getNestedValue(item, col.field)).toLocaleDateString()
                    ) : (
                      getNestedValue(item, col.field) || "N/A"
                    )}
                  </td>
                ))}

                {/* Action Buttons */}
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => onEdit(item._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => { if (window.confirm('Delete this item?')) onDelete(item._id) }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;