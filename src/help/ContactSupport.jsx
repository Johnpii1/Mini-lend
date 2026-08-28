
import {
  FiArrowLeft,
  FiMessageCircle,
  FiSend,
  FiMail,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ContactSupport() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this to your backend/support system later.
    console.log("Support request:", form);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* HEADER */}
      <header className="border-b border-white/[0.07] bg-[#0d0d0d]">
        <div className="px-5 py-5 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => navigate("/help")}
            className="
              flex items-center gap-2
              text-sm text-white/50
              hover:text-[#6DD054]
              transition
            "
          >
            <FiArrowLeft size={16} />
            Back to Help Center
          </button>

          <div className="mt-6">

            <p className="text-xs text-[#6DD054] font-medium uppercase tracking-wider">
              Support
            </p>

            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
              Contact Support
            </h1>

            <p className="mt-2 text-sm text-white/40 max-w-xl">
              Tell us what you need help with and the MiniLend team
              will assist you.
            </p>

          </div>

        </div>
      </header>

      {/* CONTENT */}
      <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        <div className="max-w-3xl">

          {/* SUPPORT INFO */}
          <div
            className="
              rounded-2xl
              border
              border-[#6DD054]/15
              bg-[#6DD054]/[0.04]
              p-5
              mb-5
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                  w-11 h-11
                  shrink-0
                  rounded-xl
                  bg-[#6DD054]/10
                  border border-[#6DD054]/15
                  flex items-center justify-center
                  text-[#6DD054]
                "
              >
                <FiMessageCircle size={19} />
              </div>

              <div>

                <h2 className="text-sm font-semibold">
                  How can we help?
                </h2>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Describe your issue clearly. Include relevant
                  transaction or wallet information when necessary.
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              p-5 sm:p-6
            "
          >

            {/* SUBJECT */}
            <div>

              <label
                htmlFor="subject"
                className="block text-xs font-medium text-white/60 mb-2"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="What do you need help with?"
                required
                className="
                  w-full
                  h-11
                  px-4
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  text-white
                  placeholder:text-white/25
                  outline-none
                  focus:border-[#6DD054]/40
                  focus:bg-white/[0.05]
                  transition
                "
              />

            </div>

            {/* MESSAGE */}
            <div className="mt-5">

              <label
                htmlFor="message"
                className="block text-xs font-medium text-white/60 mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your issue..."
                rows={7}
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  text-white
                  placeholder:text-white/25
                  outline-none
                  resize-none
                  focus:border-[#6DD054]/40
                  focus:bg-white/[0.05]
                  transition
                "
              />

            </div>

            {/* SEND BUTTON */}
            <button
              type="submit"
              className="
                mt-5
                w-full
                sm:w-auto
                px-5
                h-11
                rounded-xl
                bg-[#6DD054]
                text-black
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-[#7be663]
                transition
              "
            >
              <FiSend size={16} />
              Send Message
            </button>

          </form>

          {/* EMAIL SUPPORT */}
          <div
            className="
              mt-5
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              p-5
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-10 h-10
                shrink-0
                rounded-xl
                bg-white/[0.04]
                border border-white/[0.07]
                flex items-center justify-center
                text-white/50
              "
            >
              <FiMail size={17} />
            </div>

            <div>

              <p className="text-xs text-white/30">
                Support Email
              </p>

              <p className="mt-1 text-sm font-medium">
                support@minilend.eth
              </p>

            </div>
          </div>

        </div>

 
      </main>

    </div>
  );
}

