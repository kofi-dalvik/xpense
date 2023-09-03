import Dropdown from '@/Components/Dropdown';
import { SectionTitle } from '.';

const Transaction = ({ transaction }) => {
    const textColor = transaction.type === 'income' ? 'text-success' : 'text-red-400';
    let date = moment(transaction.date).format('MMM DD, YYYY');

    return (
        <div className='flex items-center my-3 pb-3 border-b'>
            <div className="flex justify-center items-center h-12 w-1/5 bg-slate-100 me-2 rounded p-2">
                <i className={`mdi ${transaction.category.ui.icon} ${transaction.category.ui.color} text-3xl p-2`}></i>
            </div>

            <div className='grow flex justify-between w-4/5'>
                <div className='me-2 w-2/3'>
                    <div className='text-sm truncate'>{ transaction.title }</div>
                    <div className='text-xs text-muted truncate'>{date}</div>
                </div>
                <div className={`w-1/3 text-sm ${textColor} font-bold truncate text-right`}>
                    $ {transaction.amount.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default function Transactions({ auth, transactions }) {
    const items = transactions.data || [];

    return (
        <div className="bg-white fixed top-0 right-0 bottom-0 w-1/4 shadow overflow-y-auto">
            <div className="sticky top-0 bg-white shadow p-3">
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
            </div>

            <div className="p-3">
                { items.map((transaction, index) => {
                    return <Transaction transaction={transaction} key={index} />
                }) }
            </div>
        </div>
    );
}