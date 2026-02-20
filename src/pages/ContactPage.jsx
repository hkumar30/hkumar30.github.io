import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';
import { RoughLine } from '../components/RoughBox';
import './ContactPage.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h2>Say Hi 👋</h2>
      <p className="contact-intro">
        Have a question, an idea, or just want to chat? Drop me a message and
        I&apos;ll get back to you.
      </p>

      <ContactForm />

      <RoughLine seed={50} />

      <div className="contact-alt">
        <p className="contact-alt-text font-caveat text-pencil">
          Or find me here —
        </p>
        <SocialLinks />
      </div>
    </div>
  );
}
