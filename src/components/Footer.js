import React from 'react';
import '../styles/footer.css';
import Logo from '../assets/images/full-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <footer className="footer">
    <div className='footer-upper'>
        <div className="footer-left">
            <div className="footer-img">
                <img src= {Logo} alt="Swinburne logo"/>
            </div>
            <div className="footer-location">
                <p><b>Location</b>: Lot 2A September 2th Street, Hai Chau District, Da Nang city</p>
            </div>
        </div>
        
        <div className="footer-links">
            <div className="footer-link">
                <p><b>About</b></p>
                <ul>
                    <li><a href="">Our company</a></li>
                    <li><a href="">Our Policies</a></li>
                </ul>
            </div>
            <div className="footer-link">
                <p><b>Contact us</b></p>
                <div className="footer-social">
                    <a href="">
                        <FontAwesomeIcon className='icon'icon={faFacebook} />
                    </a>
                    <a href="">
                        <FontAwesomeIcon className='icon'icon={faTwitter} />
                    </a>
                    <a href="">
                        <FontAwesomeIcon className='icon'icon={faInstagram} />
                    </a>
                </div>
            </div>
            <div className="footer-link">
                <p><b>Feedback</b></p>
                <ul>
                    <li><a href="">Share opinion</a></li>
                </ul>
            </div>
            <div className="footer-link">
                <p><b>Privacy</b></p>
                <ul>
                    <li><a href="">For buyer</a></li>
                    <li><a href="">For seller</a></li>
                </ul>
            </div>
        </div>
    </div>
    <hr/>
    <div className="footer-copyright">
        &copy; Swinburne 2024 | Copyright and disclaimer
    </div>
    </footer>
    );
    
    export default Footer;