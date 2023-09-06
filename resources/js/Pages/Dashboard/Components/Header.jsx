import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    return (
        <header className="x-header flex justify-between items-center p-3 md:p-4 bg-purple-200 shadow fixed left-0 top-0 right-0 z-0">
            <div className="px-8 flex justify-between md:w-3/4 md:px-20 w-full">
                <div className="xpense flex items-center">
                    <ApplicationLogo className="block h-9 w-auto" />
                    <span className="ms-0 italic font-bold text-purple-500">XPENSE</span>
                </div>

                <button className="md:hidden h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg" type="button">
                    <i className="mdi mdi-menu text-xl text-purple-500"></i>
                </button>
            </div>
        </header>
    );
}