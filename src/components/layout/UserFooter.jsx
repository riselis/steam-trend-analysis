import './UserFooter.css';

function UserFooter() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';
  const userEmail = user.email || 'user@example.com';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="user-footer">
      <div className="user-info">
        <div className="user-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <div className="user-name">{userName}</div>
          <div className="user-email">{userEmail}</div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserFooter;

