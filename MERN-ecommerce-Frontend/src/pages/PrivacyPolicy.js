import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";

function PrivacyPolicy() {
  return (
    <>
      <div style={{ minHeight: "100vh", background: "white" }}>
        <NavBar />
        <main className="grid min-h-full bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="px-28">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-12 text-base leading-7 text-gray-600">
              Last updated: [Date]
            </p>
            <p className="mt-12 text-base leading-7 text-gray-600">
              Welcome to [Your E-commerce Website] ("we," "our," or "us"). We
              are committed to protecting the privacy and security of your
              personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website or make a purchase from us.
            </p>
            <h1 className="mt-6 text-lg font-bold tracking-tight text-gray-900 sm:text-4xl">
              Information We Collect
            </h1>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Personal Information <br />
              When you use our website, we may collect certain personally
              identifiable information ("Personal Information"). This may
              include: <br />
              Name <br />
              Email address <br />
              Phone number <br />
              Shipping and billing addresses
              <br />
              Payment information
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default PrivacyPolicy;
