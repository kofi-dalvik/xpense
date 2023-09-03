import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import { get } from "lodash";
import TransactionItem from "../Transactions/TransactionItem";

const ViewCategory = ({ dateRange, show, setShow, category, categoryDetail, refreshDashboard }) => {
    const [keepOpened, setKeepOpened] = useState(false);
    const transactions = get(categoryDetail, 'transactions.data', []);

    const cancel = () => {
        setKeepOpened(false);
        setShow(false);
    };

    const formatDate = (date) => {
        return moment(date).format('MMM DD, YY');
    }

    return (
        <Modal
            show={show}
            maxWidth="xl"
            title={
                <div className="flex justify-between">
                    <h5>{ get(category, 'name', '') }</h5>
                    <h5>$ { get(category, 'total', 0).toLocaleString() }</h5>
                </div>
            }
            onClose={() => setShow(false) }>
                <div className="modal-content px-4">
                    { transactions.map((transaction, index) => {
                        return (
                            <TransactionItem key={index} transaction={transaction}/>
                        );
                    }) }

                    { transactions.length === 0 && (
                        <div className="text-center my-5">
                            No transactions found from { formatDate(dateRange.from) } to { formatDate(dateRange.to) }
                        </div>
                    ) }
                </div>

                <div className="flex justify-between my-8">
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
        </Modal>
    );
};

export default ViewCategory;