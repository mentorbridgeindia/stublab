import './FormLabel.scss';

export const FormLabel = ({ children,className, ...props }:any) => {
    return (
        <div className='form-label'>
            <label className={`label ${className || ""}`} {...props}>
               {children} 
            </label>
        </div>
    );
};

