import { ApiOperationOptions } from "@nestjs/swagger";

// [app.swagger.ts] app.swagger.ts

export class SwaggerController {
    static AppControllerHelloWorld: ApiOperationOptions = {
        summary: 'Operation Hello World',
        description: 'Cette operation est celle de base'
    }

    static SwaggerContactController: ApiOperationOptions = {
        summary: 'Contact crud',
        description: 'Operation sur les contacts'
    }
}

export class SwaggerGeneralController {
    //Contact
    static SwaggerAll: ApiOperationOptions = {
        summary: 'Afficher les elements',
        description: 'Operation sur les element'
    }

    static SwaggerUn: ApiOperationOptions = {
        summary: 'Rechercher un element',
        description: 'Operation sur les element'
    }
    static SwaggerId: ApiOperationOptions = {
        summary: 'Rechercher un element par Id',
        description: 'Operation sur les element'
    }
    static SwaggerNom: ApiOperationOptions = {
        summary: 'Rechercher un element par Nom',
        description: 'Operation sur les element'
    }
    static SwaggerCreer: ApiOperationOptions = {
        summary: 'Creer un element',
        description: 'Operation sur les element'
    }
    static SwaggerAdd: ApiOperationOptions = {
        summary: 'Ajouter un element à cet objet ',
        description: 'Operation sur les element'
    }
    static SwaggerAddVaccin: ApiOperationOptions = {
        summary: 'Ajouter un vaccin à cet element',
        description: 'Operation sur les element'
    }
    static SwaggerModifier: ApiOperationOptions = {
        summary: 'Modifier un element',
        description: 'Operation sur les element'
    }

    static SwaggerSupprimer: ApiOperationOptions = {
        summary: 'Supprimer un element',
        description: 'Operation sur les element'
    }

    static SwaggerConnexion: ApiOperationOptions = {
        summary: 'Se connecter',
        description: 'Se connecter à l api'
    }
}
