import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { Button, FormField, SectionHeader } from "@components/common";
import { EarthCanvas } from "@components/canvas";
import { SectionWrapper } from "@hoc";
import { slideIn } from "@utils/motion";
import { validateContactForm } from "@utils/validators";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    setStatus({ type: "", message: "" });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    const validation = validateContactForm(form);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before sending.",
      });
      return;
    }

    // Clear any previous errors
    setErrors({});
    setStatus({ type: "", message: "" });

    const emailConfig = {
      serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      siteName: import.meta.env.VITE_APP_SITE_NAME,
      contactEmail: import.meta.env.VITE_APP_CONTACT_EMAIL,
    };

    if (!Object.values(emailConfig).every(Boolean)) {
      setStatus({
        type: "error",
        message: "Contact form is not configured yet. Please email me directly.",
      });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: form.name,
          to_name: emailConfig.siteName,
          from_email: form.email,
          to_email: emailConfig.contactEmail,
          message: form.message,
        },
        emailConfig.publicKey
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: "success",
            message: "Thank you. I will get back to you as soon as possible.",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          setStatus({
            type: "error",
            message: "Something went wrong. Please try again.",
          });
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <SectionHeader subText='Get in touch' headText='Contact.' />

        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <FormField
            label='Your Name'
            name='name'
            type='text'
            value={form.name}
            onChange={handleChange}
            placeholder="What's your good name?"
            error={errors.name}
          />
          <FormField
            label='Your email'
            name='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            placeholder="What's your web address?"
            error={errors.email}
          />
          <FormField
            label='Your Message'
            name='message'
            type='textarea'
            value={form.message}
            onChange={handleChange}
            placeholder='What you want to say?'
            error={errors.message}
            rows={7}
          />

          <Button type='submit' loading={loading} loadingText='Sending...'>
            Send
          </Button>

          {status.message && (
            <p
              role='status'
              aria-live='polite'
              className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {status.message}
            </p>
          )}
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");

export default ContactSection;
