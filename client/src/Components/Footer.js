import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="mainFooter">
      <a href="/" >Covid Service</a>
      <div className="footerRight">
        <a href="/contact">Contact Us</a>
        <a href="/register">Register As Donor</a>
        <a href="/register">Register As Patient</a>
        <a href="/faqs">Faqs</a>
      </div>
    </div>
  );
}

export default Footer;
