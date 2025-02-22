import { useContext, useState } from "react";
import React from "react";
import { ProductsContext } from "../../context/productContext";
import upload from "../../utils/upload";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Products() {
  const { data } = useContext(ProductsContext);
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    img: "",
    cat: "",
    price: "",
    attribute: {
      featured: false,
      latest: false,
      trending: false,
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product) => {
      return newRequest.post("/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(product);
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
      setProduct((prevCategory) => ({
        ...prevCategory,
        img: cover,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttributeChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      attribute: {
        ...prevProduct.attribute,
        [name]: checked,
      },
    }));
  };



  return (
    <div>
      <div className="border border-gray-300 rounded p-6">
        <div>
          <h2 className="text-center border-b pb-2 font-bold text-xl">
            Products
          </h2>
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-1/12" /> {/* Column for picture */}
              <col className="w-2/12" /> {/* Column for product title */}
              <col className="w-2/12" /> {/* Column for category */}
              <col className="w-2/12" /> {/* Column for price */}
              <col className="w-2/12" /> {/* Column for attributes */}
              <col className="w-3/12" /> {/* Column for truncated URL */}
            </colgroup>
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b border-r">Picture</th>
                <th className="px-4 py-2 border-b border-r">Product Title</th>
                <th className="px-4 py-2 border-b border-r">Category</th>
                <th className="px-4 py-2 border-b border-r">Price</th>
                <th className="px-4 py-2 border-b border-r">Attributes</th>
                <th className="px-4 py-2 border-b">URL</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="px-4 py-2 border-b border-r">
                    <div
                      className="w-12 h-12 bg-cover bg-center rounded mx-auto flex justify-center"
                      style={{
                        backgroundImage: `url(${product.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    {product.title}
                  </td>
                  <td className="px-4 py-2 border-b border-r">{product.cat}</td>
                  <td className="px-4 py-2 border-b border-r">
                    {product.price}
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    <div className="mb-4">
                      <div>
                        <div className="flex items-center mb-1 ">
                          {product.attribute && product.attribute.featured ? (
                            <>
                              <span className="mr-1">&#10004;</span>
                              <span className="text-green-500">Featured</span>
                            </>
                          ) : (
                            <>
                              <span className="mr-1">&#10060;</span>
                              <span>Featured</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center mb-1">
                          {product.attribute && product.attribute.latest ? (
                            <>
                              <span className="mr-1">&#10004;</span>
                              <span className="text-green-500">Latest</span>
                            </>
                          ) : (
                            <>
                              <span className="mr-1">&#10060;</span>
                              <span>Latest</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center">
                          {product.attribute && product.attribute.trending ? (
                            <>
                              <span className="mr-1">&#10004;</span>
                              <span className="text-green-500">Trending</span>
                            </>
                          ) : (
                            <>
                              <span className="mr-1">&#10060;</span>
                              <span>Trending</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-r">
                    <div className="truncate w-90">
                      <a
                        href={product.img}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {product.img}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border rounded p-4 mt-4">
        <h3 className="text-center mb-5 font-bold text-xl border-b-2 border-gray-300 pb-2">
          Add Product
        </h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 font-bold">Product Title:</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 rounded border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 font-bold">Category:</label>
            <input
              type="text"
              name="cat"
              className="w-full p-2 rounded border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 font-bold">Price:</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full p-2 rounded border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="mb-1 font-bold">Image:</label>
            <div className="flex ml-2">
              <input
                type="file"
                name="img"
                accept="image/*"
                className="w-full p-2 rounded border"
                onChange={handlePictureChange}
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
          <div className="mb-4">
            <label className="mb-1 font-bold">Attributes:</label>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={product.attribute && product.attribute.featured}
                  onChange={handleAttributeChange}
                  className="mr-2"
                />
                <label className="mr-1">Featured</label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  name="latest"
                  checked={product.attribute && product.attribute.latest}
                  onChange={handleAttributeChange}
                  className="mr-2"
                />
                <label className="mr-1">Latest</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="trending"
                  checked={product.attribute && product.attribute.trending}
                  onChange={handleAttributeChange}
                  className="mr-2"
                />
                <label>Trending</label>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            className="bg-[#682A85] text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-[#983ec2]"
            // onMouseOver={(e) => (e.target.style.backgroundColor = "#983ec2")}
            // onMouseLeave={(e) => (e.target.style.backgroundColor = "#983ec1")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Products;
