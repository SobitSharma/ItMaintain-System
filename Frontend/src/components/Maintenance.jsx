import React from "react";
import { useNavigate } from "react-router-dom";

function Maintenance() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 h-32 rounded text-3xl text-center py-3 hover:bg-gray-300"
            onClick={()=>navigate("/list")}
            >
              All Accessories List
            </div>
            <div className="bg-green-500 h-32 rounded text-3xl text-center py-3 hover:bg-gray-300"
            onClick={()=>navigate("/additems")}
            >
              Add Items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
