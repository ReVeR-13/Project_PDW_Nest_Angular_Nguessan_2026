import { execSync } from "child_process";

const nom:string =process.argv[2];

if (nom) {
    
    execSync(`nest g controller ${nom}`,{stdio: 'inherit'});
    execSync(`nest g service ${nom}`,{stdio: 'inherit'});
    execSync(`nest g module ${nom}`,{stdio: 'inherit'});
    execSync(`npm run upd-idx`,{stdio: 'inherit'});
    
}