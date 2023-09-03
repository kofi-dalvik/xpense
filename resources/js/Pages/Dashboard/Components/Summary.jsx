import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { TextButton, SectionTitle, DateRangePicker } from "@/Pages/Dashboard/Components";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const Budget = ({budget, refreshDashboard}) => {
    const [show, setShow] = useState(false);
    const currentMonth = moment().format('MMMM');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        limit: budget.limit,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('budgets.update'), {
            onSuccess: () => {
                setShow(false);
                reset();
                clearErrors();
                if (refreshDashboard) refreshDashboard();
            }
        });
    };

    const cancel = () => {
        reset();
        clearErrors();
        setShow(false);
    };

    return (
        <div className="budget flex flex-col ps-2 pe-2">
            <h5>Budget</h5>

            <div className="grow-1 w-full bg-slate-100 rounded my-2">
                a
            </div>

            <div className="p-0 w-full">
                <div className="grid grid-cols-2 w-full">
                        <div className="text-center">
                        <div className="m-0">$ {budget.limit.toLocaleString()}</div>
                        <p className="m-0 text-sm text-muted">
                            Monthly Limit <br/> <TextButton onClick={ () => setShow(true) } text="Set Limit"/>
                        </p>
                    </div>

                    <div className="text-center">
                        <div className={`m-0 ${budget.balance < 0 ? 'text-red-500' : 'text-success'}`}>
                            $ { budget.balance.toLocaleString() }
                        </div>
                        <p className="m-0 text-sm text-muted">
                            Amount <br/> Remaining
                        </p>
                    </div>
                </div>
            </div>

            <Modal
                show={show}
                maxWidth="sm"
                title={`Set Monthly Limit`}
                onClose={() => setShow(false) }>
                    <div className="">
                        <form className="" onSubmit={submit}>
                            <div className="form-group mb-5">
                                <InputLabel value={`Limit for ${currentMonth}`} />

                                <TextInput
                                    id="limit"
                                    type="number"
                                    name="limit"
                                    value={data.limit}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('limit', e.target.value)}
                                />

                                <InputError message={errors.limit} className="mt-2" />
                            </div>

                            <div className="text-right">
                                <PrimaryButton
                                    onClick={ cancel }
                                    type="button"
                                    className="me-3 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </PrimaryButton>

                                <PrimaryButton type="submit">
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
    );
};

export default function Summary({ dateRange, setDateRange, summary, budget, refreshDashboard }) {
    const figures = [
        { name: 'Income', amount: summary.income, color: 'text-success', icon: 'mdi-chevron-double-up' },
        { name: 'Expense', amount: summary.expense, color: 'text-danger', icon: 'mdi-chevron-double-down' },
        { name: 'Balance', amount: summary.balance, color: 'text-primary', icon: 'mdi-autorenew', hideMore: true },
    ];

    const secTitle = `Analytics from ${moment(dateRange.from).format('MMM DD')} to ${moment(dateRange.to).format('MMM DD')}`;

    return (
        <>
            <SectionTitle
                icon="mdi-chart-areaspline"
                title={ secTitle }
                subtitle="View summary of your transactions">
                    <div className="bg-purple-100 p-3 rounded">
                        <DateRangePicker value={ dateRange } onChange={ setDateRange } />
                    </div>
            </SectionTitle>

            <div className='summary rounded p-4 mt-5'>
                <div className="grid grid-cols-12">
                    <div className="col-span-8 pr-5">
                        <div className="grid grid-cols-12">
                            { figures.map((figure, index) => {
                                return (
                                    <div key={index} className={`col-span-4 figure ${figure.color} rounded`}>
                                        <div className="icon">
                                            <i className={`mdi ${figure.icon} text-xl`}></i>
                                        </div>
                                        <div className="amount">
                                            <span className="text-sm">$</span> {figure.amount.toLocaleString()}
                                        </div>
                                        <div className="text-muted flex items-center text-sm">
                                            <span className="me-2">{figure.name}</span>
                                            { !figure.hideMore && (
                                                <TextButton
                                                    text="Add"
                                                    title={`Configure ${figure.name}`}
                                                    />
                                            ) }
                                        </div>
                                    </div>
                                );
                            }) }
                        </div>

                        <div className="mt-3 p-5 bg-slate-100 rounded">
                            chart
                        </div>
                    </div>

                    <div className="col-span-4">
                        <Budget budget={budget} refreshDashboard={refreshDashboard}/>
                    </div>
                </div>
            </div>
        </>
    );
}