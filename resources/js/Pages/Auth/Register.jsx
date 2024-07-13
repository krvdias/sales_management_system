import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const [customErrors, setCustomErrors] = useState({
        passwordMismatch: '',
        nameString: '',
        phoneNumberInt: '',
        emailCorrect: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (data.password !== data.password_confirmation) {
            newErrors.passwordMismatch = 'Passwords do not match';
        }

        if (!data.name.match(/^[a-zA-Z\s]+$/)) {
            newErrors.nameString = 'This is not a valid name';
        }

        if (!data.email.includes('@')) {
            newErrors.emailCorrect = 'This is not a valid email';
        }

        if (!data.phone.match(/^\d{10}$/)) {
            newErrors.phoneNumberInt = 'Phone number must be 10 digits';
        }

        setCustomErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="bg-gray-900 px-4 py-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>

                <div>
                    <InputLabel htmlFor="name" value="Name" className="text-white" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-red-500" />
                    {customErrors.nameString && <div className="mt-2 text-red-500">{customErrors.nameString}</div>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-white" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-red-500" />
                    {customErrors.emailCorrect && <div className="mt-2 text-red-500">{customErrors.emailCorrect}</div>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="example123"
                        required
                    />
                    <InputError message={errors.password} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="example123"
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                    {customErrors.passwordMismatch && <div className="mt-2 text-red-500">{customErrors.passwordMismatch}</div>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" className="text-white" />
                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="tel"
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="0123456789"
                        required
                    />
                    <InputError message={errors.phone} className="mt-2 text-red-500" />
                    {customErrors.phoneNumberInt && <div className="mt-2 text-red-500">{customErrors.phoneNumberInt}</div>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Address" className="text-white" />
                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-100"
                        autoComplete="street-address"
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="123 Main St"
                        required
                    />
                    <InputError message={errors.address} className="mt-2 text-red-500" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-300 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
