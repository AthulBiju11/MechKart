import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  addItemToCartWithDatabaseUpdate,
  removeItemFromCartWithDatabaseUpdate,
  clearItemFromCartWithDatabaseUpdate,
  resetCartAction,
} from "../../store/cart/cart.reducer";
import { toast } from "react-toastify";
import newRequest from "../../utils/newRequest";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Static discount value
  const dis = 1000;
  const cartTotFinal = cartTotal - dis;

  // Handlers for modifying cart
  const handleAdd = (product) => {
    dispatch(addItemToCartWithDatabaseUpdate(product));
  };

  const handleReduce = (product) => {
    dispatch(removeItemFromCartWithDatabaseUpdate(product));
  };

  const handleRemove = (product) => {
    dispatch(clearItemFromCartWithDatabaseUpdate(product));
  };

  // Updated checkout handler:
  // 1. Create the order with PaymentStatus=PENDING.
  // 2. Open Razorpay checkout.
  // 3. On successful payment, update the order's payment status,
  // then clear the cart.
  const handleCheckOut = async (price) => {
    try {
    // Build the order payload from the cart items.
    const orderPayload = {
    items: cartItems.map((item) => ({
    product: { id: item._id || item.id },
    quantity: item.quantity,
    price: item.price,
    })),
    totalPrice: cartTotFinal,
    };
    
    // Create the order in the backend.
    const createOrderRes = await newRequest.post("/orders", orderPayload);
    console.log("Order created with pending payment:", createOrderRes.data);
    // Assume the created order object has an "id" field.
    const orderId = createOrderRes.data.id;
    
    // Prepare Razorpay checkout options.
    const options = {
      key: "rzp_test_vc8XY2Q34138RT",
      key_secret: "Wg893VmTA2VegApQqTzMZS9Z",
      amount: price * 100,
      currency: "INR",
      name: "MechKart",
      description: "Mechanical Items",
      handler: async function (response) {
        console.log("Payment successful:", response);
        try {
          // Update order's payment status using the appropriate endpoint.
          const updatePayload = { paymentStatus: "PAID" };
          const updateRes = await newRequest.put(`/orders/${orderId}/payment`, updatePayload);
          console.log("Order updated with payment status PAID:", updateRes.data);
    
          // Now clear the cart from the database by setting an empty cart.
          await newRequest.post("/carts/set", []); // This clears the cart in the DB.
          // Also clear the local Redux store cart.
          dispatch(resetCartAction());
    
          toast.success("Payment successful! Your order has been placed.");
          navigate("/");
        } catch (updateError) {
          console.error("Error updating order status or clearing cart:", updateError);
          toast.error("Payment succeeded but updating order status/clearing cart failed!");
        }
      },
      prefill: {
        // Optionally prefill customer details here.
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#ffa500",
      },
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
    } catch (error) {
    console.error("Error during checkout:", error);
    alert("An error occurred during checkout.");
    }
    };

  return (
    <div className="p-5">
      <div className="w-[110px] bg-[#682A85] hover:bg-[#983ec2] h-[47px] my-[-5px] flex items-center justify-center rounded-[5px] cursor-pointer">
        <button className="text-white" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="bg-gray-200 p-4 mb-5 h-[180px] flex justify-center items-center">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      <div className="flex">
        <div className="w-9/12 pr-4">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold">Cart Items</h2>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th style={{ width: "40%", textAlign: "left" }}>Product</th>
                  <th style={{ width: "20%", textAlign: "left" }}>Quantity</th>
                  <th style={{ width: "20%", textAlign: "left" }}>Price</th>
                  <th style={{ width: "20%", textAlign: "left" }}></th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="flex items-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-25 h-24 mr-2"
                        />
                        {item.title}
                      </td>

                      <td>
                        <div className="flex items-center">
                          <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-l"
                            onClick={() => handleReduce(item)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-r"
                            onClick={() => handleAdd(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>Rs.{item.price}</td>
                      <td>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                          onClick={() => handleRemove(item)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-3/12 pl-4">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold">Other Details</h2>
            {/* Add other details or components as needed */}
          </div>
          <div className="border border-gray-300 rounded p-4 mt-4 pb-10">
            <h2 className="text-xl font-bold">Summary</h2>
            <div className="flex justify-between mt-4">
              <div>Total Price:</div>
              <div>Rs.{cartTotal}</div>
            </div>
            <div className="flex justify-between mt-2">
              <div>Discount:</div>
              <div>Rs.{dis}</div>
            </div>

            <div className="flex justify-between mt-2">
              <div>Total:</div>
              {cartTotal && <div>Rs.{cartTotFinal}</div>}
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded float-right p-2 mt-4"
              onClick={() => handleCheckOut(cartTotFinal)}
            >
              Check Out
            </button>
            <div className="border-t mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
