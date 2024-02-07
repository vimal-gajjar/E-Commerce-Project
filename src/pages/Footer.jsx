import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
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
                QuickPick: Your Fast, Reliable Shopping Destination. Discover
                Quality Products with Speed and Convenience !
              </p>
            </div>
            <div className="col-md-3 quick-link">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Products</a>
                </li>
                <li>
                  <a href="javascript:void(0)">About</a>
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
                  <FaWhatsapp />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaLinkedinIn />
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
