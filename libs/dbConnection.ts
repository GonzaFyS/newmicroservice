import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "../ormconfig";

export const connectPostgreSQL = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (e) {
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ORMConfig);
    }
    console.log("🌴 Database connection was successful!");
  } catch (e) {
    console.error('ERROR: Database connection failed!!', e);
    throw e;
  }
};

export const TryPostgreSQLConnection = async (onError: Function, next?: Function) => {
  try {
    await connectPostgreSQL();
    if (next) {
      next();
    }
  } catch (e) {
    onError();
  }
};

