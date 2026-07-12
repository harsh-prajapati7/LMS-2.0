import profilePic from "../../assets/images/profile.jpg";

import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header className="navbar">

      <h2>Dashboard</h2>

      <SearchBar />

      <div className="navbar-right">

        <NotificationBell />

        <ThemeToggle />

        <div className="user-profile">

          <div className="user-info">

            <h4>Harsh</h4>

            <small>Administrator</small>

          </div>

          <img
            src={profilePic}
            alt="Profile"
            className="profile-image"
          />

          <span className="online-dot"></span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;