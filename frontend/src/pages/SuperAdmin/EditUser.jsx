import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

// Validation schema for User ID input
const userIdSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
});

// Validation schema for power assignment
const powerSchema = Yup.object().shape({
  power: Yup.string().required("Please select a power"),
});

export default function EditUser() {
  const [allPowers, setAllPowers] = useState([]); // List of all available powers
  const [userPowers, setUserPowers] = useState([]); // Powers already assigned to the user
  const [userId, setUserId] = useState(""); // User ID input
  const [fetchComplete, setFetchComplete] = useState(false); // To control the power form rendering

  // User ID Form
  const {
    control: userIdControl,
    handleSubmit: handleUserIdSubmit,
    formState: { errors: userIdErrors },
  } = useForm({
    resolver: yupResolver(userIdSchema),
    defaultValues: {
      userId: "",
    },
  });

  // Power Assignment Form
  const {
    control: powerControl,
    handleSubmit: handlePowerSubmit,
    formState: { errors: powerErrors },
  } = useForm({
    resolver: yupResolver(powerSchema),
    defaultValues: {
      power: "",
    },
  });

  // Fetch available and user-assigned powers after User ID submission
  const fetchPowers = async (data) => {
    setUserId(data.userId);
    try {
      const { data: availablePowers } = await axios.get("/api/powers");
      const { data: userAssignedPowers } = await axios.get(
        `/api/users/${data.userId}/powers`
      );
      setAllPowers(availablePowers);
      setUserPowers(userAssignedPowers);
      setFetchComplete(true); // Allows the power form to be displayed
    } catch (error) {
      console.error("Error fetching powers: ", error);
    }
  };

  // Handle power assignment
  const onAssignPower = async (data) => {
    try {
      const response = await axios.post(
        `/api/users/${userId}/assign-power`,
        data
      );
      console.log("Power assigned successfully:", response.data);
      setUserPowers((prev) => [...prev, response.data.power]);
    } catch (error) {
      console.error("Error assigning power: ", error);
    }
  };

  // Handle removing power
  const handleRemovePower = async (powerId) => {
    try {
      await axios.post(`/api/users/${userId}/remove-power`, { powerId });
      console.log("Power removed successfully");
      setUserPowers((prev) => prev.filter((power) => power.id !== powerId)); // Update the assigned powers list
    } catch (error) {
      console.error("Error removing power: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Step 1: User ID Submission Form */}
      {!fetchComplete && (
        <form
          onSubmit={handleUserIdSubmit(fetchPowers)}
          className="space-y-4 w-full max-w-md mx-auto"
        >
          <div>
            <label>User ID</label>
            <Controller
              control={userIdControl}
              name="userId"
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter User ID"
                  className="border p-2 rounded w-full"
                />
              )}
            />
            {userIdErrors.userId && (
              <p className="text-red-500">{userIdErrors.userId.message}</p>
            )}
          </div>

          <div className="flex w-full justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Fetch Powers
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Power Assignment and Removal Form (after fetching powers) */}
      {fetchComplete && (
        <>
          {/* Powers Dropdown for assigning */}
          <form
            onSubmit={handlePowerSubmit(onAssignPower)}
            className="space-y-4 w-full max-w-md mx-auto"
          >
            <div>
              <label>Select Power to Assign</label>
              <Controller
                control={powerControl}
                name="power"
                render={({ field }) => (
                  <select {...field} className="border p-2 rounded w-full">
                    <option value="">Select a power</option>
                    {allPowers
                      .filter(
                        (power) => !userPowers.some((p) => p.id === power.id)
                      ) // Filter out already assigned powers
                      .map((power) => (
                        <option key={power.id} value={power.id}>
                          {power.name}
                        </option>
                      ))}
                  </select>
                )}
              />
              {powerErrors.power && (
                <p className="text-red-500">{powerErrors.power.message}</p>
              )}
            </div>

            <div className="flex w-full justify-center space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Assign Power
              </button>
            </div>
          </form>

          {/* Display Assigned Powers */}
          <div className="mt-6">
            <h2 className="font-bold">Assigned Powers</h2>
            <ul className="space-y-2 mt-2">
              {userPowers.map((power) => (
                <li
                  key={power.id}
                  className="flex justify-between items-center"
                >
                  <span>{power.name}</span>
                  <button
                    onClick={() => handleRemovePower(power.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
