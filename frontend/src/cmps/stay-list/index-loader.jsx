

export function IndexLoader() {

    const demoStays = Array.from({ length: 15 }, (_, i) => ({ _id: i + 101 }));




    return (
        <>
            {/* <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</h1> */}
            <ul className='loader-list card-grid stay-list clean-list main-layout'>
                {demoStays.map((demoStay) => {
                    return (
                        <li
                            key={demoStay._id}
                            className='loader-list-item stay-list-item'>
                            <article className='preview'>
                                <div className="img-place-loader image-slider almost-square-ratio preview" style={{backgroundColor:'#ebebeb'}}></div>
                                <div className="text1-place-loader" style={{backgroundColor:"#b0b0b0", color:"#b0b0b0", lineHeight:'15px', marginTop:'15px', width:'45%'}}>.</div>
                                <div className="text2-place-loader" style={{backgroundColor:"#ebebeb", color:"#ebebeb",lineHeight:'15px', marginTop:'5px', width:'45%'}}>.</div>
                                <div className="text3-place-loader" style={{backgroundColor:"#ebebeb", color:"#ebebeb",lineHeight:'15px', marginTop:'6px', width:'33%'}}>.</div>
                                <div className="text4-place-loader" style={{backgroundColor:"#b0b0b0", color:"#ebebeb",lineHeight:'15px', marginTop: '6px', width:'33%'}}>.</div>
                            </article>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}