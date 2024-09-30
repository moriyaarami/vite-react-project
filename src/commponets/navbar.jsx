import { NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";

function NavBar() {

  const { user } = useAuth();
  /*   const [input, setInput] = useState(""); */
  return <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#"><Logo /></a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link" >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" >About</NavLink>
            </li>

            {(user && user.isBusiness) ? <> <li className="nav-item">
              <NavLink to="/my-card" className="nav-link" >My-Card</NavLink>
            </li>
              <li className="nav-item">
                <NavLink to="/create-card" className="nav-link" >CreateCard</NavLink>
              </li>
              {/*  <li className="nav-item">
                <NavLink to="/favorite-cards" className="nav-link" >Favorite-Cards</NavLink>
              </li> */}

            </> : <li className="nav-item"></li>}

            {/*  <li className="nav-item">
              <input className="form-control me-1" type="text" placeholder="Search" aria-label="Search" onInput={(e) => setInput(e.target.value)} value={input} />
            </li> */}

          </ul>

          <ul className="navbar-nav ms-auto ">
            {user ? (<li className="nav-item">
              <NavLink to="/log-out" className="nav-link"  >Log Out</NavLink>
            </li>) : <><li className="nav-item">
              <NavLink to="/sign-in" className="nav-link" >Sign In</NavLink>
            </li>
              <li className="nav-item">
                <NavLink to="/sign-up" className="nav-link"  >Sign Up</NavLink>
              </li></>}
            {/* <li className="nav-item">
              <NavLink to="/sign-in" className="nav-link" >Sign In</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sign-up" className="nav-link"  >Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/log-out" className="nav-link"  >Log Out</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  </>
}

export default NavBar;