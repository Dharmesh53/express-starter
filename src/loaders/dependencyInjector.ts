import Container from "typedi";
import Logger from "./logger";
import { Connection, Model } from "mongoose";

export default function <T>({
  databaseConnection,
  models
}: {
  databaseConnection: Connection,
  models: { name: string; model: Model<T> }[]
}) {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model)
    })

    Container.set('logger', Logger);

    Container.set('db', databaseConnection);
  } catch (error) {
    Logger.error('Error on dependency injector loader: %o', error);
    throw error;
  }
}
