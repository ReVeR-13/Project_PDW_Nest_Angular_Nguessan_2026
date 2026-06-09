// [config.manager.ts] config.manager.ts
require('dotenv').config();
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigKey , configMinimalKeys} from "./index";



class ConfigManager{
    constructor(private env:{[key:string]:string | undefined}){}

    public ensureValues(keys:ConfigKey[]):ConfigManager{
        if (Array.isArray(keys)) {
            keys.forEach((k:ConfigKey) => this.getValue(k,true));
        }
        return this;
    }

    public getTypeOrmConfig():TypeOrmModuleOptions{
        return {
            type: this.getValue(ConfigKey.DB_TYPE) as any,
            host: this.getValue(ConfigKey.DB_HOST),
            port: parseInt(this.getValue(ConfigKey.DB_PORT) as string),
            username: this.getValue(ConfigKey.DB_USER),
            password: this.getValue(ConfigKey.DB_PWD),
            database: this.getValue(ConfigKey.DB_DATABASE),
            autoLoadEntities:(this.getValue(ConfigKey.ENTITY_AUTOLOAD) === 'true'),
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: (this.getValue(ConfigKey.DB_SYNC) ==='false'),
            migrationsRun:(this.getValue(ConfigKey.DB_MIGRATIONS) === 'false')
        }
    }

    getValue(key:ConfigKey,throwOnMissing = true):string{
        const value :string = this.env[key] ?? '';
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }
        return value;
    }

    getValueAsNumberOrString(key:ConfigKey, throwOnMissing = true): string | number {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }
        if (!value) return '';
        
        const numValue:number = Number(value);
        if (!isNaN(numValue)) {
            return numValue;
        }
        return value;
    }
}

export const configManager:ConfigManager = new  ConfigManager(process.env).ensureValues(configMinimalKeys)