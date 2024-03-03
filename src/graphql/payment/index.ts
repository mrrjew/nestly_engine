import {default as typeDefs} from './typeDefs'
import {default as resolvers} from './resolvers'

export default function paymentSchema(context){
    return {
        typeDefs,
        resolvers:resolvers(context)
    }
}