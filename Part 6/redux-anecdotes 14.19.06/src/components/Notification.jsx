/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';

function Notification() {
  const notificationToShow = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (notificationToShow) {
    return (
      <div style={style}>
        {notificationToShow}
      </div>
    );
  }
  return null;
}

export default Notification;
