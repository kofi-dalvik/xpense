import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import EditCategory from "./EditCategory";
import Checkbox from "@/Components/Checkbox";

const AddCategory = ({ show, setShow, category, onChange, parents, refreshDashboard }) => {
    const [keepOpened, setKeepOpened] = useState(false);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        id: category ? category.id : '',
        name: category ? category.name : '',
        parent_id: category ? category.parent_id : '',
        color: category ? category.ui.color : '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();

                if (!keepOpened) {
                    setShow(false);
                }

                if (refreshDashboard) refreshDashboard();
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
            maxWidth="xl"
            title={`Add New Category`}
            onClose={() => setShow(false) }>
                <div>
                    <form className="" onSubmit={submit}>
                        <EditCategory
                            setData={setData}
                            reset={reset}
                            parents={parents}
                            errors={errors}
                            {...data}
                        />

                        <div className="flex justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="addmore"
                                    checked={keepOpened}
                                    onChange={(e) => setKeepOpened(e.target.checked) }
                                />
                                <span className="ml-2 text-sm text-gray-600">Keep this popup opened</span>
                            </label>

                            <div>
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

export default AddCategory;