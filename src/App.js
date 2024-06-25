import React, { useState, useEffect, useContext } from 'react';

// Utility function for responsive design
const useResponsiveDesign = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

// Shared styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  button: {
    padding: '10px 15px',
    margin: '0 5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    margin: '20px auto',
  },
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <button onClick={onClose} style={{ float: 'right' }}>X</button>
        {children}
      </div>
    </div>
  );
};

// Authentication Context
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const register = (userData) => {
    setUsers([...users, userData]);
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, users }}>
      {children}
    </AuthContext.Provider>
  );
};

const Header = ({ onLoginClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1>Job Platform</h1>
        <nav>
          <button style={styles.button}>Home</button>
          <button style={styles.button}>Jobs</button>
          {user && user.role === 'job_seeker' && (
            <button style={styles.button}>CV Tools</button>
          )}
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} style={styles.button}>Logout</button>
            </>
          ) : (
            <button onClick={onLoginClick} style={styles.button}>Login</button>
          )}
        </nav>
      </div>
    </header>
  );
};
// Updated Footer Component
const Footer = () => {
  const footerStyles = {
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '40px 0',
      marginTop: 'auto',
    },
    container: {
      ...styles.container,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
      minWidth: '200px',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      marginBottom: '8px',
      fontSize: '0.9rem',
    },
    socialIcon: {
      fontSize: '1.5rem',
      marginRight: '15px',
      color: '#007bff',
    },
    copyright: {
      fontSize: '0.9rem',
      color: '#666',
      marginTop: '20px',
      textAlign: 'center',
      width: '100%',
    },
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.section}>
          <h3 style={footerStyles.sectionTitle}>For Job Seekers</h3>
          <a href="#" style={footerStyles.link}>Browse Jobs</a>
          <a href="#" style={footerStyles.link}>Career Advice</a>
          <a href="#" style={footerStyles.link}>Upload Resume</a>
          <a href="#" style={footerStyles.link}>Job Alerts</a>
        </div>
        <div style={footerStyles.section}>
          <h3 style={footerStyles.sectionTitle}>For Employers</h3>
          <a href="#" style={footerStyles.link}>Post a Job</a>
          <a href="#" style={footerStyles.link}>Browse Candidates</a>
          <a href="#" style={footerStyles.link}>Recruiting Solutions</a>
          <a href="#" style={footerStyles.link}>Pricing</a>
        </div>
        <div style={footerStyles.section}>
          <h3 style={footerStyles.sectionTitle}>About Us</h3>
          <a href="#" style={footerStyles.link}>Our Story</a>
          <a href="#" style={footerStyles.link}>Press</a>
          <a href="#" style={footerStyles.link}>Careers</a>
          <a href="#" style={footerStyles.link}>Contact Us</a>
        </div>
        <div style={footerStyles.section}>
          <h3 style={footerStyles.sectionTitle}>Connect With Us</h3>
          <div>
            <a href="#" style={footerStyles.socialIcon}>📘</a>
            <a href="#" style={footerStyles.socialIcon}>🐦</a>
            <a href="#" style={footerStyles.socialIcon}>📸</a>
            <a href="#" style={footerStyles.socialIcon}>🔗</a>
          </div>
        </div>
        <div style={footerStyles.copyright}>
          © 2024 JobPlatform. All rights reserved. | <a href="#" style={footerStyles.link}>Privacy Policy</a> | <a href="#" style={footerStyles.link}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// Registration Component
const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option value="job_seeker">Job Seeker</option>
        <option value="employer">Employer</option></select>
      <button type="submit" style={styles.button}>Register</button>
    </form>
  );
};

// Login Component
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      onLoginSuccess();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
  );
};

