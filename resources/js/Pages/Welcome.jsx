import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
        <Head title="Welcome" />

        <main className="bg-purple-500 min-h-screen flex flex-col items-center justify-center">
            <h1 className="px-5 text-3xl md:text-5xl mb-8 text-white md:w-1/2 text-center">
                Get great insights from managing your expenses
            </h1>

            <h3 className="text-lg italic md:text-3xl mb-8 text-gray-100">
                Try the free features from XPense App
            </h3>
            <div className="flex flex-col items-center">
                <a href={route('register')} className="bg-white text-purple-500 px-4 py-2 rounded-lg text-3xl">
                    REGISTER
                </a>
                <h5 className="my-4 text-2xl text-white">OR</h5>
                <a href={route('login')} className="bg-white text-purple-500 px-4 py-2 rounded-lg text-3xl">
                    LOGIN
                </a>
            </div>
        </main>
        </>
    );
};