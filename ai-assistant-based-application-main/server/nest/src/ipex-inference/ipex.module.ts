import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IpexService } from './ipex.service';
import { IpexController } from './ipex.controller';
import { RagService } from './rag.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IPEX_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inference',
          protoPath: join(__dirname, '..', '..', 'src', 'ipex-inference', 'proto', 'inference.proto'),
          url: process.env.IPEX_SERVICE_URL || 'localhost:50051',
        },
      },
      {
        name: 'RAG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inference',
          protoPath: join(__dirname, '..', '..', 'src', 'ipex-inference', 'python', 'rag.proto'),
          url: process.env.RAG_SERVICE_URL || 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [IpexController],
  providers: [IpexService, RagService],
  exports: [IpexService, RagService],
})
export class IpexModule {}
