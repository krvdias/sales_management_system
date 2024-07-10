import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Header({ auth }) {
    const { url } = usePage();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const linkClasses = (path) => 
        `text-gray-800 ${url === path ? 'border-b-2 border-blue-600' : ''}`;

    return (
        <header className="bg-gray-400 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-6">
                <img
                    src="/Uploads/Other/SGPmaterials.png"
                    alt="Logo"
                    className="w-full rounded-lg"
                    style={{ maxWidth: '13%', maxHeight: '40px' }}
                />
                <nav className="flex space-x-6">
                    <Link href="/" className='font-bold'>Home</Link>
                    <Link href={route('Materials.show')} className='font-bold'>Materials</Link>
                    {auth.user && (
                        <Link href={route('cart.index')} className='font-bold'>Cart</Link>
                    )}
                    <Link href={route('Contacts.view')} className='font-bold'>Contact Us</Link>
                    <Link href={route('About.index')} className='font-bold'>About Us</Link>
                </nav>
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                    {auth.user ? (
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {auth.user.name}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
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
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded mr-4"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                    <button
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-900 transition duration-150 ease-in-out"
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

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link href="/" className='font-bold'>Home</Link>
                    <Link href={route('Materials.show')} className='font-bold'>Materials</Link>
                    {auth.user && (
                        <Link href={route('cart.index')} className='font-bold'>Cart</Link>
                    )}
                    <Link href={route('Contacts.view')} className='font-bold'>Contact Us</Link>
                    <Link href={route('About.index')} className='font-bold'>About Us</Link>
                </div>
                {auth.user && (
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link href={route('profile.edit')} className="text-gray-800">Profile</Link>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-gray-800"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
