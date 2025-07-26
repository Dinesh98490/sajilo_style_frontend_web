import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCreateCategory } from "../hooks/admin/usecategory/categoryHooks";
import { useUpdateCategory } from "../hooks/admin/usecategory/categoryHooks";
import { useDeleteCategory } from "../hooks/admin/usecategory/categoryHooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryPage() {
  const createMutation = useCreateCategory();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/admin/category"); // updated path
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      
      alert("Title is required");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/admin/category/${editingId}`, { title, desc });
        toast.success("Category updated successfully!");
      } else {
        await createMutation.mutateAsync({ title, desc });
        toast.success("Category created successfully!"); 
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      // alert("Error saving category");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setTitle(category.title);
    setDesc(category.desc || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/admin/category/${id}`);
        fetchCategories();
      } catch {
        alert("Failed to delete category");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Category title"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Optional description"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-3 px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {/* {(!Array.isArray(categories) || categories.length === 0) && (
            <p>No categories found.</p>
          )} */}
          {Array.isArray(categories) && categories.length > 0 && (
            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{category.title}</p>
                    <p className="text-gray-600 text-sm">{category.desc}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
