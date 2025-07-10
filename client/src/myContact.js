import { useContext } from "react";
import LocationContext from "./locationcontext";
function MyContacts(){
    const {location,updateLocation} = useContext(LocationContext);
    return(
        <div>
            <h1>My Contact</h1>
            <p>List of Contact will be displayed here.</p>
            {location}
        </div>
    );
}
export default MyContacts;