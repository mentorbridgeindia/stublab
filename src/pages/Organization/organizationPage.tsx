import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormActionButtons } from "@/ui/molecules/FormActionButtons";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    organization: "",
    website: "",
  });
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    setFormData({ organization: "", website: "" });
  
  };

  const validateWebsite = (url: string) => {
    
    const websiteRegex =/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?(\?[^\s#]*)?(#[^\s]*)?$/;




    return websiteRegex.test(url)
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    console.log("Form submitted:", formData);
  };

  const isFormValid = () => {
    return (
      formData.organization &&
      formData.website &&
      validateWebsite(formData.website)
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Organization Page</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="organization" className="form-label">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <FormActionButtons
              primaryLabel="Submit"
              secondaryLabel="Cancel"
              onCancel={handleCancel}
              onSubmit={() =>
                handleSubmit(new Event("submit") as unknown as React.FormEvent)
              }
              isPrimaryDisabled={!isFormValid()}
              isPrimaryDelete={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
