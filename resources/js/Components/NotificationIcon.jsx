import { useState } from 'react';

export default function NotificationIcon() {
    const [notifications, setNotifications] = useState([
        { message: 'New material added.' },
        { message: 'Material items are empty.' },
        { message: 'New customer login.' },
    ]);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V8a6 6 0 10-12 0v6c0 .416-.152.8-.405 1.095L4 17h5m6 0v2a2 2 0 01-4 0v-2m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
                    <div className="py-2">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-2 text-gray-500">No notifications</div>
                        ) : (
                            notifications.map((notification, index) => (
                                <div key={index} className="px-4 py-2 text-gray-800 dark:text-gray-200 border-b dark:border-gray-700">
                                    {notification.message}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
