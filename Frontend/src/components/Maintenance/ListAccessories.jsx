import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseItems } from "../../Context/ItemContext";

const ListAccessories = () => {
  const {list, updateList} = UseItems()
  const navigate = useNavigate()
  useEffect(() => {
    fetch("/v1/getitems", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          updateList(result.data);
          console.log(result.data);
        } else {
          alert("Server Crashed");
        }
      });
  }, []);

  const HandleDelete = (id) => {
    fetch(`/v1/deleteitem/${id}`, {
        method:'GET',
        credentials:"include"
    }).then((response)=>response.json())
    .then((result)=> {
        if(result.status==200){
            updateList(result.data)
        }
        else{
            alert('Some Error has been Ocurred')
        }
    })
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
      <button onClick={()=>navigate("/maintenance")} className="bg-black text-white text-xl p-2">Back</button>
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Item No",
                    "Item Name",
                    "Total Stock",
                    "Remaining Stock",
                    "Issue",
                    "Trace",
                    "Delete",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-3 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {item.item}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.maximumStock}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.remainingStock}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap bg-red-300 rounded-lg p-4 hover:bg-green-200"
                    onClick={()=>navigate("/issuing", {state:{id:item._id, max:item.maximumStock, remain:item.remainingStock}})}
                    >
                      ISSUE
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  bg-red-300 rounded-lg p-4 hover:bg-green-200"
                    onClick={()=>navigate("/trace", {state:item})}
                    >
                      TRACE
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  bg-red-300 rounded-lg p-4 hover:bg-green-200"
                    onClick={()=>HandleDelete(item._id)}
                    >
                      DELETE
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAccessories;
