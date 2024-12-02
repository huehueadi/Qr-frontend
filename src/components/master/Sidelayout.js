import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidelayout() {
  const [isSlotDropdownOpen, setIsSlotDropdownOpen] = useState(false);

  const toggleSlotDropdown = () => {
    setIsSlotDropdownOpen(!isSlotDropdownOpen);
  };

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <div className="user-sidebar text-center">
          <div>
            <div className="user-img">
              <img src="assets/images/users/dyst.io-logo.png" alt="Logo" />
            </div>
            <div className="user-info">
              <h5 className="mt-3 font-size-16 text-white">Administrator</h5>
            </div>
          </div>
        </div>

        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>

            {/* QR Management */}
            <li>
              <Link to="/qrmanagement" className="waves-effect">
                <i className="mdi mdi-qrcode-scan" /> {/* QR code icon */}
                <span className="badge rounded-pill bg-info float-end">3</span>
                <span>QR Management</span>
              </Link>
            </li>

            {/* Slot Management Dropdown */}
            <li className={`has-submenu ${isSlotDropdownOpen ? 'open' : ''}`}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();  // Prevents default anchor behavior
                  toggleSlotDropdown();
                }}
                className="waves-effect"
              >
                <i className="mdi mdi-calendar-clock" /> {/* Slot/Calendar icon */}
                <span>Slot Management</span>
                <span className="menu-arrow"></span>
              </Link>

              {/* Conditionally render submenu items */}
              {isSlotDropdownOpen && (
                <ul className="submenu">
                  <li>
                    <Link to="/slot_management">
                      <i className="mdi mdi-calendar-plus" /> {/* Icon for Generate Slot */}
                      <span>Generate Slot</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/slot_update">
                      <i className="mdi mdi-calendar-edit" /> {/* Icon for Update Slot */}
                      <span>Update Slot</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/slot_list">
                      <i className="mdi mdi-calendar-check" /> {/* Icon for View Booked Slots */}
                      <span>View Booked Slots</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Landing Page */}
            <li>
              <Link to="/landing-page-selector" className="waves-effect">
                <i className="mdi mdi-web" /> {/* Web/Landing Page icon */}
                <span>Landing Page</span>
              </Link>
            </li>

            {/* Add Brand */}
            <li>
              <Link to="/add_brand" className="waves-effect">
                <i className="mdi mdi-tag-plus" /> {/* Tag icon for adding brands */}
                <span>Add Brand</span>
              </Link>
            </li>

            {/* Analytics */}
            <li>
              <Link to="/analytics" className="waves-effect">
                <i className="mdi mdi-chart-line" /> {/* Analytics/Chart icon */}
                <span>Analytics</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidelayout;