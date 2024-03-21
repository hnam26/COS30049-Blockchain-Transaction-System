import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/footer.css';
import Logo from '../../assets/images/full-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Footer component
const Footer = () => (
    <footer className="footer">
        {/* Upper section of the footer */}
        <div className='footer-upper'>
            {/* Left section with logo and location */}
            <div className="footer-left">
                <div className="footer-img">
                    <img src={Logo} alt="Swinburne logo" />
                </div>
                <div className="footer-location">
                    <p><b>Location</b>: Lot 2A September 2th Street, Hai Chau District, Da Nang city</p>
                </div>
            </div>

            {/* Links section with various categories */}
            <div className="footer-links">
                <div className="footer-link">
                    <p><b>About</b></p>
                    <ul>
                        <li><Link>Our company</Link></li>
                        <li><Link>Our Policies</Link></li>
                    </ul>
                </div>
                <div className="footer-link">
                    <p><b>Contact us</b></p>
                    <div className="footer-social">
                        <Link>
                            <FontAwesomeIcon className='icon' icon={faFacebook} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon className='icon' icon={faTwitter} />
                        </Link>
                        <Link>
                            <FontAwesomeIcon className='icon' icon={faInstagram} />
                        </Link>
                    </div>
                </div>
                <div className="footer-link">
                    <p><b>Feedback</b></p>
                    <ul>
                        <li><Link>Share opinion</Link></li>
                    </ul>
                </div>
                <div className="footer-link">
                    <p><b>Privacy</b></p>
                    <ul>
                        <li><Link href="">For buyer</Link></li>
                        <li><Link href="">For seller</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <hr />

        {/* Copyright section */}
        <div className="footer-copyright">
            &copy; Swinburne 2024 | Copyright and disclaimer
        </div>
    </footer>
);

// Export Footer component
export default Footer;
