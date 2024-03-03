import {default as resolvers} from './resolvers'
import {default as typeDefs} from './typeDefs'

const apartmentSchema = (appContext) => {
    return {
        typeDefs,
        resolvers: resolvers(appContext)
    }
}

export default apartmentSchema