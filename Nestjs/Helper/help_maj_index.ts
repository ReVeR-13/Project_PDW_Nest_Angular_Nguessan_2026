
import * as fichier from 'fs';
import * as path from 'path';
import { color } from './help_color';

const racine: string = "./src";
const ignore: string[] = ['node_modules', '.git', 'Helper', 'test', 'dist', 'build','entity','repository'];

const f_chasseur_index = (chemin_dossier: string) => {

    const nom_dossier= path.basename(chemin_dossier);
    if (!ignore.includes(nom_dossier)) {

        const items = fichier.readdirSync(chemin_dossier, { withFileTypes: true });

        const exp:string[] = items
            .filter(el => el.name !== 'index.ts' && 
                !el.name.endsWith('.spec.ts') && 
                el.name !== 'main.ts' && 
                !el.name.endsWith('.entity.ts') && 
                !el.name.endsWith('.repository.ts'))
            .map(el => {
                const nom_:string = el.name.replace('.ts', '');
                return `export * from './${nom_}';`;
            });

        const chemin_index :string = path.join(chemin_dossier, 'index.ts');
        let exist: string = '';

        if (fichier.existsSync(chemin_index)) {
            exist = fichier.readFileSync(chemin_index, 'utf8');
        }

        const non_exist: string[] = exp.filter(ligne => !exist.includes(ligne))

        if (non_exist.length === 0) {
            console.log(`${color.gris('Aucun chagement dans :')} ${color.yellow(chemin_dossier)}`);
        } else {
            const nouv_entree :string = `${exist != ''? exist+ '\n': ''}${non_exist.join('\n')}`;
            fichier.writeFileSync(chemin_index, nouv_entree);
            console.log(`[${color.green('UPDATE')}]Changement dans : ${color.green(chemin_dossier)}`);
        }

        items
            .filter(el => el.isDirectory())
            .forEach(dos => {
                const sous_dos:string = path.join(chemin_dossier, dos.name)
                f_chasseur_index(sous_dos)
            })
        
    }
}

f_chasseur_index(racine);