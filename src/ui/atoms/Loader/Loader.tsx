
import { ReactComponent as Logo } from "@icons/icon-logo.svg";
import "./Loader.scss";
function Loader({isLoading}: {isLoading: boolean}) {
  return (
    isLoading ? <div className="App">
       <Logo className="logo"/>
    </div> : null
  );
}
export default Loader;