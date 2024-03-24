import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import AddTransactionForm from "./AddTransactionForm";

const AddTransaction = ({ defaultType, categories, show, setShow, onChange, refreshDashboard }) => {
    const [keepOpened, setKeepOpened] = useState(false);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        type: 'expense',
        date: '',
        amount: '',
        category_id: '',
        sub_category_id: '',

        recurring: false,
        recur_type: 'monthly',
        recur_interval: 1,
        recur_start_date: '',
        recur_end_date: '',

        description: '',
    });

    useEffect(() => {
        setData('type', defaultType);
    }, [defaultType]);

    const submit = (e) => {
        e.preventDefault();

        post(route('transactions.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();

                if (!keepOpened) {
                    setShow(false);
                }

                if (refreshDashboard) refreshDashboard();
            },
            onError: () => {
            }
        });
    };

    const cancel = () => {
        reset();
        clearErrors();
        setKeepOpened(false);
        setShow(false);
    };

    return (
        <Modal
            show={show}
            maxWidth="lg"
            title={`New Transaction`}
            onClose={() => setShow(false) }>
                <div>
                    <form className="" onSubmit={submit}>
                        <div className="modal-content">
                            <AddTransactionForm
                                setData={setData}
                                reset={reset}
                                clearErrors={clearErrors}
                                errors={errors}
                                categories={categories}
                                {...data}
                            />
                        </div>

                        <div className="flex justify-between flex-col md:flex-row lg:flex-row mt-8">
                            <label className="flex items-center">
                                <Checkbox
                                    name="addmore"
                                    checked={keepOpened}
                                    onChange={(e) => setKeepOpened(e.target.checked) }
                                />
                                <span className="ml-2 text-sm text-gray-600">Keep this popup opened</span>
                            </label>

                            <div className="mt-3 md:mt-0 lg:mt-0 flex justify-between">
                                <PrimaryButton
                                    onClick={ cancel }
                                    type="button"
                                    className="me-3 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </PrimaryButton>

                                <PrimaryButton type="submit">
                                    SUBMIT
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
        </Modal>
    );
};

export default AddTransaction;