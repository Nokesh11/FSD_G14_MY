import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FieldModal from "../../components/SuperAdmin/FieldModal";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  instituteId: Yup.string().required("Institute ID is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dynamicFields: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Label is required"),
      placeholder: Yup.string().required("Placeholder is required"),
      value: Yup.string(), // Value is optional
    })
  ),
});

export default function AddUser() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: "",
      name: "",
      password: "",
      instituteId: "",
      email: "",
      dynamicFields: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const handleAddField = (label, placeholder) => {
    append({ label, placeholder, value: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[80%] mx-auto">
      {/* Static Fields */}
      <div>
        <label>ID</label>
        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter ID"
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.id && <p className="text-red-500">{errors.id.message}</p>}
      </div>

      <div>
        <label>Name</label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter Name"
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <input
              type="password"
              {...field}
              placeholder="Enter Password"
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Institute ID</label>
        <Controller
          control={control}
          name="instituteId"
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter Institute ID"
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.instituteId && (
          <p className="text-red-500">{errors.instituteId.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter Email"
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Dynamic Fields */}
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <div>
            <label>{field.label}</label>
            <Controller
              control={control}
              name={`dynamicFields.${index}.value`}
              render={({ field: inputField }) => (
                <input
                  {...inputField}
                  placeholder={field.placeholder}
                  className="border p-2 rounded w-full"
                />
              )}
            />
          </div>
        </div>
      ))}

      <div className="flex w-full">
        <div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add New Field
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal for Adding New Field */}
      <FieldModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddField={handleAddField}
      />
    </form>
  );
}
