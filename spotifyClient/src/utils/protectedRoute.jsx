import { Navigate } from "react-router-dom";
export default  function Protected({ authenticated, children }) {
    console.log(authenticated)
if (!authenticated) {
    return <Navigate to="/" replace />;}

return children;
};
;