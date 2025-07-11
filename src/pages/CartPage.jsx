// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

// // Mock cart data based on your schema (no changes here)
// const mockCartItems = [
//   { _id: "cart1", user_id: "user123", product_id: "prod1", total_price: 299.98, total_product: 2, product: { _id: "prod1", name: "Wireless Bluetooth Headphones", price: 149.99, image: "/placeholder.svg?height=100&width=100", description: "Premium quality wireless headphones with noise cancellation", inStock: true } },
//   { _id: "cart2", user_id: "user123", product_id: "prod2", total_price: 79.99, total_product: 1, product: { _id: "prod2", name: "Smart Phone Case", price: 79.99, image: "/placeholder.svg?height=100&width=100", description: "Durable protective case with wireless charging support", inStock: true } },
//   { _id: "cart3", user_id: "user123", product_id: "prod3", total_price: 119.97, total_product: 3, product: { _id: "prod3", name: "USB-C Cable", price: 39.99, image: "/placeholder.svg?height=100&width=100", description: "High-speed charging and data transfer cable", inStock: false } },
// ];

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState(mockCartItems);
//   const navigate = useNavigate();

//   const updateQuantity = (cartId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems((items) =>
//       items.map((item) => {
//         if (item._id === cartId) {
//           return { ...item, total_product: newQuantity, total_price: item.product.price * newQuantity };
//         }
//         return item;
//       }),
//     );
//   };

//   const removeItem = (cartId) => {
//     setCartItems((items) => items.filter((item) => item._id !== cartId));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
//   const shipping = subtotal > 100 ? 0 : 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   // Base classes for a button to look consistent
//   const buttonBaseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

//   // --- EMPTY CART VIEW ---
//   if (cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto text-center">
//           <ShoppingCart className="mx-auto h-24 w-24 text-orange-500 mb-6" />
//           <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
//           <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
//           {/* Replaced <Button asChild> with a styled <Link> */}
//           <Link
//             to="/products"
//             className={`${buttonBaseClasses} h-11 px-8 bg-orange-500 hover:bg-orange-600 text-white`}
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- MAIN CART VIEW ---
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         {/* Replaced <Button> with a styled <Link> */}
//         <Link
//           to="/products"
//           className={`${buttonBaseClasses} mb-4 hover:bg-gray-100`}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Continue Shopping
//         </Link>
//         <h1 className="text-3xl font-bold">Shopping Cart</h1>
//         <p className="text-gray-500">
//           {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             // Replaced <Card> with a styled <div>
//             <div key={item._id} className="rounded-lg border bg-white text-gray-800 shadow-sm">
//               {/* Replaced <CardContent> with a styled <div> */}
//               <div className="p-6">
//                 <div className="flex gap-4">
//                   <div className="relative">
//                     <img
//                       src={item.product.image || "/placeholder.svg"}
//                       alt={item.product.name}
//                       width={100}
//                       height={100}
//                       className="rounded-lg object-cover w-[100px] h-[100px]"
//                     />
//                     {!item.product.inStock && (
//                       // Replaced <Badge> with a styled <div>
//                       <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-red-600 text-white absolute -top-2 -right-2">
//                         Out of Stock
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h3 className="font-semibold text-lg">{item.product.name}</h3>
//                         <p className="text-sm text-gray-500">{item.product.description}</p>
//                       </div>
//                       {/* Replaced <Button> with a styled <button> */}
//                       <button
//                         onClick={() => removeItem(item._id)}
//                         className={`${buttonBaseClasses} h-9 px-3 hover:bg-gray-100 text-red-600 hover:text-red-600`}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.total_product - 1)}
//                           disabled={item.total_product <= 1}
//                           className={`${buttonBaseClasses} h-9 px-3 border border-input bg-transparent hover:bg-gray-100`}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </button>
//                         <span className="font-medium min-w-[2rem] text-center">{item.total_product}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.total_product + 1)}
//                           disabled={!item.product.inStock}
//                           className={`${buttonBaseClasses} h-9 px-3 border border-input bg-transparent hover:bg-gray-100`}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </button>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
//                         <p className="font-semibold text-lg">${item.total_price.toFixed(2)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- ORDER SUMMARY --- */}
//         <div className="lg:col-span-1">
//           {/* Replaced <Card> with a styled <div> */}
//           <div className="sticky top-4 rounded-lg border bg-white text-gray-800 shadow-sm">
//             {/* Replaced <CardHeader> and <CardTitle> */}
//             <div className="flex flex-col space-y-1.5 p-6">
//               <h2 className="text-2xl font-semibold leading-none tracking-tight">Order Summary</h2>
//             </div>
//             {/* Replaced <CardContent> */}
//             <div className="p-6 pt-0 space-y-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>

//               {/* Replaced <Separator> with a <hr> tag */}
//               <hr className="shrink-0 bg-gray-200 h-[1px] w-full" />

//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>

//               {shipping > 0 && (
//                 <p className="text-sm text-gray-500">
//                   Add ${(100 - subtotal).toFixed(2)} more for free shipping
//                 </p>
//               )}
              
//               {/* Replaced <Button> with a styled <button> */}
//               <button className={`${buttonBaseClasses} h-11 px-8 w-full bg-orange-500 hover:bg-orange-600 text-white`}>
//                 Proceed to Checkout
//               </button>

