import './Anchor.scss';

 export const Anchor = ({ children,herf,className, ...props }:any) => {
    return (
        <div>
            <a href={herf} className={`anchor ${className || ""}`} {...props}>
                {children}
            </a>
        </div>
    );
}


