import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    return (
        <header className="x-header">
            <div className="xpense flex items-center">
                <ApplicationLogo className="block h-9 w-auto" />
                {/* <span className="ms-2">XPENSE</span> */}
            </div>

            {/* <form name="search" method="GET" className="search">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <button className="btn bg-purple-100" type="button">
                        <i className="mdi mdi-magnify text-purple-700"></i>
                    </button>
                </div>
            </form> */}
        </header>
    );
}