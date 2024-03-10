import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";

function AboutUs() {
  return (
    <>
      <div style={{ minHeight: "100vh", background: "white" }}>
        <NavBar />
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center px-28">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to [Your Brand Name]!
            </h1>
            <p className="mt-12 text-base leading-7 text-gray-600">
              At [Your Brand Name], we believe in more than just providing
              products; we're here to offer you an experience. Our story is one
              of passion, quality, and a commitment to making your shopping
              journey extraordinary. Our Mission At the core of [Your Brand
              Name] is a mission to [briefly describe your mission – whether
              it's providing top-notch products, promoting sustainability,
              supporting local artisans, etc.]. We strive to [highlight key
              objectives, such as delivering exceptional customer service,
              offering a diverse range of products, etc.]. The [Your Brand Name]
              Difference What sets us apart? It's the [unique aspect of your
              brand – this could be exceptional customer service, exclusive
              products, ethical sourcing, etc.]. We take pride in [mention
              specific features that distinguish your brand]. Our Story [Share a
              brief history of your brand, including how it started, challenges
              you've overcome, and milestones you've achieved. Personal
              anecdotes or moments of inspiration can add a human touch.] Our
              Commitment to Quality Every product at [Your Brand Name] undergoes
              [describe quality control processes or standards]. We source our
              materials [mention ethical and sustainable practices if
              applicable]. Your satisfaction is our priority, and we stand by
              the quality of every item we offer. Connect with Us We love
              hearing from you! Whether you have questions, feedback, or just
              want to say hello, feel free to [provide contact information or
              link to your customer support page]. Follow us on [social media
              links] to stay updated on the latest [Your Brand Name] news and
              promotions. Thank you for being a part of the [Your Brand Name]
              family. Happy shopping!
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default AboutUs;
