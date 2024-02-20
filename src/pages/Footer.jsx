import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const Footer = () => {
  let ontop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row footer-info">
            <div className="col-md-3 about">
              <h5>About Us</h5>
              <p>
                <strong>QuickPick:</strong> Your Fast, Reliable Shopping
                Destination. Discover Quality Products with Speed and
                Convenience !
              </p>
            </div>
            <div className="col-md-3 quick-link">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                    About
                  </Link>
                </li>
                <li>
                  <a href="javascript:void(0)">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 contact">
              <h5>Contact Us</h5>
              <p>
                Email:{" "}
                <a href="mailto:info@quickpick.com"> info@quickpick.com</a>
              </p>

              <p>
                Phone: <a href="tel:123-456-7890">123-456-7890</a>
              </p>
            </div>
            <div className="col-md-3">
              <h5>Follow Us</h5>
              <ul className="social-media">
                <li>
                  <a
                    className="wp"
                    href="https://www.whatsapp.com/"
                    target="_blank"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
                <li>
                  <a
                    className="insta"
                    href="https://www.whatsapp.com/"
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    href="https://www.whatsapp.com/"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a
                    className="twit"
                    href="https://www.whatsapp.com/"
                    target="_blank"
                  >
                    <FaTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row copyright-info">
            <div className="col-md-12 mt-4">
              <p className="text-center">
                © 2024{" "}
                <a
                  href="javascript:void(0)"
                  onClick={ontop}
                  className="copyright"
                >
                  QuickPick.{" "}
                </a>
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
