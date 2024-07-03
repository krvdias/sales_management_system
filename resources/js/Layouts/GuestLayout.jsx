import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
            <div className="w-full max-w-2xl mt-6 px-6 py-4 bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center">
                    <Link href="/">
                        
                    </Link>
                </div>
                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
