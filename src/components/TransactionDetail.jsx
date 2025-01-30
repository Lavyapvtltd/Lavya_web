import React from 'react'

const TransactionDetail = ({transaction}) => {
    return (
        <>
            <div className="col-lg-12 col-md-12 col-12">
                <div className="history_box d-flex align-items-center justify-content-between p-4">
                    <div className="history_content">
                        <h6 className='mb-1 fw-semibold'>{transaction.message}</h6>
                        <p className='text-secondary fs-6'>Ref: {transaction.ref_id}</p>
                        <p className='text-secondary'>{new Date(transaction.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="history_amount">
                        <p class={`${transaction.transaction_type=="Dr"?"text-danger":"text-success"} d-flex align-items-center fs-6 fw-semibold`}><span class={`${transaction.transaction_type=="Dr"?"text-danger":"text-success"} currency-symbol pe-1`}><i class="fa fa-inr" aria-hidden="true"></i></span> <span class={`${transaction.transaction_type=="Dr"?"text-danger":"text-success"} currency-value`}>{transaction.amount}</span></p>
                        <div className='mt-2'>
                            <button type='button' className={`${transaction.transaction_type=="Dr"?"bg-danger":"bg-success"} rounded-5 text-white px-4 py-1 border-0`}>{transaction.transaction_type=="Dr"?"Debit":"Credit"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionDetail
