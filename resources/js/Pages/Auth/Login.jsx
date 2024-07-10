import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className="bg-gray-900 px-4 py-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
                
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-white" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-red-500" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center text-gray-100">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-300 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-300 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
