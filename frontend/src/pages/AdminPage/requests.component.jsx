import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Requests() {
  const queryClient = useQueryClient();

  const {
    data: requests,
    isLoading,
  } = useQuery(["allrequests"], () =>
    newRequest.get("/requests").then((res) => res.data)
  );

  const updateRequestStatus = useMutation(
    ({ id, status }) => 
      newRequest.put("/requests", { id, status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allrequests"]);
      },
    }
  );

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateRequestStatus.mutateAsync({ 
        id, 
        status: status.toUpperCase() 
      });
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="border border-gray-300 rounded-lg shadow-sm">
        <h2 className="text-center py-4 text-xl font-bold border-b bg-gray-50">
          Request Management
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status/Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests?.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {request.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 truncate max-w-[200px]">
                        {request.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">
                        {request.request}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {request.status === "PENDING" ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(request.id, "ACCEPTED")}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(request.id, "REJECTED")}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === "ACCEPTED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status.charAt(0) + request.status.slice(1).toLowerCase()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;