const ContactUs = () => {
  return (
    <div className="bg-base-200 py-16" id="contact">
      <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 p-6">
        {/* Contact Form */}
        <form className="card bg-base-100 shadow-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold mb-2">Send Us a Message</h3>

          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />

          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            required
          ></textarea>

          <button className="btn btn-error text-white w-full">Submit</button>
        </form>

        {/* Contact Info */}
        <div className="card bg-base-100 shadow-lg p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>

          <p className="text-lg mb-2">
            📞 <strong>Hotline:</strong> +880 1797 101 644
          </p>

          <p className="text-lg mb-2">
            ✉ <strong>Email:</strong> sohebakhter.badhan@gmail.com
          </p>

          <p className="mt-4 text-gray-600">
            If you have any questions, suggestions, or want to collaborate with
            us — feel free to reach out anytime. We respond as quickly as
            possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
