import './hero.css';
// import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import hero from '../../assets/hero.svg';

function Hero()
{
    return (
        <div className="hero">
            <h2 className="heroTitle">Download Video and Audio from Youtube</h2>
            <div className="search">
                <input type="text" className="searchInput" placeholder="Paste your link here..."/>
                <button type='submit' className="submitButton">Start</button>
            </div>
            <span className="heroImg">
                <img src={hero} alt="Vidpanda" className="panda" />
            </span>
        </div>
    );
}

export default Hero;