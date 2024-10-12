import React, { useEffect } from 'react';
import './Floor5.css';

const classrooms = [
  {
    id: 6,
    name: '6506LA',
    roomtitle:"Faculties available in the lab are:-",
    description: 'This is The Basic Electrical And Electronics Lab (BEE)',
    faculties: [
      { name: 'Mrs. Ashwini Deshpande', link: 'https://example.com/faculty/ashwini-deshpande', },
      { name: 'Mrs. Pranjal Jog', link: 'https://example.com/faculty/pranjal-jog' },
      { name: 'Mrs. Suwarna Shete', link: 'https://example.com/faculty/suwarna-shete' }
    ]
  },
  {
    id: 7,
    name: '6507LA',
    description: 'This is Classroom 6507',
    faculties: [
      { name: 'Mr. John Doe', link: 'https://example.com/faculty/john-doe' },
      { name: 'Ms. Jane Smith', link: 'https://example.com/faculty/jane-smith' }
    ]
  },
  {
    id: 16,
    name: '6516HO',
    description: 'Applied Science And Humanities',
    roomtitle:"HOD CABIN",
    faculties: [
      { name: 'Dr. Leena Sharma', link: 'http://www.sites.google.com/view/drleenasharma',img:'https://fe.pccoepune.com/People/images/faculty/sharma.png' }
    ]
  }
  // Add more classrooms here...
];

const Floor5 = () => {
  useEffect(() => {
    const svgObject = document.getElementById('svgObject');

    const handleSvgLoad = () => {
      const svgDocument = svgObject.contentDocument;

      classrooms.forEach(({ id }) => {
        const referElement = svgDocument.getElementById(`refer${id}`);
        const popup = document.getElementById(`popup${id}`);
        const popupClose = popup.querySelector('.popupClose');

        if (referElement && popup) {
          referElement.addEventListener('click', () => {
            const svgRect = referElement.getBoundingClientRect();
            popup.style.left = `${svgRect.left}px`;
            popup.style.top = `${svgRect.bottom + window.scrollY}px`;
            popup.style.display = 'block';
          });

          // Close popup when close button is clicked
          popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
          });
        }
      });
    };
        
    // Handle click outside of popup to close it
    const handleClickOutside = (event) => {
      classrooms.forEach(({ id }) => {
        const popup = document.getElementById(`popup${id}`);
        if (popup && !popup.contains(event.target) && event.target.id !== `refer${id}`) {
          popup.style.display = 'none';
        }
      });
    };

    if (svgObject) {
      svgObject.addEventListener('load', handleSvgLoad);
    }

    document.addEventListener('click', handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      if (svgObject) {
        svgObject.removeEventListener('load', handleSvgLoad);
      }
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="body">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      {/* Bootstrap CSS */}
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="floorplan">
        <div className="fptitles">
          <h1 className="h1">Welcome To Virtual Campus</h1>
          <h2 className="h2">Here's the 5th Floor of our Building</h2>
        </div>
        <object
          id="svgObject"
          type="image/svg+xml"
          data="/images/Bldg6Floor5.svg"
          aria-label="Building 6 Floor 5 SVG"
        >
          <p>Your browser does not support SVGs. Consider updating your browser for a better experience.</p>
        </object>
      </div>

      {/* Render popups dynamically */}
      {classrooms.map(({ id, name,roomtitle ,description, faculties }) => (
        <div key={id} id={`popup${id}`} className="popup p-3 border rounded shadow" style={{ display: 'none', position: 'absolute', backgroundColor: 'white' }}>
          <div className="popup-header">
            <h5 className="popup-title">{name}</h5>
            <span className="popupClose close">×</span>
          </div>
          <div className='poptitle'>
          <p>{description}</p>
          <p>{roomtitle}</p> </div>
          <ol>
            {faculties.map((faculty, index) => (
              <li key={index}>
                <img alt="facultyimage" className='fimage' src={faculty.img}/>
                {faculty.name}{' '}
                <a
                  href={faculty.link}
                  className="view-details-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Floor5;
