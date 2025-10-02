/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

// --- Sign Up Modal Component ---
const SignUpModal = ({onClose}: {onClose: () => void}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    day: new Date().getDate().toString(),
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
    gender: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({...prev, gender: e.target.value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.firstName ||
      !formData.surname ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      alert('Please fill in all the required fields.');
      return;
    }
    alert('Account created successfully! (This is a demo)');
    onClose();
  };

  // --- Dynamic Date Options ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => currentYear - i);
  const months = [
    {value: 1, name: 'Jan'},
    {value: 2, name: 'Feb'},
    {value: 3, name: 'Mar'},
    {value: 4, name: 'Apr'},
    {value: 5, name: 'May'},
    {value: 6, name: 'Jun'},
    {value: 7, name: 'Jul'},
    {value: 8, name: 'Aug'},
    {value: 9, name: 'Sep'},
    {value: 10, name: 'Oct'},
    {value: 11, name: 'Nov'},
    {value: 12, name: 'Dec'},
  ];
  const days = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Sign Up</h2>
            <p>It's quick and easy.</p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            &times;
          </button>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Mobile number or email address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <fieldset className="form-fieldset">
            <legend>Date of birth</legend>
            <div className="form-row">
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                aria-label="Day of birth">
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                aria-label="Month of birth">
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.name}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                aria-label="Year of birth">
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Gender</legend>
            <div className="form-row gender-row">
              <label>
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleGenderChange}
                  required
                />
              </label>
              <label>
                Male
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleGenderChange}
                />
              </label>
              <label>
                Custom
                <input
                  type="radio"
                  name="gender"
                  value="custom"
                  checked={formData.gender === 'custom'}
                  onChange={handleGenderChange}
                />
              </label>
            </div>
          </fieldset>

          <p className="form-terms">
            People who use our service may have uploaded your contact information
            to Facebook. <a href="#">Learn more.</a>
          </p>
          <p className="form-terms">
            By clicking Sign Up, you agree to our <a href="#">Terms</a>,{' '}
            <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
            You may receive SMS notifications from us and can opt out at any
            time.
          </p>
          <div className="form-submit-container">
            <button type="submit" className="signup-form-btn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Create Page Modal Component ---
const CreatePageModal = ({onClose}: {onClose: () => void}) => {
  type UserRole = {email: string; role: 'Admin' | 'Editor'};
  const [pageName, setPageName] = useState('');
  const [category, setCategory] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<UserRole[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Admin' | 'Editor'>('Editor');

  const handleAddUser = () => {
    if (newUserEmail && !invitedUsers.find(u => u.email === newUserEmail)) {
      setInvitedUsers([...invitedUsers, { email: newUserEmail, role: newUserRole }]);
      setNewUserEmail('');
    } else if (!newUserEmail) {
      alert('Please enter an email address.');
    } else {
      alert('This user has already been added.');
    }
  };

  const handleRemoveUser = (emailToRemove: string) => {
    setInvitedUsers(invitedUsers.filter(user => user.email !== emailToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName || !category) {
      alert('Please fill in the page name and category.');
      return;
    }
    alert(`Page "${pageName}" created successfully! (This is a demo)`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-page-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Create a Page</h2>
            <p>Control who can manage this application.</p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            &times;
          </button>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Page Name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <fieldset className="form-fieldset page-roles-section">
            <legend>Page Roles</legend>
            <div className="add-user-form">
              <input
                type="email"
                placeholder="Enter email address"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as 'Admin' | 'Editor')}>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
              <button type="button" onClick={handleAddUser} className="add-user-btn">Add</button>
            </div>
            <ul className="invited-users-list">
              {invitedUsers.map(user => (
                <li key={user.email} className="user-role-item">
                  <div className="user-details">
                    <span>{user.email}</span>
                    <span className={`user-role ${user.role.toLowerCase()}`}>{user.role}</span>
                  </div>
                  <button type="button" onClick={() => handleRemoveUser(user.email)} className="remove-user-btn">&times;</button>
                </li>
              ))}
            </ul>
          </fieldset>

          <div className="form-submit-container">
            <button type="submit" className="login-btn">
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Send App Link Component ---
const SendAppLink = () => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Simple regex for phone number validation (at least 10 digits)
    if (!phone.trim() || !/^\+?(\d[\s-]?){9,}$/.test(phone)) {
        setStatus('error');
        setMessage('Please enter a valid phone number.');
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 3000);
        return;
    }


    setStatus('sending');
    setMessage('');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setMessage(`Link sent to your phone!`);
      setPhone(''); // Clear the input

      // Reset after 4 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);
    }, 1500);
  };

  return (
    <div className="send-link-container">
      <p>Get a link to download the app.</p>
      <div className="send-link-form">
        <input
          type="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={status === 'sending'}
        />
        <button
          onClick={handleSendLink}
          disabled={status === 'sending' || !phone}
          className="send-link-btn"
        >
          {status === 'sending' ? 'Sending...' : 'Send Link'}
        </button>
      </div>
      {(status === 'sent' || status === 'error') && message && (
        <p className={`feedback-message ${status}`}>
          {message}
        </p>
      )}
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isCreatePageModalOpen, setIsCreatePageModalOpen] = useState(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const openCreatePageModal = () => setIsCreatePageModalOpen(true);
  const closeCreatePageModal = () => setIsCreatePageModalOpen(false);

  useEffect(() => {
    // Prefetch logo to avoid flicker
    const img = new Image();
    img.src = "https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg";
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="main-content">
          <div className="logo-section">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
              className="facebook-logo"
            />
            <h2>
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="login-section">
            <div className="login-card">
              <form>
                <input
                  type="email"
                  placeholder="Email address or phone number"
                  aria-label="Email address or phone number"
                />
                <input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />
                <button type="submit" className="login-btn">Log In</button>
              </form>
              <a href="#" className="forgot-link">Forgotten password?</a>
              <div className="divider"></div>
              <button onClick={openSignUpModal} className="signup-btn">
                Create new account
              </button>
            </div>
            <p className="page-creation-link">
              <a href="#" onClick={(e) => { e.preventDefault(); openCreatePageModal(); }}>
                Create a Page
              </a>{' '}
              for a celebrity, brand or business.
            </p>
             <SendAppLink />
          </div>
        </div>
      </div>
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
      {isCreatePageModalOpen && <CreatePageModal onClose={closeCreatePageModal} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
