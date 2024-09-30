import Logo from "./logo";
import NavBar from "./navbar";

function Header() {
    return (
        <header>
            <NavBar />
            <h1 className="text-center">Welcome to <Logo></Logo></h1>
        </header>
    )

}

export default Header;