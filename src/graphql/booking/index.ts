import {default as resolvers} from './resolvers'
import {default as typeDefs} from './typeDefs'

const bookingSchema = (context) => {
    return {
        typeDefs,
        resolvers: resolvers(context)
    }
}

export default bookingSchema