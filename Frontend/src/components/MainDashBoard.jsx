import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "./Back";
import { UseItems } from "../Context/ItemContext";

function MainDashBoard() {
  const navigate = useNavigate();
  const {updateList} = UseItems()

  const HandleLogout = ()=> {
    fetch("/v1/logout", {
      method:'POST',
      credentials:'include'
    }).then((response)=>response.json())
    .then((result)=>{
      if(result.status==200){
        updateList([])
        alert(
          "Logout SucessFull"
        )
      }
      else{
        alert("Some Error Occured")
      }
    })
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="grid grid-cols-2 gap-4">
            <div
              className="bg-blue-500 h-32 rounded text-3xl text-center py-3 hover:bg-gray-300"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
            <div
              className="bg-green-500 h-32 rounded text-3xl text-center py-3  hover:bg-gray-300"
              onClick={() => navigate("/signup")}
            >
              SignUP
            </div>
            <div className="bg-red-500 h-32 rounded text-3xl text-center py-3  hover:bg-gray-300"
            onClick={HandleLogout}
            >
              LogOut
            </div>
            <div
              className="bg-yellow-500 h-32 rounded text-3xl text-center py-3  hover:bg-gray-300"
              onClick={() => navigate("/maintenance")}
            >
              Maintenance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashBoard;
