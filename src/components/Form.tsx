import { Anchor } from "@atoms/Anchor/Anchor";
import { FormInput } from "@atoms/FormInput/FormInput";
import {FormLabel} from "@atoms/FormLabel/FormLabel";
import FormAction from "@molecules/FormActionButtons";


const Form = () => {

  const handleCancel = () => {
    console.log("Form canceled");
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  const wrapperStyle = {
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "400px",
    margin: "10% auto",
  };

  return (
   <div style={wrapperStyle} >
    <div>
      <form>
        <FormLabel>Enter your Name</FormLabel>
        <FormInput placeholder="Name"/>
        <FormLabel>Enter your Password</FormLabel>
        <FormInput placeholder="Password" />
        <Anchor href="www.google.com">Google</Anchor>
        <div>
          <FormAction
            isPrimaryDisabled={false}
            primaryLabel="Submit"
            secondaryLabel="Cancel"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
</div>
    
  );
};

export default Form;
