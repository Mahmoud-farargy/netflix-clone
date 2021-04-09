import React  from "react";
import "./Footer.scss";
import footerLinks from "../../Fixtures/footerLinks.json";
import {Link} from "react-router-dom";
import LangSelector from "../../Components/LangSelector/LangSelector";
import PropTypes from "prop-types";

const Footer  = (props) => {
    return (
        <footer id="mainFooter" className="card--padding">
             <div className="page--boundaries">
                <div className="footer--inner inner--container">
                    <p className="footer__top">Questions? Contact us.</p>
                <ul className="footer--links--ul">
                        {
                            props.trimLinks ?
                            footerLinks && footerLinks.length > 0 && footerLinks.slice(0,6).map(link => (
                                <li key={link.id} className="footer--links--item">
                                    <Link className="footer--links--anchor" to={link.url}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))
                            :
                            footerLinks && footerLinks.length > 0 && footerLinks.map(link => (
                                <li key={link.id} className="footer--links--item">
                                    <Link className="footer--links--anchor" to={link.url}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))
                        }
                </ul>
                <div className="mt-4">
                        <LangSelector />
                </div>
                <div className="mt-4">
                        <span className="netflix__area">Netflix Egypt</span> 
                </div>

                </div>
            </div>
        </footer>
    )
}
Footer.propTypes = {
    trimLinks: PropTypes.bool
}

export default Footer;