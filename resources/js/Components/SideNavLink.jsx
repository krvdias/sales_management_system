import { Link } from '@inertiajs/react';

export default function SideNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block py-2.5 px-4 rounded transition duration-200 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-gray-700 text-white '
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white ') +
                className
            }
        >
            {children}
        </Link>
    );
}
