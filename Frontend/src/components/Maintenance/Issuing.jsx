import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseItems } from '../../Context/ItemContext';

function Issuing() {
    const [quantity, setQuantity] = useState(1);
    const [formdata, setFormdata] = useState({ name: "", contact: "", department: "" });
    const location = useLocation();
    const data = location.state || {};
    const navigate = useNavigate()
    const {updateList, list} = UseItems()
    

    const handleSubmission = (e) => {
        e.preventDefault();
        if(quantity > data.remain){
            return alert("The quantity should be less than the remaining Items")
        }

        fetch(`/v1/issue/${data.id}`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...formdata, quantity, remaining:data.remain - quantity}),
            credentials:'include'
        }).then((response)=>response.json())
        .then((result)=>{
            console.log(result)
            if(result.status == 200){
                navigate("/list")
            }
            else{
                alert("Some Error Occurred")
            }
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <button onClick={()=>navigate("/list")} className="bg-black text-white text-xl p-2">Back</button>
                <section>
                    <div className="grid grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="w-full">
                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl text-center">
                                    Issue The Items
                                </h2>
                                <form onSubmit={handleSubmission}>
                                    <div className="space-y-5">
                                        <div className="flex flex-col items-center">
                                            <label
                                                htmlFor="name"
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Name of the Person
                                            </label>
                                            <div className="mt-2 w-full">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    type="text"
                                                    placeholder="Name of the Person"
                                                    id="name"
                                                    value={formdata.name}
                                                    name="name"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label
                                                htmlFor="contact"
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Contact
                                            </label>
                                            <div className="mt-2 w-full">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    type="text"
                                                    placeholder="Enter the Contact of the Person"
                                                    id="contact"
                                                    value={formdata.contact}
                                                    name="contact"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label
                                                htmlFor="depart"
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Department
                                            </label>
                                            <div className="mt-2 w-full">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    type="text"
                                                    placeholder="Department of the Person"
                                                    id="depart"
                                                    value={formdata.department}
                                                    name="department"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label
                                                htmlFor="quantity"
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Quantity
                                            </label>
                                            <div className="mt-2 w-full flex justify-center items-center">
                                                <button
                                                    type="button"
                                                    className="bg-gray-200 px-4 py-2 rounded-l-md"
                                                    onClick={() => {
                                                        if (quantity > 0) {
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
                                                        setQuantity((prev) => prev + 1);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            >
                                                Add
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="ml-2"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Issuing;
