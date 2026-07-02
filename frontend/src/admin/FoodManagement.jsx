import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/features/cartSlice";
import { deleteFood, getfoods } from "../api/food.service";

const FoodManagement = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const { data, isPending, isError, error } = useQuery({
    
    queryKey: ["foods"],
    queryFn: getfoods,
  });
const foods = data?.foods || [];
  const navigate = useNavigate();

  

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return deleteFood(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (err) => {
      console.log("failed to delete food");
    },
  });

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">
          Loading food database...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header section with add button placeholder typical for management views */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Food Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all items in the food menu database including their image,
            description, and price.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              navigate("/admin/add-food");
            }}
            className="block rounded-lg bg-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>
      {isError && (
  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
    {error?.response?.data?.message || "Failed to fetch foods."}
  </div>
)}

      {/* Tabular Layout */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Image
                </th>
                <th scope="col" className="px-6 py-4">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
           <tbody className="divide-y divide-gray-200 bg-white">
  {foods.length > 0 ? (
    foods.map((food) => (
      <tr
        key={food._id}
        className="hover:bg-gray-50 transition-colors"
      >
        <td className="px-6 py-4">
          <img
            src={food.photo}
            alt={food.name}
            onClick={() => navigate(`/menu/${food._id}`, { state: food })}
            className="h-12 w-16 rounded-md object-cover border cursor-pointer"
          />
        </td>

        <td className="px-6 py-4 font-medium">
          {food.name}
        </td>

        <td className="px-6 py-4">
          <p className="line-clamp-2">
            {food.description}
          </p>
        </td>

        <td className="px-6 py-4 font-semibold text-orange-600">
          Rs {food.price}
        </td>

        <td className="px-6 py-4 text-right space-x-3">
          <button
            onClick={() =>
              navigate("/admin/edit-food", { state: food })
            }
            className="text-indigo-600 hover:text-indigo-800"
          >
            Edit
          </button>

          <button
            onClick={() => deleteMutation.mutate(food._id)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={5}
        className="py-16 text-center"
      >
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No food items available
          </h3>

          <p className="mt-2 text-gray-500">
            Click <strong>Add New Item</strong> to add your first food.
          </p>

          <button
            onClick={() => navigate("/admin/add-food")}
            className="mt-5 rounded-lg bg-orange-600 px-5 py-2 text-white hover:bg-orange-700"
          >
            Add New Item
          </button>
        </div>
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;