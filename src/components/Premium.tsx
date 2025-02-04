import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    const verifyPremiumUser = async ()=>{
        const res = await axios.get(BASE_URL+"/premium/verify",{withCredentials:true})
        if(res.data.isPremium){
            setIsUserPremium(true);
        }
    }
    const handleBuyMemberShip = async (type) => {
        const order: any = await axios.post(BASE_URL + "/payment/create",
            {
                membershipType: type
            }, {
            withCredentials: true
        }
        );
       
        const { amount, keyId, currency, orderId: order_id, notes } = order.data
        const options = {
            key: keyId,
            amount,
            currency,
            name: 'Dev',
            description: 'Membership',
            order_id,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: '9586880759'
            },
            theme: {
                color: '#F37254'
            },
            handler: verifyPremiumUser()
        };
        //Open the razorpay dialogue box
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        // 
    }
    useEffect(()=>{
        verifyPremiumUser()
    },[])
    return !isUserPremium ?
        (<>
            <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid p-4 grow place-items-center">
                <h1 className='text-3xl text-bold'>Silver Membership</h1>
                <ul>
                    <li className='mt-5'>- Chat with other people</li>
                    <li className='my-1'>- 100 connection request per day</li>
                    <li className='my-1'>- Blue tick for 3 months</li>
                </ul>
                <button className='btn btn-secondary mt-4' onClick={() => handleBuyMemberShip("silver")}>Buy Silver </button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid p-4 grow place-items-center">
                <h1 className='text-3xl text-bold'>Gold Membership</h1>
                <ul>
                    <li className='mt-5'>- Chat with other people</li>
                    <li className='my-1'>- Infinite connection request per day</li>
                    <li className='my-1'>- Blue tick 6 months</li>
                </ul>
                <button className='btn btn-primary mt-4' onClick={() => handleBuyMemberShip("gold")}>Buy Gold </button>
            </div>
        </div>
            </>
        ):<div>You are already a premium user</div>
        
    
}

export default Premium
