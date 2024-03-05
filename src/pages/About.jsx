import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="mt-5 mb-5">
          <h1 className="newH1">About Us</h1>
          <hr />
          <p>Welcome to our e-commerce website!</p>
          <p>
            At QuickPick, we're passionate about providing our customers with a
            seamless shopping experience from start to finish. Whether you're
            browsing for the latest fashion trends, high-tech gadgets, or home
            essentials, we have a wide selection of products to meet your needs.
          </p>
          <p>
            Our mission is to offer top-quality products at competitive prices,
            backed by exceptional customer service. We believe in building
            long-lasting relationships with our customers by ensuring
            satisfaction with every purchase.
          </p>
          <p>
            With a user-friendly interface and secure payment options, shopping
            with us is convenient and worry-free. Our dedicated team is
            committed to delivering your orders promptly and addressing any
            inquiries or concerns promptly.
          </p>
          <p>
            Thank you for choosing <strong>QuickPick.</strong> We appreciate
            your support and look forward to serving you!
          </p>
          <p>
            For any questions, feedback, or assistance, please don't hesitate to
            contact us at info@quickpick.com.
          </p>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
