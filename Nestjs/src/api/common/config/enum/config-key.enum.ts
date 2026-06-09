// [config-key.enum.ts] config-key.enum.ts
export enum ConfigKey{
    DB_TYPE = 'DB_TYPE',
    DB_HOST = 'DB_HOST',
    DB_PORT = 'DB_PORT',
    DB_USER ='DB_USER',
    DB_PWD = 'DB_PWD',
    DB_SYNC = 'DB_SYNC',
    DB_MIGRATIONS = 'DB_MIGRATIONS',
    DB_DATABASE = 'DB_DATABASE',
    JWT_TOKEN_SECRET ='JWT_TOKEN_SECRET',
    JWT_TOKEN_EXPIRE_IN ='JWT_TOKEN_EXPIRE_IN',
    JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET',
    JWT_REFRESH_TOKEN_EXPIRE_IN = 'JWT_REFRESH_TOKEN_EXPIRE_IN',
    APP_BASE_URL ='APP_BASE_URL',
    APP_MODE ='APP_MODE',
    APP_PORT = 'APP_PORT',
    ENTITY_AUTOLOAD = 'ENTITY_AUTOLOAD',

    ENABLE_ORIGINE = 'ENABLE_ORIGINE'
}
export const configMinimalKeys:ConfigKey[] = Object.keys(ConfigKey) as ConfigKey[];