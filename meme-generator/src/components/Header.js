import Logo from '../images/lol.png';

export default function Header() { 
    return (
        <header className="header">
            <img src={Logo} alt="logo"/>
            <p className="large">Meme Generator</p>
            <p>React - Project</p>
        </header>
    )
}