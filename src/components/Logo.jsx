import ChessLogo from '../assets/images/Logo.png';

const Logo = (isBeta = false) => {
    return <div className="logo">
        <img src={ChessLogo} alt="logo"/>
        <div>
            <h1>EloGrapher</h1>
            <p>&gt; Track, Analyze & Improve</p>
        </div>
        {isBeta ? <p className="beta-badge">BETA</p> : null}
    </div>
}

export default Logo;