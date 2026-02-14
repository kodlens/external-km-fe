import { Link } from "react-router"

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Branding */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DOST-STII. All rights reserved.
          </p>
        </div>

        {/* Right - Links */}
        <div className="flex gap-6 text-sm">
          <a href="#privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition">
            Terms of Service
          </a>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

