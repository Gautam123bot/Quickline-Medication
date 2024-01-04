import React from 'react'
import tw from 'tailwind-styled-components'

function RiderSelector() {
    return(
        <>
            <Wrapper>
                <Title>Choose a ride, of swipe up for more</Title>
                <CarList>
                    <div className='car flex'>
                        <img className='h-14' src="/src/Assets/uberx.png" alt="" />
                        <div className="cardetails">
                            <div className="service">
                                UberX
                            </div>
                            <div className="time">
                                5min away
                            </div>
                        </div>
                        <div className="price flex-1">Rs. 278.00</div>
                    </div>
                </CarList>
            </Wrapper>
        </>
    )
}

export default RiderSelector;

// const CarImage = tw.img``

// const Car = tw.img``

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`

const CarList = tw.div``

const Wrapper = tw.div`
flex-1
`
