import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import CategoryItem from "../Categories/CategoryItem";
import Checkbox from "@/Components/Checkbox";
import Dropdown from '@/Components/Dropdown';
import { get } from 'lodash';

const RecurringSetup = ({ setData, date, recur_type, recur_interval, recur_start_date, recur_end_date, errors }) => {
    const types = ['daily', 'weekly', 'monthly', 'yearly'];

    const onTypeSelect = (e, type) => {
        e.preventDefault();
        setData('recur_type', type);
    };

    return (
        <div className="border p-3 mt-3 rounded">
            <div>
                <div className="flex items-center">
                    <InputLabel value="Repeats Every" />

                    <TextInput
                        name="recur_interval"
                        type="number"
                        value={recur_interval}
                        onChange={(e) => setData('recur_interval', e.target.value)}
                        className="w-16 h-10 mx-2 text-center"
                    />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm text-black bg-slate-200 rounded h-10 hover:text-gray-700 transition ease-in-out duration-150 capitalize">
                                    { recur_type }
                                    <i className="mdi mdi-chevron-down ms-1 text-xl"></i>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content contentClasses="bg-white shadow-xl border">
                            { types.map((item) => {
                                return (
                                    <Dropdown.Link href="#" as="Button" key={item}
                                        onClick={ (e) => onTypeSelect(e, item) }>
                                        <i className="mdi mdi-chevron-right me-1"></i>
                                        <span className="capitalize">{ item }</span>
                                    </Dropdown.Link>
                                );
                            }) }
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <InputError message={errors.recur_interval || errors.recur_type} className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <InputLabel value="Starts on" />
                    <TextInput
                        name="recur_start_date"
                        type="date"
                        value={recur_start_date}
                        onChange={(e) => setData('recur_start_date', e.target.value)}
                    />
                    <InputError message={errors.recur_start_date} className="mt-2" />
                </div>
                <div>
                    <InputLabel value="Ends on" />
                    <TextInput
                        name="recur_end_date"
                        type="date"
                        value={recur_end_date}
                        onChange={(e) => setData('recur_end_date', e.target.value)}
                    />
                    <InputError message={errors.recur_end_date} className="mt-2" />
                </div>
            </div>
        </div>
    );
};

const AddTransactionForm = ({
    type,
    date,
    amount,
    category_id,
    sub_category_id,
    recurring,
    recur_type,
    recur_interval,
    recur_start_date,
    recur_end_date,
    description,

    categories,
    setData,
    errors,
}) => {
    const types = [
        { id: 'expense', name: 'Expense' },
        { id: 'income', name: 'Income' },
    ];

    const selectedCategory = categories.find((item) => item.id === category_id);
    const subCategories = get(selectedCategory, 'children', []);

    const filteredCategories = categories.filter((item) => item.type === type);

    return (
        <div className="mx-2">
            <div className="mb-5">
                <InputLabel value="Transaction Type" />
                <div className="flex flex-wrap border p-1 rounded">
                    { types.map((item) => {
                        return (
                            <PrimaryButton type="button" key={item.id}
                                onClick={() => setData('type', item.id)}
                                className={
                                    `me-2 ` +
                                    (item.id === type ? 'bg-purple-600 text-white' : 'bg-slate-200')
                                }>
                                <span className='truncate'>{item.name}</span>
                            </PrimaryButton>
                        );
                    }) }
                </div>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="my-5">
                <InputLabel value="Description" />
                <TextInput
                    name="description"
                    value={description}
                    placeholder="e.g. Groceries"
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <InputLabel value="Date" />
                    <TextInput
                        name="date"
                        type="date"
                        value={date}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('date', val);

                            if (!recur_start_date) {
                                setData('recur_start_date', val);
                            }
                        }}
                    />
                    <InputError message={errors.date} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel value="Amount" />
                    <TextInput
                        name="amount"
                        type="number"
                        value={amount}
                        placeholder="e.g 20"
                        onChange={(e) => setData('amount', e.target.value)}
                    />
                    <InputError message={errors.amount} className="mt-2" />
                </div>
            </div>

            <div className="my-5">
                <label className="flex items-center cursor-pointer">
                    <Checkbox
                        name="recurring"
                        checked={recurring}
                        onChange={(e) => setData('recurring', e.target.checked) }
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        This is a recurring transaction
                    </span>
                </label>

                { recurring && (
                    <RecurringSetup
                        recur_type={recur_type}
                        recur_interval={recur_interval}
                        recur_start_date={recur_start_date}
                        recur_end_date={recur_end_date}
                        date={date}
                        setData={setData}
                        errors={errors}
                    />
                ) }
            </div>

            <div className="form-group my-5">
                <InputLabel value={'Category'}/>
                <div className="flex overflow-x-auto py-2">
                    {filteredCategories.map((category) => {
                        return (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                parent_id={category_id}
                                slim={true}
                                onSelected={ () => setData('category_id', category.id) }/>
                        );
                    })}
                </div>
                <InputError message={errors.category_id} className="mt-2" />
            </div>

            { subCategories.length > 0 && (
                <div className="form-group my-5">
                    <InputLabel value={'Sub Category'}/>
                    <div className="flex overflow-x-auto py-2">
                        {subCategories.map((category) => {
                            return (
                                <CategoryItem
                                    key={category.id}
                                    category={category}
                                    parent_id={sub_category_id}
                                    slim={true}
                                    onSelected={ () => setData('sub_category_id', category.id) }/>
                            );
                        })}
                    </div>
                    <InputError message={errors.sub_category_id} className="mt-2" />
                </div>
            ) }
        </div>
    );
};

export default AddTransactionForm;