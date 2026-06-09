import { execSync } from "child_process";

const nom:string =process.argv[2];

if (nom) {
    execSync(`nest g module ${nom}`,{stdio: 'inherit'});
    execSync(`npm run upd-idx`,{stdio: 'inherit'});
    
}