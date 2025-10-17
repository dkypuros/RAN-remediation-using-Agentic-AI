import { NestFactory } from '@nestjs/core';
import { IpexModule } from './ipex-inference/ipex.module';

async function bootstrap() {
  const app = await NestFactory.create(IpexModule);
  await app.listen(3000); // Different port from Next.js (3001) and gRPC server (50051)
  console.log('NestJS server running on port 3000');
}

bootstrap().catch(console.error);
