import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container border-t border-gray-light pt-13 pb-22.5">
        <div className="footer">
          <div className="footer">
            <span className="footer-title cursor-pointer">contact</span>
            <span className="footer-title cursor-pointer">
              terms of services
            </span>
            <span className="footer-title cursor-pointer">
              shipping and returns
            </span>
          </div>
        </div>
        <p className="text-black mt-12">
          © 2021 Shelly. <span className="text-gray-dark">Terms of use</span>{" "}
          <span className="text-gray-dark">and</span> privacy policy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
