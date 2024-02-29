"use strict";

import { Config } from "../config";
import express from "express";
import { IAppContext } from "../types/app";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4" ;

import initDb from "../models";
import initServices from "../services";
import log from "../utils/log";
import initGraph from "../graphql";
import { setContext } from "../middlewares/context";


export default async function start(config: Config) {
  try {
    // setting global context
    const appContext: IAppContext = {};

    // initialize models
    appContext.models = await initDb(config.db)
    appContext.services = await initServices(appContext)

    // initialize app
    const app = express();
    app.use(express.urlencoded({ extended: true }));

    //initialize graph
    const graph = initGraph(appContext)
    await graph.start()

    //server health check
    app.use("/healthcheck", (_, res) => {
      res.status(200).send("All is green!!!");
    });

    
    //apollo server express middleware
    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(graph, {
        context: setContext,
      })
    );


    app.listen(config.app.port, () => {
      log.info(
        `Server ready at http://localhost:${config.app.port}/graphql`
      );
    }); 
  } catch (err) {
    console.error(err);
  }
}