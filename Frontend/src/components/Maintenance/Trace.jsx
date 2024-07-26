import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseItems } from "../../Context/ItemContext";

function Trace() {
  const location = useLocation();
  const {updateList} = UseItems()
  const [quantity, setQuantity] = useState(1);
  const item = location.state || {};
  const navigate = useNavigate()

  const HandleReturn = (id) => {
    fetch(`/v1/return/${id}/${quantity}/${item._id}`, {
      method:'POST',
      credentials:'include'
    }).then((response)=>response.json())
    .then((result)=>{
      if(result.status == 200){
        updateList(result.data)
        navigate("/list")
      }
      else{
        alert("SOme Error Ocuured")
      }
    })
  }

  console.log(item);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
      <button onClick={()=>navigate("/list")} className="bg-black text-white text-xl p-2">Back</button>
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "S.No",
                    "Name",
                    "Contact",
                    "Department",
                    "IssuedOn",
                    "Quantity",
                    "Quantity Returned",
                    "Returned",
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
                {item?.ProvidedTo?.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {item.Name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.Contact}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.Department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.IssuedOn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.Quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <div className="mt-2 w-full flex justify-center items-center">
                        <button
                          type="button"
                          className="bg-gray-200 px-4 py-2 rounded-l-md"
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity((prev) => prev - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          className="flex h-10 w-16 text-center rounded-none border-t border-b border-gray-300 bg-transparent text-sm focus:outline-none"
                          type="text"
                          placeholder={quantity}
                          id="quantity"
                          readOnly
                        />
                        <button
                          type="button"
                          className="bg-gray-200 px-4 py-2 rounded-r-md"
                          onClick={() => {
                            if(quantity<item.Quantity){
                              setQuantity((prev)=>prev+1)
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap bg-green-200 rounded-xl"
                    onClick={()=>HandleReturn(item._id)}
                    >
                      Returned{" ?"}
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
}

export default Trace;
