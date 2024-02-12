import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { IAppContext } from '../types/app';

interface MyContext {
  token?: String;
  user?: any;
}

export default function initGraph(appContext: IAppContext): ApolloServer {
  const schema = buildSubgraphSchema([
    
  ]);
}
