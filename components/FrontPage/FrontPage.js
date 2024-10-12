import React from 'react';
import './FrontPage.css'; // Import your CSS file
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <>
      <section >
        <nav className="navbar">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars"></i>
          </label>
          <div className="left-nav">
            <label className="logo">Virtual Campus</label>
            <img src="./images/logo.jpeg" alt="logo" className="logo-img" />
          </div>
          <ul>
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/References" target="_blank" rel="noopener noreferrer">References</a></li>
            <li><a href="Services">Services</a></li>
            <li><a href="#contact">Contact</a></li>

            <li id="visible"><a href="/login" target="_blank" rel="noopener noreferrer">User</a></li>
            <li id="visible"><a href="/login" target="_blank" rel="noopener noreferrer">Admin</a></li>

            <li id="bx">
              <a href="#"><i className='bx bxs-user'></i> ⮟</a>
              <ul className="dropdown">
                <li><a href="/login" target="_blank" rel="noopener noreferrer">User</a></li>
                <li><a href="/login">Admin</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </section>

      <section>
        <div className="Section-top back">
          <div className="con">
            <h2 className="text-big">Tired of Error 404 Classroom NOT FOUND !!!</h2>
            <Link to="/Floor5" className="bt-link">
            <button className="bt">Xplore Campus</button>
          </Link>
          </div>
        </div>
      </section>

      <section>
        <div id="heading">
          <h2>Features</h2>
        </div>

        <div className="cards">
          <div className="c">
            <h3>Interactive Dashboard</h3>
            <p>Your personalized dashboard is designed to keep everything you need at your fingertips. Access courses,
              assignments, and notifications in just a few clicks. It’s built to help you stay organized and up-to-date with
              your academic life. We hope this feature enhances your productivity. Happy learning!
            </p>
          </div>

          <div className="c">
            <h3>All-in-One Platform</h3>
            <p>Everything you need for your academic journey is now in one place! From course materials and resources to exam
              schedules and communication with faculty, the platform is designed to bring all essential tools under one
              roof. No more jumping between different sites or apps!
            </p>
          </div>

          <div className="c">
            <h3>Easy Navigation</h3>
            <p>Getting around the Virtual Campus is a breeze! With clear menus, fast-loading pages, and an intuitive layout,
              everything you need is just a click away. Whether you’re searching for a course, checking your grades, or
              exploring campus events, we’ve made it simple and accessible.
            </p>
          </div>

          <div className="c">
            <h3>Student Forums</h3>
            <p>Connect with your peers and engage in meaningful discussions through our dedicated student forums. Whether
              it’s course-related queries or group projects, collaboration is now easier than ever!
              We’re excited to see the conversations grow.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2 className="conh2">Contact Us</h2>
        <div className="form">
          <input type="text" className="form-input" name="phone" placeholder="Enter Your Phone number" />
          <input type="text" className="form-input" name="name" placeholder="Enter Your Name" />
          <input type="text" className="form-input" name="email" placeholder="Enter Your Email" />
          <textarea className="form-input" name="concern" cols="30" rows="10" placeholder="Please Elaborate your Concern"></textarea>
          <button className="sub-btn">Submit Response</button>
        </div>
      </section>

      <section className="footer">
        <div className="content">
          {/* Main content of the page goes here */}
        </div>

        <footer>
          <div className="footer-logo">
            <img src="./images/pccoe logo.png" alt="PCCOE Logo" className="pccoe" />
            <img src="./images/logo.jpeg" alt="Virtual Campus Logo" className="virtu" />
          </div>

          <div className="footer-content" id="foot">
            <div className="footer-section">
              <h3>Get in Touch</h3>
              <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>

            <div className="footer-section">
              <h3>Creator's LinkedIn Profiles</h3>
              <a href="https://www.linkedin.com/in/eshal-shaikh-528680291/" target="_blank" rel="noopener noreferrer">Eshal Shaikh</a>
              <a href="https://www.linkedin.com/in/HarshalP05/" target="_blank" rel="noopener noreferrer">Harshal Patil</a>
              <a href="https://www.linkedin.com/in/akshay-dhere-46b277310/" target="_blank" rel="noopener noreferrer">Akshay Dhere</a>
              <a href="https://www.linkedin.com/in/riya-deshmukh-333r/" target="_blank" rel="noopener noreferrer">Riya Deshmukh</a>         
              <a href="https://www.linkedin.com/in/omdalvi19/" target="_blank" rel="noopener noreferrer">Om Dalvi</a>
              <a href="https://www.linkedin.com/in/pranita-daphal-18a4a9292/" target="_blank" rel="noopener noreferrer">Pranita Daphal</a>
              <a href="https://www.linkedin.com/in/rajshree-gawai-096419305/" target="_blank" rel="noopener noreferrer">Rajshree Gawai</a>
            </div>

            <div className="footer-contact">
              <h3>Get In Touch With Us</h3>
              <a href="https://www.pccoepune.com/" target="_blank" rel="noopener noreferrer">https://www.pccoepune.com/</a>
              <p>E-mail :-virtuonavipccoe@gmail.com</p>
              <p>Phone: 020 2765 3168</p>
              <p>ADDRESS: MQ37+M3C, near Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri, Maharashtra 411044</p>
            </div>
          </div>
        </footer>
      </section>
      <script></script>
    </>
  );
};

export default Home;