//               {/* Replaced <Button asChild> with a styled <Link> */}
//               <Link
//                 to="/products"
//                 className={`${buttonBaseClasses} h-10 px-4 py-2 w-full border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white`}
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft, X, Lock, HandCoins } from "lucide-react";
import axios from "axios";

// --- SVG component for the eSewa logo for a professional look ---
const ESewaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128 128-57.307 128-128S198.693 0 128 0zm0 236.261c-59.73 0-108.26-48.53-108.26-108.26S68.27 19.74 128 19.74s108.26 48.53 108.26 108.26-48.53 108.26-108.26 108.26z" fill="#fff"/>
    <path d="M128.001 39.48c-48.875 0-88.521 39.646-88.521 88.521s39.646 88.521 88.521 88.521 88.521-39.646 88.521-88.521-39.646-88.521-88.521-88.521zm0 162.042c-40.59 0-73.52-32.93-73.52-73.521s32.93-73.521 73.52-73.521 73.521 32.93 73.521 73.521-32.93 73.521-73.52 73.521z" fill="#fff"/>
    <path d="M156.97 128.24l-32.93 32.93v-65.86l32.93 32.93z" fill="#fff"/>
  </svg>
);

// Mock cart data
const mockCartItems = [
  { _id: "cart1", user_id: "user123", product_id: "prod1", total_price: 299.98, total_product: 2, product: { _id: "prod1", name: "Wireless Bluetooth Headphones", price: 149.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", description: "Premium quality wireless headphones with noise cancellation.", inStock: true } },
  { _id: "cart2", user_id: "user123", product_id: "prod2", total_price: 79.99, total_product: 1, product: { _id: "prod2", name: "Smart Phone Case", price: 79.99, image: "https://images.unsplash.com/photo-1598331666166-2f54a1340212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", description: "Durable protective case with wireless charging support.", inStock: true } },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item._id === cartId ? { ...item, total_product: newQuantity, total_price: item.product.price * newQuantity } : item
      )
    );
  };

  const removeItem = (cartId) => {
    setCartItems(items => items.filter(item => item._id !== cartId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const buttonBaseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 disabled:pointer-events-none";

  const handlePlaceOrder = async (paymentMethod) => {
    // In a real app, get this from your auth state
    const userId = "60d0fe4f5311236168a109ca";
    const orderPayload = {
      user_id: userId,
      items: cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.total_product,
        price: item.product.price,
      })),
      total_amount: total,
      shipping_address: "123 Main St, Kathmandu, Nepal",
      payment_method: paymentMethod,
    };
    try {
      console.log("Creating order with payload:", orderPayload);
      // const response = await axios.post('http://localhost:5050/api/orders', orderPayload);
      setIsModalOpen(false);
      alert(`Order placed successfully via ${paymentMethod}!`);
      setCartItems([]);
      navigate('/order-success');
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  // Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingCart className="mx-auto h-24 w-24 text-slate-400 mb-6" />
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Cart is Empty</h1>
          <p className="text-slate-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart. Let's go find something great!</p>
          <Link to="/products" className={`${buttonBaseClasses} h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transform hover:scale-105`}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Main Cart View
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Shopping Cart</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-6 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
                <img src={item.product.image} alt={item.product.name} className="w-28 h-28 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-slate-800">{item.product.name}</h3>
                      <button onClick={() => removeItem(item._id)} className={`${buttonBaseClasses} h-9 w-9 p-0 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-500`}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{item.product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item._id, item.total_product - 1)} disabled={item.total_product <= 1} className={`${buttonBaseClasses} h-8 w-8 p-0 border border-slate-300`}>-</button>
                      <span className="font-medium text-slate-700 w-10 text-center">{item.total_product}</span>
                      <button onClick={() => updateQuantity(item._id, item.total_product + 1)} className={`${buttonBaseClasses} h-8 w-8 p-0 border border-slate-300`}>+</button>
                    </div>
                    <p className="font-semibold text-lg text-slate-800">${item.total_price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Order Summary</h2>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="font-medium">${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              </div>
              <hr className="my-4 border-t border-slate-200" />
              <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <button onClick={() => setIsModalOpen(true)} className={`${buttonBaseClasses} w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105`}>
                <Lock className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PAYMENT MODAL --- */}
      {isModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="fixed inset-0 bg-black/70" onClick={() => setIsModalOpen(false)}></div>
          <div className={`relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all duration-300 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800">Confirm Your Order</h3>
              <p className="mt-2 text-slate-500">Choose your preferred payment method to complete the purchase.</p>
              <div className="my-6 text-4xl font-extrabold text-slate-900">${total.toFixed(2)}</div>
            </div>
            <div className="space-y-4">
              <button onClick={() => handlePlaceOrder('COD')} className={`${buttonBaseClasses} w-full py-4 text-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400`}>
                <HandCoins className="w-6 h-6 mr-3" />
                Cash on Delivery
              </button>
              <button onClick={() => handlePlaceOrder('eSewa')} style={{ backgroundColor: '#60BB46' }} className={`${buttonBaseClasses} w-full py-4 text-lg text-white hover:opacity-90`}>
                <ESewaLogo />
                <span className="ml-3">Pay with eSewa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}