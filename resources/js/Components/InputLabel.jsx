export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block mb-1 font-bold text-sm text-slate-500 ` + className}>
            {value ? value : children}
        </label>
    );
}
