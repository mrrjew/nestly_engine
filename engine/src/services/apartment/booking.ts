import IService, { IAppContext } from "../../types/app";

export default class ApartmentBookingService extends IService {
    constructor(props: IAppContext){
        super(props)
    }
    async getAllApartmentBookings(apartmentId:any,userId:any){
        const apartment = await this.models.Apartment.findOne({_id:apartmentId})

        if(apartment.owner !== userId){
            throw new Error(`User does not have any apartment with id: ${apartmentId}`)
        }

        const bookings = this.models.ApartmentBooking.findOne({apartment:apartmentId})

        return bookings
    }

    async createApartmentBooking(CreateApartmentBookingInput:any, user:any) {
     try {
        const {apartment} = CreateApartmentBookingInput

        const _apartment = await this.models.Apartment.find({_id:apartment})

        if(!_apartment){
            throw new Error('No apartment found')
        }

        const booking = await this.models.ApartmentBooking.create(
            {user,...CreateApartmentBookingInput}
        )

        return booking
     }catch(e){
        throw new Error(`Error creating apartment booking: ${e}`)
     }
    }
}