import config from "../config";
import IService, { IAppContext } from "../types/app";
import axios from "axios";

export default class PaymentService extends IService{
    private endpoint = 'https://api.paystack.co'

    constructor(props:IAppContext){
        super(props)
    }

    async initiateTransaction(InitiateTransactionInput:any, userId:any): Promise<any> {
        const user = await this.authenticate_user(userId);
    
        const { email } = InitiateTransactionInput;
    
        if (user.email !== email) {
            throw new Error('Wrong user');
        }   
    
        try {
            const response = await axios({
                method: 'post',
                url: `${this.endpoint}/transaction/initialize`,
                headers: {
                    'Authorization': `Bearer ${config.paystack.secret_key}`
                },
                data: InitiateTransactionInput
            });
            
            return response.data;
        } catch (e) {
            throw new Error(`Failed to initialize transaction: ${e}`);
        }
    }

    async verifyTransaction(Reference:String,userId:any){
        await this.authenticate_user(userId)
        
        try{
            const response = await axios({
                method:'get',
                url:`${this.endpoint}/transaction/verify/${Reference}`,
                headers:{
                    'Authorization': `Bearer ${config.paystack.secret_key}`
                }
            })

            const bookingId = response.data.data.metadata.bookingId
            const transactionId = response.data.data.id
            const reference = response.data.data.reference
            const status = response.data.status
            const main_status = response.data.data.status
            const amount = response.data.data.amount
            const startDate = response.data.data.paid_at

            const booking = await this.authenticate_booking(bookingId)

            if(status && main_status && booking){
                await booking.updateOne({
                    $set : {
                        status:"CONFIRMED",
                        transactionId,
                        reference,
                        amount,
                        startDate,
                    }
                })
                
            }else if(!status && !main_status){
                await booking.updateOne({
                    $set : {
                        status:"REJECTED"
                    }
                })

            }

            await booking.save()

            const {data} = response
        return {data,booking}
        }catch(e){
            throw new Error(`Failed to verify transaction: ${e}`)
        }
    }

    async makePaymentToOwner(bookingId:any,userId:any){
        await this.authenticate_user(userId)
        const booking = await this.authenticate_booking(bookingId)

        const {apartment} = booking

        const _apartment = await this.authenticate_apartment(apartment)

        const {owner} = _apartment

        const _owner = await this.models.User.findById(owner)

        if(!_owner){
            throw new Error('Owner not found')
        }

        // making owner a transfer recipient to recieve payments
        
        try{
            const {profile,ownerPayment} = _owner
            
        const response = await axios({
            method:'post',
            url:`${this.endpoint}/transferrecipient`,
            headers:{
                'Authorization': `Bearer ${config.paystack.secret_key}`,
                'Content-Type':'application/json'
            },
            data:{
                "type":"ghipss",
                "name":`${profile.firstname} ${profile.lastname}`,
                "account_number":`${ownerPayment.accountNumber}`,
                "bank_code":`${ownerPayment.bankCode}`,
                "currency":"GHS"
            }
        })
        
        //making transfer
        const recipient_code = response.data.data.recipient_code
        const {amount} = booking
        const data = {
            "source":"balance",
            "reason":"recieving payment for apartment",
            "amount": ((95/100) * Number(amount)),
            "recipient":recipient_code
        }

        const _response = await axios({
            method:'post',
            url:`${this.endpoint}/transfer`,
            headers:{
                'Authorization': `Bearer ${config.paystack.secret_key}`,
                'Content-Type':'application/json'
            },
            data : data
        })

       return _response.data
        }catch(e){
            throw new Error(`Error paying owner of apartment: ${e}`)
        }
    }
}    