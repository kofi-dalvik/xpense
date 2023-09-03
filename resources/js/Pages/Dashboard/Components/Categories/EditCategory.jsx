import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { chunk } from "lodash";
import CategoryItem from "./CategoryItem";

const EditCategory = ({ id, name, parent_id, color, icon, setData, errors, reset, parents }) => {
    const colors = [ 'indigo', 'purple', 'pink', 'gray', 'danger', 'success', 'warning', 'info', 'dark' ];
    let icons = [
        'mdi-account', 'mdi-airplane', 'mdi-ambulance', 'mdi-food', 'mdi-baby', 'mdi-bank', 'mdi-food-apple', 'mdi-mushroom',
        'mdi-bike', 'mdi-music-box', 'mdi-bus', 'mdi-cake', 'mdi-car', 'mdi-sofa', 'mdi-access-point-network', 'mdi-barley', 'mdi-cash-100',
        'mdi-cash-multiple', 'mdi-cash-usd', 'mdi-certificate', 'mdi-chef-hat', 'mdi-clipboard', 'mdi-clock', 'mdi-coffee',
        'mdi-coffee-outline', 'mdi-currency-usd', 'mdi-diamond', 'mdi-dog', 'mdi-dumbbell', 'mdi-heart-pulse', 'mdi-shopping',
        'mdi-gift', 'mdi-gamepad-variant', 'mdi-school', 'mdi-gas-station', 'mdi-power',
    ];
    icons = chunk(icons, icons.length / 2);

    const onSelected = (category) => {
        if (category && parent_id != category.id) {
            setData('parent_id', category.id);
        } else {
            reset('parent_id')
        }
    };

    return (
        <>
            <div className="form-group my-3">
                <InputLabel value={'Category Name (required)'}/>
                <TextInput
                    type="text"
                    name="name"
                    value={ name }
                    placeholder={`Category name`}
                    className="mt-1 block w-full"
                    onChange={ (e) => setData('name', e.target.value) }
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="form-group my-3">
                <InputLabel value={'Color (required)'}/>
                <div className="flex flex-wrap">
                    {colors.map((col) => {
                        return (
                            <div
                                key={col}
                                onClick={() => setData('color', col)}
                                className={
                                    `cursor-pointer opacity-60 box-xs shadow rounded m-1 bg-${col} ` +
                                    `hover:opacity-100 flex items-center justify-center`
                                }>
                                { color === col ? <i className="mdi mdi-checkbox-marked-circle text-white text-xl"></i> : '' }
                            </div>
                        );
                    })}
                </div>
                <InputError message={errors.color} className="mt-2" />
            </div>

            <div className="form-group my-3">
                <InputLabel value={'Icon (required)'} className="mb-0"/>
                <div className="flex flex-col overflow-x-auto py-2">
                    {icons.map((icos, index) => {
                        return (
                            <div className="flex" key={index}>
                                {
                                    icos.map((ico) => {
                                        return (
                                            <div
                                                key={ico}
                                                onClick={() => setData('icon', ico)}
                                                className={
                                                    `cursor-pointer border shadow rounded m-1 flex items-center justify-center box-xs border-gray-300 ` +
                                                    `${ico === icon ? 'bg-purple-200' : 'bg-slate-100 hover:border-indigo-500'} ` +
                                                    `text-${color}`
                                                }>
                                                <i className={`mdi ${ico} text-2xl`}></i>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })}
                </div>
                <InputError message={errors.icon} className="mt-2" />
            </div>

            <div className="form-group my-3">
                <InputLabel value={'Main Category (Optional)'}/>
                <div className="flex overflow-x-auto py-2">
                    {parents.map((parent) => {
                        return (
                            <CategoryItem
                                key={parent.id}
                                category={parent}
                                parent_id={parent_id}
                                slim={true}
                                onSelected={onSelected}/>
                        );
                    })}
                </div>
                <InputError message={errors.parent_id} className="mt-2" />
            </div>
        </>
    );
};

export default EditCategory;