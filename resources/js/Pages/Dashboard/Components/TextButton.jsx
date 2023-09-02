export default function TextButton({ title = 'Modify', text = 'Modify', icon = 'mdi-library-plus' }) {
    return (
        <a href="#"
            className="inline-flex items-center text-primary"
            title={ title }>
            <i className={`mdi ${icon} text-xs me-1`}></i>
            <span className="text-xs">{ text }</span>
        </a>
    );
}