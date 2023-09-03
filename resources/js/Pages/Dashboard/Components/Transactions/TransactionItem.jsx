const TransactionItem = ({ transaction }) => {
    const textColor = transaction.type === 'income' ? 'text-success' : 'text-red-400';
    let date = moment(transaction.date).format('MMM DD, YYYY');

    return (
        <div className='flex items-center my-3 pb-3 border-b'>
            <div className="flex justify-center items-center h-12 w-1/5 bg-slate-100 me-2 rounded p-2">
                <i className={`mdi ${transaction.category.ui.icon} text-${transaction.category.ui.color} text-3xl p-2`}></i>
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

export default TransactionItem;