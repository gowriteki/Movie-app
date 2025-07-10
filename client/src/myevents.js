// function MyEvents(){
//     return(
//         <div>
//             <h1>My Events</h1>
//             <p>List of Events will be displayed here.</p>
//         </div>
//     );
// }
// export default MyEvents;
import {useState,useEffect} from 'react';
import { useContext } from 'react';
import LocationContext from './locationcontext';

const MyEvents=()=>{
    const{location,updateLocation}=useContext(LocationContext);
    const[eventTypes,setEventTypes]=useState(['sports','movie','dance']);
    const[eventType, setEventType]=useState('');
    const[eventName, setEventName]=useState('');
    const[eventDesc, setEventDesc]=useState('');
    const handleEventTypeChange=(e)=>{
        setEventType(e.target.value);
    }
    const saveEvents=()=>{
        var data={
            'type':eventType,
            'name':eventName,
            'desc':eventDesc
        }
    }
    // const handleEventNameChange=()=>{
    //     setEventName('kuchipudi');
    // }
    // const handleEventDescChange=()=>{
    //     setEventDesc('competition');
    // }
    useEffect(()=>{
        console.log('triggered useEffect');
    },[]);//componentDidMount equivalent
    return(
        <div className='container'>
            <h1>My Events</h1>
            <hr />
            <p>Location:{location}</p> 
            <div className='row'>
            <div className='col-md-5'>
            <form>
                  <div className='form-group'>
                  <label>Event Type</label>
                <select className='form-control' value={eventType} onChange={(e)=>setEventType(e.target.value)}>
                    {eventTypes.map((type,index)=>(
                        <option key={index} value={type}>{type}123</option>
                    ))}
                   </select> 
                    </div>
                       <div className="form-group">
                    <label>Event Name</label>
                    <input type="text" className="form-control" value={eventName} onChange={(e)=>setEventName(e.target.value)}/>
                </div>
                  <div className="form-group">
                    <label>Event Description</label>
                    <textarea className="form-control" value={eventDesc} onChange={(e)=>setEventDesc(e.target.value)}/>
                </div>
                <button type='button'className='btn btn-primary'>Save</button>
                 <button type='button'className='btn btn-secondary'>Reset</button>
            </form>
            <hr/>
            </div>
            <div className='col-md-7'>
                <h3>Event Details</h3>
                <p><strong>Type:</strong>{eventType}</p>
                <p><strong>Name:</strong>{eventName}</p>
                <p><strong>Description:</strong>{eventDesc}</p>
           
        </div>
        </div>
        </div>
    );
}
export default MyEvents;

 {/* <h3>{eventType}</h3>
            <h3>{eventName}</h3>
            <h3>{eventDesc}</h3>
            <button onClick={handleEventTypeChange}>change event Type</button>
            {/* <button onClick={handleEventNameChange}>change event Name </button>
            <button onClick={handleEventDescChange}>change event Desc</button> */} 