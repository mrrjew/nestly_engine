import { IAppContext } from "../../types/app";

export default function (appContext:IAppContext){
    return {
        Query: {

        },

        Mutation: {
            initiateTransaction: async function(_:any,args:any,context:any){
                const response = await appContext.services.PaymentService.initiateTransaction(
                    args.InitiateTransactionInput,context.user._id
                )

                return response
            },

            verifyTransaction: async function(_:any,args:any,context:any){
                const response = await appContext.services.PaymentService.verifyTransaction(
                    args.Reference,context.user._id
                )
                
                return response
            },

            makePaymentToOwner: async function(_:any,args:any,context:any){
                const response = await appContext.services.PaymentService.makePaymentToOwner(
                    args.bookingId,context.user._id
                )

                return response
            }
        }
    }
}