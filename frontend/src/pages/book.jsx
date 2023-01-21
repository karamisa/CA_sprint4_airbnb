import arrowLeftImg from '../assets/img/arrow-left.svg'
import rareDiamond from '../assets/img/rare-diamond.svg'

export function Book() {
    return (
        <section className="main-layout secondary-layout">

            <header className="booking-title flex">
                <div className="icon-svg">
                    <img src={arrowLeftImg} className="arrow-img" alt="arrowLeftImg" />
                </div>
                <div>
                    <h2>Request to book</h2>
                </div>
            </header>



            <main className="order-content flex justify-between">

                <section className="order-details flex justify-between">
                    <div>
                        <div className="rare-find flex justify-between">
                            <div>
                        <h4>This is a rare find</h4>
                        <h5>STAY.HOST.NAME's place is usually booked.</h5>
                        </div>
                        <img src={rareDiamond} className="diamond-img" alt="arrowLeftImg" />
                        </div>
                    </div>
                </section>
 
 
 
                <section className="summary-card flex justify-between">

                </section>
        




            </main>



        </section>
    )
}