import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function UserRequests() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    request: "", // Change from 'requests' to 'request'
    quantity: "",
  });

  const {
    data: requests = [], // provide default empty array
    isLoading,
    refetch: refetchRequests,
  } = useQuery(["userRequests"], () =>
    newRequest.get("/requests/user").then((res) => res.data)
  );

  const createRequest = useMutation((newRequestData) =>
    newRequest.post("/requests", newRequestData).then(() => refetchRequests())
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
      request: "", // Change from 'requests' to 'request'
      quantity: "",
    });
  };

  return (
    <div className="px-4 py-8">
      <div className="border border-gray-300 rounded p-6">
        <div>
          <h2 className="text-center border-b pb-2 font-bold text-xl mb-6">
            Requests
          </h2>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : requests && requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[35%]">
                      Requests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div
                          className="truncate max-w-[150px]"
                          title={category.username}
                        >
                          {category.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div
                          className="truncate max-w-[200px]"
                          title={category.email}
                        >
                          {category.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="line-clamp-2" title={category.request}>
                          {category.request}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {category.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            category.status === "pending" ||
                            category.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : category.status === "accepted" ||
                                category.status === "ACCEPTED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.status.charAt(0).toUpperCase() +
                            category.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No requests found
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 border border-gray-300 rounded p-6">
        <h2 className="text-center border-b pb-2 font-bold text-xl">
          Add Request
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
            <label htmlFor="request" className="mr-2"></label>
            <input
              type="text"
              id="request"
              name="request"
              value={formData.request}
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
