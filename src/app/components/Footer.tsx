'use client';
import Link from "next/link";
const Footer = () => (
  <footer className="w-full bg-black text-white px-4 md:px-8 lg:px-20 pt-10 pb-4">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b border-gray-700 pb-8">
      {/* Logo */}
      <div className="flex flex-col items-start mb-6 md:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-extrabold text-2xl tracking-tight text-lime-400">FEST</span>
          <span className="text-lg md:text-lg text-white">✦</span>
          <span className="font-extrabold text-2xl tracking-tight text-pink-500">BUZZ</span>
        </div>
      </div>
      {/* Footer Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
        {/* Contact */}
        <div>
          <h4 className="font-bold mb-2 text-white">Contact</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>hello@festbuzz.in</li>
            <li>thefestbuzz@gmail.com</li>
            <li>+91 72495 68988</li>
            <li className="flex gap-2 mt-2">
              <a href="#" className="hover:text-lime-300" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
              </a>
              <a href="#" className="hover:text-pink-300" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.094 12 2.094m0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.4 3.661 1.374c-.974.974-1.246 2.111-1.308 3.392C2.012 5.668 2 6.077 2 9.333v5.334c0 3.256.012 3.665.07 4.945.062 1.281.334 2.418 1.308 3.392.974.974 2.111 1.246 3.392 1.308 1.28.058 1.689.07 4.945.07s3.665-.012 4.945-.07c1.281-.062 2.418-.334 3.392-1.308.974-.974 1.246-2.111 1.308-3.392.058-1.28.07-1.689.07-4.945V9.333c0-3.256-.012-3.665-.07-4.945-.062-1.281-.334-2.418-1.308-3.392-.974-.974-2.111-1.246-3.392-1.308C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
              </a>
              <a href="#" className="hover:text-blue-300" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
              </a>
            </li>
          </ul>
        </div>
        {/* Services */}
        <div>
          <h4 className="font-bold mb-2 text-white">Services</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>Artists</li>
            <li>Production</li>
            <li>Silent DJ</li>
            <li>Laser Tag</li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h4 className="font-bold mb-2 text-white">Resources</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>Blog</li>
            <li>Learn</li>
            <li>Magazine</li>
            <li>Templates</li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h4 className="font-bold mb-2 text-white">Company</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <div><Link href={'/about'}>About us</Link></div>
            <div> <Link href={'/contact'}>Contact us</Link></div>
            <div><Link href={'/contact'}>Privacy Policy</Link></div>
            <div><Link href={'/contact'}>Terms & Conditions</Link></div>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400 mt-6">
      Maxhilaration Ventures (09MCLPS8373K1ZB)<br />
      All rights reserved
    </div>
  </footer>
);

export default Footer; 
