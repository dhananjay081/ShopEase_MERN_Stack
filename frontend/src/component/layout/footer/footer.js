import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-slate-800 text-center text-white'>
      <div className='p-4 pb-0'>
        <section className='mb-4 flex justify-center'>
          <a href='https://www.facebook.com/dhananjaykushwaha.kushwaha.73' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaFacebookF />
          </a>
          <a href='https://twitter.com' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaTwitter />
          </a>
          <a href='https://www.google.co.in' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaGoogle />
          </a>
          <a href='https://instagram.com/dhananjay081' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaInstagram />
          </a>
          <a href='https://www.linkedin.com/in/dhananjay-kushwaha-2b7078296/' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaLinkedinIn />
          </a>
          <a href='https://github.com/dhananjay081' className='m-1 text-white p-3 border border-white rounded-full'>
            <FaGithub />
          </a>
        </section>
      </div>

      <div className='text-center p-3 bg-black bg-opacity-20'>
        © 2024 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          Dhananjay Kushwaha
        </a>
      </div>
    </footer>
  );
}

export default Footer;