// Home Component
const Home = () => {
  const { isMobile } = useResponsiveDesign();

  const homeStyles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    leftSection: {
      flex: 1,
      textAlign: isMobile ? 'center' : 'left',
      marginBottom: isMobile ? '20px' : 0,
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: '#333',
    },
    subheading: {
      fontSize: '1.2rem',
      marginBottom: '30px',
      color: '#666',
    },
    button: {
      ...styles.button,
      fontSize: '1.1rem',
      padding: '12px 24px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
  };

  return (
    <div style={homeStyles.container}>
      <div style={homeStyles.leftSection}>
        <h1 style={homeStyles.heading}>Find Your Dream Job Today</h1>
        <p style={homeStyles.subheading}>
          Connect with top employers and discover exciting career opportunities.
        </p>
        <button style={homeStyles.button}>Get Started</button>
      </div>
      <div style={homeStyles.rightSection}>
        <img 
          src="https://images.pexels.com/photos/372787/pexels-photo-372787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Job Search Illustration" 
          style={homeStyles.image}
        />
      </div>
    </div>
  );
};

// EmployerDashboard Component
const EmployerDashboard = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [postedJobs, setPostedJobs] = useState([]);
  const { isMobile } = useResponsiveDesign();

  const handlePostJob = () => {
    if (jobTitle.trim() === '' || jobDescription.trim() === '') {
      alert('Please fill in both job title and description.');
      return;
    }

    const newJob = {
      id: Date.now(), // Using timestamp as a simple unique id
      title: jobTitle,
      description: jobDescription,
      datePosted: new Date().toLocaleDateString()
    };

    setPostedJobs(prevJobs => [newJob, ...prevJobs]);
    setJobTitle('');
    setJobDescription('');

    // In a real app, you would also send this data to a server
    console.log('Job Posted:', newJob);
  };

  const dashboardStyles = {
    ...styles.container,
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'flex-start',
  };

  const sectionStyles = {
    width: isMobile ? '100%' : '48%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const jobListStyles = {
    listStyle: 'none',
    padding: 0,
  };

  const jobItemStyles = {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={dashboardStyles}>
      <div style={sectionStyles}>
        <h2>Post a New Job</h2>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{...styles.input, height: '100px'}}
        />
        <button onClick={handlePostJob} style={styles.button}>Post Job</button>
      </div>
      <div style={sectionStyles}>
        <h2>Your Posted Jobs</h2>
        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul style={jobListStyles}>
            {postedJobs.map(job => (
              <li key={job.id} style={jobItemStyles}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <small>Posted on: {job.datePosted}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
const CVBuilder = () => {
  const [cvData, setCvData] = useState({
    name: 'Cv Belo',
    email: 'cv@myjobmag.com',
    phone: '07066839654',
    age: '1946-06-05 (74 years)',
    stateOfOrigin: 'Bayelsa',
    stateOfResidence: 'Lagos',
    lgaOfResidence: 'Eti Osa',
    education: [
      {
        institution: 'Nnamdi Azikiwe University',
        degree: 'Bachelor of Science - B.Sc, Computer Engineering',
        year: '2002 - 2017'
      }
    ],
    workExperience: [
      {
        position: 'Product Developer',
        company: 'MyJobMag Limited',
        startDate: 'January 2015'
      }
    ]
  });

  const [completionPercentage, setCompletionPercentage] = useState(100);

  const cvBuilderStyles = {
    container: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    progressBar: {
      width: '70%',
      height: '10px',
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
    },
    progress: {
      width: `${completionPercentage}%`,
      height: '100%',
      backgroundColor: '#ffa500',
      borderRadius: '5px',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      ...styles.button,
      fontSize: '0.9rem',
      padding: '8px 15px',
    },
    cvContent: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      borderLeft: '3px solid #ffa500',
      paddingLeft: '10px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={cvBuilderStyles.container}>
      <div style={cvBuilderStyles.header}>
        <div style={cvBuilderStyles.progressBar}>
          <div style={cvBuilderStyles.progress}></div>
        </div>
        <span>{completionPercentage}% Completed</span>
        <div style={cvBuilderStyles.buttons}>
          <button style={cvBuilderStyles.button}>Preview CV</button>
          <button style={{...cvBuilderStyles.button, backgroundColor: '#ffa500'}}>Download CV</button>
        </div>
      </div>
      <div style={cvBuilderStyles.cvContent}>
        <h2>{cvData.name}</h2>
        <p>Email: {cvData.email} | Phone: {cvData.phone} | Age: {cvData.age}</p>
        <p>State of Origin: {cvData.stateOfOrigin} | State of Residence: {cvData.stateOfResidence} | LGA of Residence: {cvData.lgaOfResidence}</p>
        
        <div style={cvBuilderStyles.section}>
          <h3 style={cvBuilderStyles.sectionTitle}>Education</h3>
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <h4>{edu.institution}</h4>
              <p>{edu.degree}</p>
              <p>{edu.year}</p>
            </div>
          ))}
        </div>
        
        <div style={cvBuilderStyles.section}>
          <h3 style={cvBuilderStyles.sectionTitle}>Work Experience</h3>
          {cvData.workExperience.map((exp, index) => (
            <div key={index}>
              <h4>{exp.position}</h4>
              <p>{exp.company}</p>
              <p>{exp.startDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobSeekerDashboard = () => {
  const { isMobile } = useResponsiveDesign();
  const [activeTab, setActiveTab] = useState('search');

  const dashboardStyles = {
    container: {
      ...styles.container,
      flexDirection: 'column',
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    tab: {
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ddd',
    },
    activeTab: {
      backgroundColor: '#007bff',
      color: 'white',
    },
  };

  return (
    <div style={dashboardStyles.container}>
      <div style={dashboardStyles.tabContainer}>
        <div 
          style={{...dashboardStyles.tab, ...(activeTab === 'search' ? dashboardStyles.activeTab : {})}}
          onClick={() => setActiveTab('search')}
        >
          Job Search
        </div>
        <div 
          style={{...dashboardStyles.tab, ...(activeTab === 'cv' ? dashboardStyles.activeTab : {})}}
          onClick={() => setActiveTab('cv')}
        >
          CV Builder
        </div>
      </div>
      
      {activeTab === 'search' ? (
        <div>
          <h2>Job Search</h2>
          <input
            type="text"
            placeholder="Search for jobs"
            style={styles.input}
          />
          <button style={styles.button}>Search</button>
          <h2>Your Applications</h2>
          <p>No applications yet.</p>
        </div>
      ) : (
        <CVBuilder />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const { user, register } = useContext(AuthContext);

  const handleRegister = (userData) => {
    register(userData);
    setIsRegistrationModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div style={{...styles.container, minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main style={{flex: 1}}>
        {user ? (
          user.role === 'employer' ? <EmployerDashboard /> : <JobSeekerDashboard />
        ) : (
          <Home />
        )}
      </main>

      <Footer />

      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login onLoginSuccess={handleLoginSuccess} />
        <p>Don't have an account? 
          <button onClick={() => {
            setIsLoginModalOpen(false);
            setIsRegistrationModalOpen(true);
          }}>Register</button>
        </p>
      </Modal>

      <Modal isOpen={isRegistrationModalOpen} onClose={() => setIsRegistrationModalOpen(false)}>
        <Registration onRegister={handleRegister} />
      </Modal>
    </div>
  );
};

const JobList = () => {
  // Mock data for job listings
  const mockJobs = [
    { id: 1, title: "Software Engineer", company: "Tech Co" },
    { id: 2, title: "Data Analyst", company: "Data Corp" },
    { id: 3, title: "Product Manager", company: "Product Inc" },
  ];

  // Mock data for job details
  const mockJobDetails = {
    1: { description: "Develop web applications", salary: "$100,000", location: "San Francisco" },
    2: { description: "Analyze business data", salary: "$80,000", location: "New York" },
    3: { description: "Manage product lifecycle", salary: "$120,000", location: "Seattle" },
  };

  const [jobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (jobId) => {
    const jobInfo = jobs.find(job => job.id === jobId);
    const jobDetails = mockJobDetails[jobId];
    setSelectedJob({ ...jobInfo, ...jobDetails });
  };

  return (
    <div className="job-list-container">
      <h2>Job Listings</h2>
      <div className="job-list">
        {jobs.map(job => (
          <div key={job.id} className="job-item" onClick={() => handleJobClick(job.id)}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
          </div>
        ))}
      </div>
      {selectedJob && (
        <div className="job-details">
          <h2>{selectedJob.title}</h2>
          <h3>{selectedJob.company}</h3>
          <p><strong>Description:</strong> {selectedJob.description}</p>
          <p><strong>Salary:</strong> {selectedJob.salary}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
        </div>
      )}
    </div>
  );
};
// Root component
const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;