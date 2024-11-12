import React from 'react';

function Header() {
  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      // Add your logout logic here
      console.log('User logged out');
      alert('You have been logged out');
    }
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          {/* LOGO */}
          <div className="navbar-brand-box">
            <a href="index.html" className="logo logo-dark">
              <span className="logo-sm">
                <img src="assets/images/logo-light.png" alt="Logo" height={28} />
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-light.png" alt="Logo" height={28} />
              </span>
            </a>
            <a href="index.html" className="logo logo-light">
              <span className="logo-sm">
                <img src="assets/images/logo-light.png" alt="Logo" height={28} />
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-light.png" alt="Logo" height={28} />
              </span>
            </a>
          </div>
        </div>

        <div className="d-flex align-items-center">
          {/* Notification Icon */}
          <button
            type="button"
            className="btn header-item noti-icon waves-effect"
            id="page-header-notifications-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="mdi mdi-bell-outline bx-tada" />
            <span className="badge bg-danger rounded-pill">3</span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            className="btn header-item text-danger d-flex align-items-center ms-1"
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <i className="mdi mdi-power font-size-16 align-middle text-danger"></i>
            <span className="ms-1">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
