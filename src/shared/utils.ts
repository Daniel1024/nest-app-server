import { getConnectionOptions, getConnection } from 'TypeORM';

export const getDbConnectionOptions = async (connectionName: string = 'default') => {
  const options = await getConnectionOptions(process.env.NODE_ENV || 'development');
  return {
    ...options,
    name: connectionName
  };
};

export const getDbConnection = async (connectionName: string = 'default') => {
  return getConnection(connectionName);
};

export const runDbMigrations = async (connectionName: string = 'default') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};
