import { IOrganizationMutation } from "@entities/Organization/Organization.types";
import { useCreateOrganization } from "@entities/Organization/useCreateOrganization";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButtons } from "@molecules/FormActionButtons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedCard from "./components/AnimatedCard";
import { FormField } from "./components/FormField";
import { SubDomainField } from "./components/SubDomainField";
import { orgSchema } from "./orgSchema";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
  } = useForm<IOrganizationMutation>({
    resolver: yupResolver(orgSchema),
    mode: "onTouched",
  });

  const { mutate: createOrganization } = useCreateOrganization({
    onSuccess: (data) => {
      localStorage.setItem("clientId", data.id);
      toast.success("Organization created successfully!");
      navigate("/home");
    },
    onError: (error: Error) => {
      if (error.message === "SUBDOMAIN_NOT_AVAILABLE") {
        toast.error("Sub Domain is not available");
      }
    },
  });

  const onSubmit = (data: IOrganizationMutation) => createOrganization(data);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-90">
      <AnimatedCard>
        <div style={{ width: "50%" }} className="p-4 ">
          <div>
            <h2 className="mb-3 text-center text-uppercase fs-5 title">
              Create Organization
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                isDirty={isDirty}
                isSubmitted={isSubmitted}
                name="name"
                label="Organization Name"
                placeholder="Enter Organization Name"
                error={errors}
              />
              <SubDomainField
                control={control}
                error={errors}
                isSubmitted={isSubmitted}
              />
              <FormField
                control={control}
                isDirty={isDirty}
                isSubmitted={isSubmitted}
                name="website"
                label="Website"
                placeholder="https://example.com"
                type="url"
                error={errors}
              />
              <FormActionButtons
                primaryLabel="Submit"
                secondaryLabel="Cancel"
                onCancel={() => toast.info("Form cancelled.")}
                onSubmit={handleSubmit(onSubmit)}
                isPrimaryDisabled={!!Object.keys(errors).length}
                isPrimaryDelete={false}
              />
            </form>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CreateOrganization;
