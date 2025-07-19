import React, { useState } from "react";

export function OrderList({ orders, onUpdateOrder, onDeleteOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!Array.isArray(orders)) return <p style={{ textAlign: "center", padding: "24px" }}>No orders to display.</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user_id?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_id?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by customer or product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", padding: "40px 0", fontSize: "18px" }}>
          No orders found.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredOrders.map((order) => (
            <li
              key={order._id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Product Image */}
              <img
                // src={order.product_id?.image || ""}
                // src={`https://localhost:5050/${order.product_id?.image }`}
                src={`http://localhost:5050/${order.product_id?.image }`}
                alt={order.product_id?.title || "Product image"}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
              />

              {/* Order Info */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: "4px 0", fontWeight: "600" }}>
                  Customer: <span style={{ fontWeight: "400" }}>{order.user_id?.fullName || "Unknown"}</span>
                </p>
                <p style={{ margin: "4px 0", fontWeight: "600" }}>
                  Product: <span style={{ fontWeight: "400" }}>{order.product_id?.title || "Unknown"}</span>
                </p>
                <p style={{ margin: "4px 0", fontWeight: "600" }}>
                  Status: <span>{order.status}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div>
                <button
                  onClick={() => onUpdateOrder(order._id, { status: "Delivered" })}
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Mark Delivered
                </button>

                <button
                  onClick={() => onDeleteOrder(order._id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
