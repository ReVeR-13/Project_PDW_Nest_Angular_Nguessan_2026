// [swagger.configuration.ts] swagger.configuration.ts
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export class SwaggerConfiguration {

    static setup(app: INestApplication<any>) {

        const config = new DocumentBuilder()
            .setTitle('Animalerie API')
            .setDescription('App Animalerie documentation')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    description: 'Please enter token',
                    name: 'Authorization',
                    bearerFormat: 'Bearer',
                    scheme: 'Bearer',
                    type: 'http',
                    in: 'Header'
                },
                'access-token'
            ).build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document)
    }

}
