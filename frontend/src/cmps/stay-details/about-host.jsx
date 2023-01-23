

export function AboutHost({ stay }) {



    return (
        <section className="header flex justify-between">
            <div className="title-container">
                <h2 className='title secondary-title'><span>{stay.type} </span><span>hosted by </span> {stay.host.fullname}</h2>
                <span>2 guests • 1 bedroom • 2 beds • 1 bath</span>
            </div>
            <div className="host-img">
                <img className="mini-user-img" src={stay.host.imgUrl} alt="" />
            </div>
        </section>
    )
}