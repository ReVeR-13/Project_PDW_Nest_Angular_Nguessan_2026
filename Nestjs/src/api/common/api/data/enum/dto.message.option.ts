export enum DtoOptionMessage{
  String = 'Cet option doit etre une chaine de caractère',
  Date = 'Cet option doit etre une date',
  Bool = 'Cet option doit etre une true ou false',
  NotEmpty = `Cet option ne doit etre vide ou null`,
  LoginLenght = `Cet login doit faire un minimum de 4 caractères`,
  PassLenght = `Cet mot de passe doit faire un minimum de 8 caractères`,
  Blacklist = `!?,#§^{}();:+|"°[]$%`,
  Invalide = '[Erreur]Cet option est invalide',
  MailExist = `Cet mail existe deja`,
  IsOptional = `Cet element est optionnelle`,
}