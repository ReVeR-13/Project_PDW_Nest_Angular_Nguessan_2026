

export enum ApiCodeResponse {
  Test = 'Ceci est une erreur',
  Existe = 'Cet element existe deja',
  NotExiste = 'Cet element n existe pas',
  NotFound = 'Cet element n a pas été trouvé',
  UserNotFound = `Cet utilisateur n a pas été trouvé`,
  TokenNotFound = `Le token n a pas été trouvé`,
  TokenExpired = `Ce token est expiré`,
  ParametreErreur = 'Les parametres ne sont pas valide',
  Null = 'Cet element est null',
  Token_Generation_fail = 'Le token n est pas generé ...',
  Creation_fail = 'La creation de cet element à echoué ...',
  Update_fail = 'La mise à jour de cet element à echoué ...',
  Delete_fail = 'La suppression de cet element à echoué ...',
  Bad_Guard_Access = 'Mauvaise authentification de clef api...',
  payload_not_valid = 'Le payload n est pas valid',
  Common_success = `Succes general...`,
}



