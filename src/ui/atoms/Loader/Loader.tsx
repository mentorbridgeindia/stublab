
import { ReactComponent as Logo } from "@icons/icon-logo.svg";
import "./Loader.scss";
export const Loader = ({ isLoading }: { readonly isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="App">
       <Logo className="logo"/>
    </div>
  );
}
