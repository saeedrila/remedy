import React from "react";
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthProvider'


// Import menuDropdown
import ProfileMenu from "../Common/ProfileMenu"

const Header = (props) => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const isLoggedIn = !!auth.accessToken;
  
  
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header id="page-header">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            <div className="navbar-brand-box">
              <div className="position-relative">
                <h1 className="hand-cursor" onClick={() => navigate('/')}>Remedy</h1>
              </div>
            </div>
            
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          
          <div className="d-flex">
            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <div className='hand-cursor' onClick={() => navigate('/login')}>Login/Signup</div>
            )}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};


export default Header;
