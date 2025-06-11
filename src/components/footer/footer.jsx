import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-500 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Our store
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-amber-500 transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-amber-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Social Media</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://facebook.com"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="block">Kathmandu, Nepal</span>
              </li>
              <li>
                <span className="block">Phone: 0976444677</span>
              </li>
              <li>
                <a
                  href="mailto:sajilostyle@gmail.com"
                  className="hover:text-amber-500 transition-colors"
                >
                  Mail: sajilostyle@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">Copyright 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
