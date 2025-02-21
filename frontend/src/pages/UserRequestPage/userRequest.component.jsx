import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function UserRequests() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    requests: "",
    quantity: "",
  });

  const {
    data: requests,
    isLoading,
    refetch: refetchRequests,
  } = useQuery(["userRequests"], () =>
    newRequest.get("/request/user").then((res) => res.data)
  );

  const createRequest = useMutation((newRequestData) =>
    newRequest.post("/request", newRequestData).then(()=>refetchRequests())
  );

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRequest.mutateAsync(formData);
    
    setFormData({
      username: "",
      email: "",
      requests: "",
      quantity: "",
    });
    
    
  };

  return (
    <div className="px-4 py-8">
      <div className="border border-gray-300 rounded p-6">
        <div>
          <h2 className="text-center border-b pb-2 font-bold text-xl">
            Categories
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full table-fixed border-collapse border">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/4" />
                <col className="w-1/2" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b border-r">Username</th>
                  <th className="px-4 py-2 border-b border-r">Email</th>
                  <th className="px-4 py-2 border-b border-r">Requests</th>
                  <th className="px-4 py-2 border-b border-r">Quantity</th>
                  <th className="px-4 py-2 border-b border-r">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((category) => (
                  <tr key={category._id} className="bg-white">
                    <td className="px-4 py-2 border-b border-r">
                      {category.username}
                    </td>
                    <td className="px-4 py-2 border-b border-r">
                      {category.email}
                    </td>
                    <td className="px-4 py-2 border-b border-r">
                      {category.request}
                    </td>
                    <td className="px-4 py-2 border-b border-r">
                      {category.quantity}
                    </td>
                    <td className="flex justify-center px-4 py-2 border-b border-r uppercase">
                      {category.status === "pending" && (<div className="bg-[yellow] p-2 rounded">Pending</div>)}
                      {category.status === "accepted" && (<div className="bg-[green] p-2 rounded">Accepted</div>)}
                      {category.status === "rejected" && (<div className="bg-[red] p-2 rounded">Rejected</div>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="mt-6 border border-gray-300 rounded p-6">
        <h2 className="text-center border-b pb-2 font-bold text-xl">
          Add Category
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center mt-4"
        >
          <div className="flex items-center mb-4 mr-20 w-1/4">
            <label htmlFor="username" className="mr-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex items-center mb-4 mr-20  w-1/4">
            <label htmlFor="email" className="mr-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex items-center mb-4 mr-10 w-1/4">
            <label htmlFor="requests" className="mr-2">
              Requests:
            </label>
            <input
              type="text"
              id="requests"
              name="requests"
              value={formData.requests}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex items-center mb-4 w-1/12">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRequests;
