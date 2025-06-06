function NotificationItem({ notification }) {
  return (
    <div className="border-b py-2">
      <p className="text-sm">{notification.message}</p>
      <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
    </div>
  );
}

export default NotificationItem;