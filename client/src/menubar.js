function Menubar(props){
    return(
        <div>
            <h1>{props.mytitle}-{props.location}</h1>
        <ul>
        <li>Movies</li>
        <li>Home</li>
        <li>Events</li>
        <li>Contact</li>
        </ul>
        </div>
        // <div></div>
    )
}
export default Menubar;