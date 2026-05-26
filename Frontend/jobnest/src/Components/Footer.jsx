import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>
      <div className='footer-section'>
        <h2>JobNest</h2>
        <p> Find your dream job and connect with top recruiters easily.</p>
      </div>
      <div className='footer-section'>
        <h3>Quick Links</h3>
        <a href="/">Home</a>
      </div>
      <div className='footer-section'>
        <h3>Contacts</h3>
        <p>Email:jeffinjoshy01@gmail.com</p>
        <p>Phone:+91-2343243</p>
        <p>Kerala, India</p>
      </div>
      <div className='footer-bottom'>
        <p>© 2026 Jobnest. All rights reserved</p>
      </div>
    </div>
    </footer>
    
  )
}

export default Footer
