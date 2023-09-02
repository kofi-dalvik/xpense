import Dropdown from '@/Components/Dropdown';
import { SectionTitle } from '.';

const Transaction = ({ transaction }) => {
    return (
        <div className='x-transaction flex items-center'>
            <div className="flex justify-center items-center h-12 w-12 bg-slate-100 me-2 rounded p-2">
                <i className={`mdi mdi-food text-success text-3xl p-2`}></i>
            </div>

            <div className='grow flex justify-between'>
                <div className='me-2'>
                    <div className='text-sm'>Chicken from walmart</div>
                    <div className='text-xs text-muted'>Jan 01, 2021</div>
                </div>
                <div className='text-base text-red-400 font-bold'>$23.42</div>
            </div>
        </div>
    );
};

export default function Transactions({ auth }) {
    return (
        <div className="x-transactions shadow p-3">
            <header className="header flex justify-end p-1">
                <div className="ml-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-purple-500 bg-purple-100 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <i className="mdi mdi-account-circle me-2"></i> {auth.user.name}
                                    <i className="mdi mdi-chevron-down ms-2 text-xl"></i>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                <i className="mdi mdi-account-edit me-1"></i> Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                <i className="mdi mdi-logout-variant me-1"></i> Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </header>

            <SectionTitle
                icon="mdi-history"
                title="Transactions"
                subtitle="Manage your categories">
                    <div className="text-end">
                        <button className='btn bg-white shadow text-sm'>
                            <i className='mdi mdi-plus me-1'></i>
                            Add
                        </button>
                    </div>
            </SectionTitle>

            <div>
                <Transaction />
            </div>
        </div>
    );
}