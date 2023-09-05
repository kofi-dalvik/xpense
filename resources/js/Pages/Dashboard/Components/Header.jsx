import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    return (
        <header className="x-header bg-purple-200 shadow fixed left-0 top-0 right-0 z-0">
            <div className="xpense flex items-center">
                <ApplicationLogo className="block h-9 w-auto" />
                <span className="ms-0 italic font-bold text-purple-500">XPENSE</span>
            </div>
        </header>
    );
}