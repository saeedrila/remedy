import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";



const ProfileMenu = props => {
  const [menu, setMenu] = useState(false);
  const [username, setUsername] = useState("User");
  const [profilePicURL, setProfilePicURL] = useState('');

  const navigate = useNavigate()
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    setAuth({
      email: null,
      pwd: null,
      roles: {},
      accessToken: null,
      refreshToken: null,
    });
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  useEffect(() => {
    try{
      const url = localStorage.getItem('profilePicURL');
      setProfilePicURL(url)
    } catch (error){
      const url = 'example.com'
      setProfilePicURL(url)
    }
  }, [profilePicURL]);

  const handleDashboard = () => {
    if (auth.roles.is_executive){
      navigate('/dashboard-executive')
    }
    else if(auth.roles.is_doctor){
      navigate('/dashboard-doctor')
    }
    else if(auth.roles.is_lab){
      navigate('/dashboard-lab')
    }
    else(
      navigate('/dashboard-patient')
    )
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profilePicURL}
            alt="Header Avatar"
          />
          <span className="d-none d-lg-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" onClick={() => navigate('/profile')}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {"Profile"}{" "}
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => navigate('/chat')}>
            <i className="bx bx-chat font-size-16 align-middle me-1" />
            {"Chat"}
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => handleDashboard()}>
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {"Dashboard"}
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link to="/" onClick={handleLogout} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{"Logout"}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

export default ProfileMenu;
