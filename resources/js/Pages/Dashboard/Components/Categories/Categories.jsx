import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { SectionTitle } from "@/Pages/Dashboard/Components";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import EditCategory from "./EditCategory";
import CategoryItem from "./CategoryItem";
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

export default function Categories({ categories, refreshDashboard }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const onEditClick = (category) => {};

    return (
        <div className="mt-5">
            <SectionTitle
                icon="mdi-google-circles-extended"
                title="Categories"
                subtitle="Manage your categories">
                    <div className="text-end">
                        <button onClick={() => setShowAddCategory(true) } className='btn bg-white shadow text-sm'>
                            <i className='mdi mdi-plus me-2'></i>
                            Add Category
                        </button>
                    </div>
            </SectionTitle>

            <div className="categories pb-4 my-8 grid grid-cols-6 gap-4">
                { categories.map((category, index) => {
                    return <CategoryItem
                            key={index}
                            category={category}
                            onEditClick={ onEditClick }
                        />
                })}
            </div>

            <AddCategory
                show={ showAddCategory }
                setShow={ setShowAddCategory }
                category={ selectedCategory }
                onClose={ setSelectedCategory }
                parents={ categories }
                refreshDashboard={ refreshDashboard }
            />
        </div>
    );
}