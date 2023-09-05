import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { TextButton } from "@/Pages/Dashboard/Components";
import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { createChart } from "@/libs/chart";

const Budget = ({currency, dateRange, budget, refreshDashboard }) => {
    const ref = useRef(null);
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

    useEffect(() => {
        const labels = ['Spent', 'Remaining'];
        const data = {
            type: 'doughnut',
            labels: labels,
            values: [budget.spend, budget.balance > 0 ? budget.balance : 0],
            dataLabels: labels
        };

        const chart = createChart(ref.current, data);

        return () => {
            chart.destroy();
        }
    }, [budget]);


    return (
        <div className="budget flex flex-col ps-2 pe-2">
            <h5 className="text-xl text-primary">Budget</h5>
            <p className="text-muted mt-2">
                from { moment(dateRange.from).startOf('month').format('D/MMM/Y') } to { moment(dateRange.to).endOf('month').format('D/MMM/Y') }
                </p>

            <div className="grow-1 w-full h-full flex items-center justify-center rounded my-2">
                <div className="h-56">
                    <canvas ref={ref}></canvas>
                </div>
            </div>

            <div className="p-0 w-full">
                <div className="grid grid-cols-2 w-full">
                        <div className="text-center">
                        <div className="m-0">{currency} {budget.limit.toLocaleString()}</div>
                        <p className="m-0 text-sm text-muted">
                            Monthly Limit <br/> <TextButton onClick={ () => setShow(true) } text="Set Limit"/>
                        </p>
                    </div>

                    <div className="text-center">
                        <div className={`m-0 ${budget.balance < 0 ? 'text-red-500' : 'text-success'}`}>
                            {currency} { budget.balance.toLocaleString() }
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

export default Budget;