export class color{
    private static reset:string='\x1b[0m';

    static red(text:string):string{
        return`\x1b[31m${text}${this.reset}`;
    }
    static green(text:string):string{
        return`\x1b[32m${text}${this.reset}`;
    }
    static yellow(text:string):string{
        return`\x1b[33m${text}${this.reset}`;
    }
    static bleu(text:string):string{
        return`\x1b[34m${text}${this.reset}`;
    }
    static magnenta(text:string):string{
        return`\x1b[35m${text}${this.reset}`;
    }
    static cyan(text:string):string{
        return`\x1b[36m${text}${this.reset}`;
    }
    static bold(text:string):string{
        return`\x1b[1m${text}${this.reset}`;
    }
    static gris(text:string):string{
        return`\x1b[90m${text}${this.reset}`;
    }

}
