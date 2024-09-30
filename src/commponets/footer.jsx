import Logo from "./logo";

function Footer(){
    return (
      <footer className=" bg-dark text-light text-center py-3">
       <span>
    <Logo/>
        </span>

        <span className="mx-2">&copy;</span>

        <span>{new Date().getFullYear()}</span>
        <br />
        <span><a href="tel:+9760556866628" style={{color:"white"}}>055-686-6638</a></span>
    </footer>
    );
}

export default Footer;