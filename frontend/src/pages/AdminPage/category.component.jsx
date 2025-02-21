import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function Category() {
  const [category, setCategory] = useState({
    img: "",
    cat: "",
    title: "",
  });

  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      newRequest.get(`/categories`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (category) => {
      return newRequest.post("/categories", category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
    onError : (err) => {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCategory({
      ...category, // Spread the existing properties of category
      [e.target.name]: e.target.value, // Update the property with new value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(category);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(picture);
      setUploading(false);
      toast.success("Successfully uploaded!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCategory((prevCategory) => ({
        ...prevCategory,
        img: cover,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="border border-gray-300 rounded p-6">
        <div>
          <h2 className="text-center border-b pb-2 font-bold text-xl">
            Categories
          </h2>
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-1/12" /> {/* Column for picture */}
              <col className="w-3/12" /> {/* Column for category name */}
              <col className="w-3/12" /> {/* Column for code */}
              <col className="w-5/12" /> {/* Column for truncated URL */}
            </colgroup>
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b border-r">Picture</th>
                <th className="px-4 py-2 border-b border-r">Category Name</th>
                <th className="px-4 py-2 border-b border-r">Code</th>
                <th className="px-4 py-2 border-b">URL</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="px-4 py-2 border-b border-r flex justify-center items-center">
                    <div
                      className="w-12 h-12 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${category.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    {category.title}
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    {category.cat}
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    <a href={category.img} target="_blank" rel="noreferrer">
                      <div className="truncate w-90">{category.img}</div>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 rounded p-6">
        <h2 className="text-center border-b pb-2 font-bold text-xl">
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex mb-4">
            <div className="flex-1 pr-2 border-r">
              <label className="mb-1 font-bold">Category Name:</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-2 rounded border border-gray-300"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 pl-2">
              <label className="mb-1 font-bold">Code:</label>
              <input
                type="text"
                name="cat"
                className="w-full px-4 py-2 rounded border border-gray-300"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 border p-1.5 flex items-center">
            <label className="mb-1 font-bold">Picture:</label>
            <div className="flex ml-2">
              <input
                type="file"
                accept="image/*"
                name="picture"
                onChange={handlePictureChange}
                className="w-full"
              />
              <button
                type="button"
                className="bg-[#682A85] text-white px-4 py-2 rounded ml-2"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#682A85] hover:bg-[#983ec2] text-white px-6 py-2 rounded-md transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Category;
