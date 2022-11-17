import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container border-t border-gray-light pt-13 pb-22.5">
        <div className="flex items-center gap-10 uppercase text-gray-dark font-medium">
          <span>contact</span>
          <span>terms of services</span>
          <span>shipping and returns</span>
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
