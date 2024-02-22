import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { IAppContext } from '../types/app';
import userSchema from './user';
import apartmentSchema from './apartment';
import bookingSchema from './booking';

interface MyContext {
  user?: any;
}

export default function initGraph(appContext: IAppContext): ApolloServer {
  const schema = buildSubgraphSchema(
    [
      userSchema(appContext),
      apartmentSchema(appContext),
      bookingSchema(appContext)
    ]
    );

  const graph = new ApolloServer<MyContext>({
    schema
  });

  return graph;
}
