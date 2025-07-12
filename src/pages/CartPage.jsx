
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, X, Lock, HandCoins, Loader2 } from "lucide-react";
import { useGetCarts } from "../hooks/cartHooks";
import { useDeleteCart } from "../hooks/cartHooks";
import { useUpdateCart } from "../hooks/cartHooks";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

const ESewaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128 128-57.307 128-128S198.693 0 128 0zm0 236.261c-59.73 0-108.26-48.53-108.26-108.26S68.27 19.74 128 19.74s108.26 48.53 108.26 108.26-48.53 108.26-108.26 108.26z" fill="#fff"/>
    <path d="M128.001 39.48c-48.875 0-88.521 39.646-88.521 88.521s39.646 88.521 88.521 88.521 88.521-39.646 88.521-88.521-39.646-88.521-88.521-88.521zm0 162.042c-40.59 0-73.52-32.93-73.52-73.521s32.93-73.521 73.52-73.521 73.521 32.93 73.521 73.521-32.93 73.521-73.52 73.521z" fill="#fff"/>
    <path d="M156.97 128.24l-32.93 32.93v-65.86l32.93 32.93z" fill="#fff"/>
  </svg>
);

export default function CartPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: cart = [], isLoading, isError } = useGetCarts();
  const queryClient = useQueryClient();
  const { mutate: deleteCartItem, isLoading: isDeleting } = useDeleteCart();
  const { mutate: updateCartItem, isLoading: isUpdating } = useUpdateCart();
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [localCartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const newItems = cart.map(item => ({
        _id: item._id,
        product: item.product_id,
        total_product: item.total_product,
        total_price: item.total_price,
      }));
      setLocalCartItems(prev => {
        const isSame = JSON.stringify(prev) === JSON.stringify(newItems);
        return isSame ? prev : newItems;
      });
    }
  }, [cart]);

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setLocalCartItems(items =>
      items.map(item =>
        item._id === cartId
          ? {
              ...item,
              total_product: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      )
    );
  };

  const removeItem = (cartId) => {
    setDeletingId(cartId);
    deleteCartItem(cartId, {
      onSuccess: () => setDeletingId(null),
      onError: () => {
        alert("Failed to delete cart item.");
        setDeletingId(null);
      }
    });
    setLocalCartItems(items => items.filter(item => item._id !== cartId));
  };

  const subtotal = localCartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleEsewaPayment = () => {

  
    const transaction_uuid = uuidv4(); // or use uuid v4 if required
    console.log(transaction_uuid)
    const product_code = "EPAYTEST"
    const total_amount = total.toFixed(2) // You must match this exactly as in the string
    const signed_field_names = "total_amount,transaction_uuid,product_code"
  
    const signingString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
    const secret = "8gBm/:&EnhH.1/q" // ← UAT secret key from eSewa. DO NOT USE IN PRODUCTION FRONTEND.
  
    const signature = CryptoJS.HmacSHA256(signingString, secret).toString(CryptoJS.enc.Base64)
  
    const fields = {
      amount: total.toFixed(2),
      tax_amount: "0",
      total_amount: total_amount,
      transaction_uuid: transaction_uuid,
      product_code: product_code,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "https://developer.esewa.com.np/success",
      failure_url: "https://developer.esewa.com.np/failure",
      signed_field_names: signed_field_names,
      signature: signature,
    }
  
    const form = document.createElement("form")
    form.setAttribute("method", "POST")
    form.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2/form")
  
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.setAttribute("type", "hidden")
      input.setAttribute("name", key)
      input.setAttribute("value", value)
      form.appendChild(input)
    })
  
    document.body.appendChild(form)
    form.submit()
  }

  const handlePlaceOrder = async (paymentMethod) => {
    const userId = "60d0fe4f5311236168a109ca";
    const orderPayload = {
      user_id: userId,
      items: localCartItems.map(item => ({
        product_id: item.product._id,
        quantity: item.total_product,
        price: item.product.price,
      })),
      total_amount: total,
      shipping_address: "123 Main St, Kathmandu, Nepal",
      payment_method: paymentMethod,
    };
    try {
      console.log("Creating order with payload:", orderPayload);
      setIsModalOpen(false);
      alert(`Order placed successfully via ${paymentMethod}!`);
      navigate('/order-success');
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const buttonBaseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 disabled:pointer-events-none";

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-10 w-10 text-orange-500" /></div>;
  if (isError) return <div className="text-center p-10 text-red-600">Failed to load cart</div>;
  if (!localCartItems.length) return <div className="text-center p-10">Your Cart is Empty</div>;

  const getProductImage = (image) => {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `http://localhost:5050/${image}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {localCartItems.map(item => (
            <div key={item._id} className="flex gap-6 bg-white p-6 rounded-xl shadow-md">
              <img src={getProductImage(item.product?.image)} alt={item.product?.title} className="w-28 h-28 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{item.product?.title}</h3>
                  <button onClick={() => removeItem(item._id)} disabled={isDeleting && deletingId === item._id} className="text-red-500"><Trash2 /></button>
                </div>
                <p className="text-sm text-gray-500">{item.product?.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item._id, item.total_product - 1)} disabled={item.total_product <= 1} className="border px-2">-</button>
                    <span>{item.total_product}</span>
                    <button onClick={() => updateQuantity(item._id, item.total_product + 1)} className="border px-2">+</button>
                  </div>
                  <p className="text-lg font-bold">${item.total_price?.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white p-8 rounded-xl relative w-full max-w-md">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500"><X /></button>
            <h3 className="text-2xl font-bold text-center mb-4">Confirm Your Order</h3>
            <div className="text-center text-3xl font-bold mb-6">${total.toFixed(2)}</div>
            <button onClick={() => handlePlaceOrder('COD')} className="w-full py-3 border rounded-lg mb-4">Cash on Delivery</button>
            <button onClick={handleEsewaPayment} className="w-full py-3 rounded-lg text-white flex justify-center items-center gap-2" style={{ backgroundColor: '#60BB46' }}>
              <ESewaLogo /><span>Pay with eSewa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
