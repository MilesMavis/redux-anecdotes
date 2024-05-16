/* eslint-disable react/prop-types */
function LogoutButton({ handleLogout }) {
  return (
    <button type="button" onClick={handleLogout}>logout</button>
  );
}

export default LogoutButton;
