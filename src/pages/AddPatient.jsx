import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createPatient,
} from "../services/patientService";

function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      newErrors.age =
        "Age must be between 1 and 120.";
    }

    if (!formData.gender) {
      newErrors.gender =
        "Gender is required.";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup =
        "Blood group is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    createPatient(formData);

    navigate("/patients");
  };

  return (
    <div>
      <div className="page-heading">
        <h2>Add Patient</h2>

        <p>
          Create a new patient record.
        </p>
      </div>

      <section className="dashboard-section">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="firstName">
                First Name *
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />

              {errors.firstName && (
                <p className="form-error">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="lastName">
                Last Name *
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />

              {errors.lastName && (
                <p className="form-error">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="age">
                Age *
              </label>

              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
              />

              {errors.age && (
                <p className="form-error">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="gender">
                Gender *
              </label>

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {errors.gender && (
                <p className="form-error">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="phone">
                Phone *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone"
              />

              {errors.phone && (
                <p className="form-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="patient@example.com"
              />

              {errors.email && (
                <p className="form-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="bloodGroup">
                Blood Group *
              </label>

              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">
                  Select blood group
                </option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              {errors.bloodGroup && (
                <p className="form-error">
                  {errors.bloodGroup}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate("/patients")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Add Patient
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddPatient;