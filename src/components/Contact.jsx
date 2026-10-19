import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { contactInfo } from "../constants";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm((current) => ({ ...current, [name]: value }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          _replyto: form.email.trim(),
          _subject: `New VoidDev contact message from ${form.name.trim()}`,
          message: form.message.trim(),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The contact service could not accept your message.");
      }

      setStatus({
        type: "success",
        message: `Thank you, ${form.name.trim()}! Your message has been sent to Team VoidDev. We’ll be in touch as soon as possible.`,
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form delivery failed:", error);
      setStatus({
        type: "error",
        message: `Sorry, we couldn’t send your message right now. Please try again in a moment or email us at ${contactInfo.email}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='xl:mt-12 flex flex-col-reverse xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:items-start gap-8 xl:gap-12 overflow-hidden'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='w-full min-w-0 bg-black-100 p-6 sm:p-8 rounded-2xl'
      >
        <SectionHeading kicker='Get in touch' title='Contact.' />

        {status && (
          <motion.p
            id='contact-form-status'
            role={status.type === "error" ? "alert" : "status"}
            aria-live={status.type === "error" ? "assertive" : "polite"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-xl border p-4 text-sm leading-6 ${
              status.type === "success"
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : status.type === "info"
                  ? "border-accent/40 bg-accent/10 text-accent-soft"
                  : "border-rose-400/30 bg-rose-400/10 text-rose-200"
            }`}
          >
            {status.message}
          </motion.p>
        )}

        <div className='mt-6 flex flex-col gap-2'>
          <a
            href={`mailto:${contactInfo.email}`}
            className='inline-flex items-center min-h-[40px] text-white text-[15px] sm:text-[16px] font-medium break-all hover:text-accent-bright transition-colors'
          >
            {contactInfo.email}
          </a>
          {contactInfo.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className='inline-flex items-center min-h-[40px] text-secondary text-[14px] sm:text-[15px] hover:text-white transition-colors'
            >
              {phone}
            </a>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          aria-busy={loading}
          className='mt-10 flex flex-col gap-6 sm:gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              autoComplete='name'
              required
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='w-full min-w-0 bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px] sm:text-base transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-accent/70'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              autoComplete='email'
              required
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='w-full min-w-0 bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px] sm:text-base transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-accent/70'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              required
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='w-full min-w-0 bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px] sm:text-base transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-accent/70'
            />
          </label>

          <motion.button
            type='submit'
            disabled={loading}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>

          <div className='flex flex-wrap gap-3 mt-2'>
            <a
              href={contactInfo.github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary text-[14px] font-semibold border-2 border-accent text-accent-bright rounded-xl px-4 py-2 hover:bg-accent hover:text-white transition-all duration-300'
            >
              GitHub
            </a>
            <a
              href={contactInfo.instagram}
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary text-[14px] font-semibold border-2 border-accent text-accent-bright rounded-xl px-4 py-2 hover:bg-accent hover:text-white transition-all duration-300'
            >
              Instagram
            </a>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='relative isolate w-full min-w-0 h-[min(85vw,360px)] sm:h-[430px] xl:h-[min(72vh,620px)] xl:sticky xl:top-24 xl:self-start'
      >
        <div className='pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.24),rgba(124,58,237,0.12)_45%,transparent_72%)] blur-3xl' />
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
