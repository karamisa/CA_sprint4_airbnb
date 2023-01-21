

export function OrderDetails({ orderPrices }) {
    return(
        <>
        <p className="no-charge-msg" style={{ textAlign: 'center' }}>You won't be charged yet</p>
        <div className="prices grid">
            <p>${orderPrices.stayPrice} x {orderPrices.totalStay} nights</p>
            <p>${orderPrices.totalStayPrice}</p>
            <p>Service fee</p>
            <p>${orderPrices.totalServiceFee}</p>
        </div>
        <div className="total flex justify-between">
            <p>Total</p>
            <p>${orderPrices.totalPrice}</p>
        </div>
    </>
    )
}