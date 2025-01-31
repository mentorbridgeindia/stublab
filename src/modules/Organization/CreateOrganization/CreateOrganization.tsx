import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormActionButtons } from "@/ui/molecules/FormActionButtons";
import { IOrganizationMutation } from "@/entities/Organization/Organization.types";
import { useCreateOrganization } from "@/entities/Organization/useCreateOrganization";

const CreateOrganization = () => {
  const [organizationData, setOrganizationData] = useState({
    organization: "",
    website: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrganizationData({ ...organizationData, [name]: value });
  };

  const handleCancel = () => {
    toast.info("Form cancelled.");
    setOrganizationData({ organization: "", website: "" });
  };

  const validateWebsite = (url: string) => {
    const websiteRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
    return websiteRegex.test(url);
  };
  

  const isFormValid = () => {
    return (
      organizationData.organization.trim().length > 0 &&
      organizationData.website.trim().length > 0 &&
      validateWebsite(organizationData.website)
    );
  };

  const { mutate: createOrganization } = useCreateOrganization({
    onSuccess: (res: { status: number }) => {
      if (res.status === 201) {
        toast.success("Model data submitted successfully!");
        setOrganizationData({ organization: "", website: "" }); 
        console.log(organizationData)
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      toast.error("Invalid URL! Please enter a valid website URL.");
      return;
    }

    const jsonData: IOrganizationMutation = {
      name: organizationData.organization,
      website: organizationData.website,
     
      
    };
    

    createOrganization(jsonData); 
  };

  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ width: "28rem" }}>
        <div className="card-body">
         
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="organization" className="form-label">
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={organizationData.organization}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter organization name"
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
                value={organizationData.website}
                onChange={handleChange}
                className="form-control"
                placeholder="https://example.com"
                required
              />
            </div>

            <FormActionButtons
              primaryLabel="Submit"
              secondaryLabel="Cancel"
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              isPrimaryDisabled={!isFormValid()}
              isPrimaryDelete={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;


