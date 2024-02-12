"use strict";

import { Config } from "../config";
import express from "express";
import { IAppContext } from "../types/app";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

import initDb from "../models";
import initServices from "../services";


export default async function start(config: Config) {
  try {
    // setting global context
    const appContext: IAppContext = {};

    // initialize models
    appContext.models = await initDb(config.db)
    appContext.services = await initServices(appContext)

    const app = express();
    app.use(express.urlencoded({ extended: true }));

    app.use("/healthcheck", (req, res) => {
      res.status(200).send("All is green!!!");
    });

    app.listen(config.app.port, () => {
      console.log(
        `🚀  Server ready at http://localhost:${config.app.port}/graphql`
      );
    }); 
  } catch (err) {
    console.error(err);
  }
}