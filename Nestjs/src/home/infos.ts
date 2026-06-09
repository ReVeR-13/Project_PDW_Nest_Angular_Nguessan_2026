import { ConfigKey, configManager } from "@common/config";
import { color } from "../../Helper/help_color";

export class Infos{
    static General(){
        const ligne:string = `-----------------------------------------`;
        const port:string = configManager.getValue(ConfigKey.APP_PORT);
        console.log('\n'+ligne);
        console.log(`${color.green('[App. Port]')}  : ${color.yellow('http://localhost:'+port)} `);
        console.log(`${color.green('[SwaggerUI]')}  : ${color.yellow('http://localhost:'+port+'/docs')} `);
        console.log(ligne +'\n');
        
    }
}