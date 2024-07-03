import AgentLayout from '@/Layouts/AgentLayout';
import { Head } from '@inertiajs/react';

export default function AgentDashboard({ auth }) {
    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Agent Dashboard</h2>}
        >
            <Head title="Agent Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
