import React, { useState, useEffect } from "react";
import avatar from "./images.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    aadharFile: null,
  });

  const [editField, setEditField] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsFirstTime(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, aadharFile: previewURL }));
    }
  };

  const handleSave = async () => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setIsFirstTime(false);
    setEditField(null);

    try {
      const response = await fetch("https://your-api.com/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
    }
  };

  const renderField = (label, fieldName, type = "text") => {
    const editable = isFirstTime || editField === fieldName;

    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        {editable ? (
          type === "textarea" ? (
            <textarea
              className="form-control"
              name={fieldName}
              value={userData[fieldName]}
              onChange={handleChange}
              rows="3"
            />
          ) : (
            <input
              type={type}
              className="form-control"
              name={fieldName}
              value={userData[fieldName]}
              onChange={handleChange}
            />
          )
        ) : (
          <div className="d-flex justify-content-between align-items-center border rounded p-2 bg-light">
            <span>{userData[fieldName] || "Not provided"}</span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setEditField(fieldName)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle border border-primary"
                  width="100"
                  height="100"
                />
                <h4 className="mt-3">Your Profile</h4>
              </div>

              {renderField("Name", "name")}
              {renderField("Phone Number", "phone")}
              {renderField("Address", "address", "textarea")}

              <div className="mb-4">
                <label className="form-label">Aadhar Card</label>
                {isFirstTime || editField === "aadharFile" ? (
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                  />
                ) : userData.aadharFile ? (
                  <div className="d-flex justify-content-between align-items-center border rounded p-2 bg-light">
                    <img
                      src={userData.aadharFile}
                      alt="Aadhar Preview"
                      className="img-thumbnail"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setEditField("aadharFile")}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <p>
                    No Aadhar Uploaded{" "}
                    <button
                      className="btn btn-sm btn-primary ms-2"
                      onClick={() => setEditField("aadharFile")}
                    >
                      Upload
                    </button>
                  </p>
                )}
              </div>

              {(isFirstTime || editField) && (
                <button className="btn btn-primary w-100" onClick={handleSave}>
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
