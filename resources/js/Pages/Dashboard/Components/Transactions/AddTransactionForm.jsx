import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { chunk, get } from "lodash";
import { COLORS, ICONS } from "@/contants";
import PrimaryButton from "@/Components/PrimaryButton";
import CategoryItem from "../Categories/CategoryItem";
import Checkbox from "@/Components/Checkbox";

const AddTransactionForm = ({
    type,
    date,
    amount,
    category_id,
    sub_category_id,
    recurring,
    description,

    categories,
    setData,
    errors,
    reset,
    clearErrors,
}) => {
    const types = [
        { id: 'expense', name: 'Expense' },
        { id: 'income', name: 'Income' },
    ];

    const selectedCategory = categories.find((item) => item.id === category_id);
    const subCategories = get(selectedCategory, 'children', []);

    return (
        <div className="mx-2">
            <div className="my-5">
                <InputLabel value="Transaction Type" />
                <div className="flex flex-wrap border p-1 rounded">
                    { types.map((item) => {
                        return (
                            <PrimaryButton type="button" key={item.id}
                                onClick={() => setData('type', item.id)}
                                className={
                                    `me-2 bg-slate-200 ` +
                                    (item.id === type ? 'bg-purple-500 text-white' : '')
                                }>
                                <span className='truncate'>{item.name}</span>
                            </PrimaryButton>
                        );
                    }) }
                </div>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="my-5">
                <label className="flex items-center">
                    <Checkbox
                        name="recurring"
                        checked={recurring}
                        onChange={(e) => setData('recurring', e.target.checked) }
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        This is a recurring transaction
                    </span>
                </label>
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
                        onChange={(e) => setData('date', e.target.value)}
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

            <div className="form-group my-5">
                <InputLabel value={'Category'}/>
                <div className="flex overflow-x-auto py-2">
                    {categories.map((category) => {
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