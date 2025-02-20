import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { toast } from "react-hot-toast"
import { courseEndpoints } from "../services/apis"
const {
  GET_ALL_COURSE_API
} = courseEndpoints

const CartPage = () => {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("GET", GET_ALL_COURSE_API);
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      } 
      setCourses(response?.data?.data);
    } catch (error) {
      console.log("GET_ALL_COURSE_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await getAllCourses();
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{course.name}</h2>
              <p className="text-gray-400 text-sm mt-2">{course.description}</p>
              <p className="text-yellow-400 text-lg font-bold mt-2">
                ₹{course.price}
              </p>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-400">No courses in cart</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
