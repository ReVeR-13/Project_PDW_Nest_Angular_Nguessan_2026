//Ceci est une aide de creation de dossier qui ajoute un fichier index.js dedans

import * as fichier from 'fs';
import * as path from 'path';
import { color } from './help_color';

const nom_dossier: string = process.argv[2];
const nom_projet: string = 'nest-js-api';

if (!nom_dossier || nom_dossier.length < 3 || nom_dossier.length > 150) {
    console.log(`Nom de dossier invalide : ${color.bleu(nom_dossier)}`);
    process.exit(1);
}

const racine: string = path.resolve(process.cwd(), nom_dossier);
const decoupeDossier: string[] = racine.split(path.sep);

let lstdos: string[] = decoupeDossier;
if (decoupeDossier[0] === '' || decoupeDossier[0].includes(':')) {
    lstdos = decoupeDossier.slice(1);
}

let chemin_courrant: string = decoupeDossier[0] === "" ? path.sep : decoupeDossier[0].includes(":") ? decoupeDossier[0] + path.sep : decoupeDossier[0]

let v: boolean = false;
lstdos.forEach(dossier => {
    if (dossier) {

        chemin_courrant = path.join(chemin_courrant, dossier);

        if (v === true) {
            //verifie si le chemin existe
            if (!fichier.existsSync(chemin_courrant)) {
                //cretion du dossier
                if (chemin_courrant.endsWith('.ts')) {
                    fichier.writeFileSync(chemin_courrant, `// [${dossier}] ${path.basename(chemin_courrant)}`);
                    console.log(`Le Fichier [${color.bleu(path.basename(nom_dossier))}] est créé  : ${color.bleu(chemin_courrant)}`);
                } else {

                    fichier.mkdirSync(chemin_courrant, { recursive: true });
                    console.log(`Le dossier [${color.bleu(path.basename(nom_dossier))}] est créé  : ${color.bleu(chemin_courrant)}`);

                    const index: string = path.join(chemin_courrant, 'index.ts');
                    if (!fichier.existsSync(index)) {
                        fichier.writeFileSync(index, `//[${dossier}] index.ts`);
                        console.log(color.yellow(`Index.ts Créé`));
                    }
                }
            }
        }
        if (v === false && dossier === nom_projet) {
            v = true;
        }
    }
})

console.log(`Creation de [${color.bleu(nom_dossier)}] terminée \nChemin : ${color.bleu(chemin_courrant)}\n`);


