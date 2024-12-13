import './FormInput.scss';

export const FormInput = ({className, ...props}:any) => {
    return <input type='text' className={`input ${className || ""}`} {...props} />;
}

