import React from 'react'
import RiderSelector from './RiderSelector';
import tw from 'tailwind-styled-components'

function Confirm() {
    return(
        <>
            <section className='w-full p-5 flex'>
                <RideContainer>
                    <RiderSelector />
                    <ConfirmButtonContainer>Confirm Booking</ConfirmButtonContainer>
                </RideContainer>
            </section>
        </>

    )
}

export default Confirm;

const ConfirmButtonContainer = tw.div`
bg-black text-white
`

const RideContainer = tw.div`
flex-1 flex flex-col
`