import { useEffect, useRef } from "react";

const formatString = 'MMMM D, YYYY';

export default function DateRangePicker({ value, onChange = () => {} }) {
    const inputRef = useRef(null);

    let startDate = moment().startOf('month');
    let endDate = moment().endOf('month');

    if (value) {
        startDate = moment(value.from);
        endDate = moment(value.to);
    }

    const selectedRange = `${startDate.format(formatString)} - ${endDate.format(formatString)}`;

    const onApply = (start, end) => {
        onChange({
            from: start.format('YYYY-MM-DD'),
            to: end.format('YYYY-MM-DD')
        });
    }

    useEffect(() => {
        $(inputRef.current).daterangepicker({
            startDate: startDate,
            endDate: endDate,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [
                    moment().subtract(1, 'month').startOf('month'),
                    moment().subtract(1, 'month').endOf('month'),
                ],
            },
        }, onApply);
    });

    return (
        <button type="button" ref={inputRef} className="w-full text-sm text-purple-600 cursor-pointer select-none truncate">
            <i className="mdi mdi-calendar me-1"></i>
            <span>{ selectedRange }</span>
            <i className="mdi mdi-chevron-down ms-2"></i>
        </button>
    );
}