import Link from "next/link";
import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-5">
      <div className="container mx-auto px-4 text-center">
        {/* Contact Us Section */}
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="flex justify-center space-x-4">
          {/* Email Icon */}
          <a
            href="mailto:your-email@gmail.com"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
          >
            <FaEnvelope size={30} />
          </a>

          {/* Discord Icon */}
          <a
            href="https://discord.com/invite/yourdiscord"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord size={30} />
          </a>

          {/* GitHub Icon */}
          <Link
            href="https://github.com/TherkuTech/tturl"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
