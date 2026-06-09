import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'home/app.module';
import { Infos } from 'home/index';
import { ConfigKey, configManager } from './api/common/config'
import { HttpExceptionFilter } from './api/common/config/exception'
import { SwaggerConfiguration } from './api/common/documentation'
import { ApiInterceptor } from './api/common/api/interceptor'

export const bootstrap = async () => {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL))
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      transformOptions:{ enableImplicitConversion:true},
      whitelist:true,
    })
  )

  app.useGlobalInterceptors(new ApiInterceptor());

  app.enableCors({
    origin:configManager.getValue(ConfigKey.ENABLE_ORIGINE),
    methods:'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders:'Content-type, Authorization',
  })
  
  SwaggerConfiguration.setup(app);

  await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT),10) ?? 3200);
  
  
}
bootstrap().then(():void =>{
  Infos.General();
})
