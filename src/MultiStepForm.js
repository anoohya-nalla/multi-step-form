import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = () => {
    const { firstName, lastName, email, phoneNumber } = formData;
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      errors.firstName = "Last Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+.\S+$/.test(email)) {
      errors.email = "Invalid Email Format";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(formData);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      {step === 1 && (
        <form onSubmit={nextStep} className="border-2 m-10 w-full">
          <p className="text-black text-center">Step 1: Personal Information</p>
          <label>First Name</label>
          <br />
          <input
            className="border-slate-500 border rounded-md px-3 py-1 w-full"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <br />
          <label>Last Name</label>
          <br />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border-slate-500 border rounded-md px-3 py-1 w-full"
            required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <br />
          <br />
          <br />
          <button type="submit" className="bg-slate-500 rounded-md px-3 py-1">
            Next
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Step 2: Contact Information</h2>
          <br />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <br />
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          <br />
          <button onClick={prevStep}>Previous</button>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
