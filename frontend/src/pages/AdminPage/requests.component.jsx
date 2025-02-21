import React from "react";
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Requests() {

  const queryClient = useQueryClient();
  const {
    data: requests,
    isLoading,
    refetch: refetchRequests,
  } = useQuery(["allrequests"], () =>
    newRequest.get("/request").then((res) => res.data)
  );

  const createRequest = useMutation(
    (newRequestData) => newRequest.put("/request", newRequestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allrequests"]);
      },
    }
  );

  const handleSubmit = async (e, category) => {
    e.preventDefault();
    await createRequest.mutateAsync({
      validRequest: category,
      value: e.target.value,
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
                <col className="w-1/4" /> {/* Column for Buttons */}
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b border-r">Username</th>
                  <th className="px-4 py-2 border-b border-r">Email</th>
                  <th className="px-4 py-2 border-b border-r">Requests</th>
                  <th className="px-4 py-2 border-b border-r">Quantity</th>
                  <th className="px-4 py-2 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((category) => (
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
                    <td className="px-4 py-2 border-b flex justify-center">
                      {category.status === "pending" && (
                        <div>
                          <button value="accepted" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={(e)=>handleSubmit(e,category)}>
                            Accept
                          </button>
                          <button value="rejected"className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={(e)=>handleSubmit(e,category)}>
                            Reject
                          </button>
                        </div>
                      )}
                      {category.status === "accepted" && (
                        <div className="bg-[green] p-2 rounded">Accepted</div>
                      )}
                      {category.status === "rejected" && (
                        <div className="bg-[red] p-2 rounded">Rejected</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Requests;
