import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import SideNavLink from '@/Components/SideNavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NotificationIcon from '@/Components/NotificationIcon';

export default function AgentLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showCustomersDropdown, setShowCustomersDropdown] = useState(false);
    const [showMaterialsDropdown, setShowMaterialsDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            
                            <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('agent/dashboard')} active={route().current('agent/dashboard')}>
                                    AGENT DASHBOARD
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex px-6 ">
                            <NotificationIcon notifications={notifications} setNotifications={setNotifications} />
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('agent/dashboard')} active={route().current('agent/dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <div className="flex flex-1">
                <aside className="bg-gray-800 text-white w-64 min-h-screen py-4">
                    <nav className="mt-10 space-y-2">
                        <div>
                            <button
                                className="flex items-center justify-between w-full px-4 py-2 text-left"
                                onClick={() => setShowCustomersDropdown(!showCustomersDropdown)}
                            >
                                <span>Customers</span>
                                <svg
                                    className={`h-5 w-5 transform transition-transform ${showCustomersDropdown ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {showCustomersDropdown && (
                                <div className="ml-4 space-y-2">
                                    <SideNavLink href={route("agent/Customers.open")}>View Customers</SideNavLink>
                                    <SideNavLink href={route("agent/CustomerAdd.generate")}>Add Customers</SideNavLink>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                className="flex items-center justify-between w-full px-4 py-2 text-left"
                                onClick={() => setShowMaterialsDropdown(!showMaterialsDropdown)}
                            >
                                <span>Materials</span>
                                <svg
                                    className={`h-5 w-5 transform transition-transform ${showMaterialsDropdown ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {showMaterialsDropdown && (
                                <div className="ml-4 space-y-2">
                                    <SideNavLink href={route("MaterialList.creates")}>View Materials</SideNavLink>
                                    <SideNavLink href={route("AddMaterial.indexs")}>Add Material</SideNavLink>
                                </div>
                            )}
                        </div>
                        <SideNavLink href={route("agent/orders.index")}>Orders</SideNavLink>
                        <SideNavLink href={route("bill.view")}>Billing</SideNavLink>
                    </nav>
                </aside>
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}
