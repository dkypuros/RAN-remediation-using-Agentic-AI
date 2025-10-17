/**
 * Type declarations for @nestjs/microservices
 */
declare module '@nestjs/microservices' {
  import { ModuleMetadata, Provider, Type } from '@nestjs/common';

  export enum Transport {
    TCP = 'TCP',
    REDIS = 'REDIS',
    NATS = 'NATS',
    MQTT = 'MQTT',
    GRPC = 'GRPC',
    RMQ = 'RMQ',
    KAFKA = 'KAFKA',
  }

  export interface GrpcOptions {
    package: string | string[];
    protoPath: string | string[];
    url?: string;
    credentials?: any;
    loader?: any;
    maxReceiveMessageLength?: number;
    maxSendMessageLength?: number;
  }

  export interface ClientOptions {
    transport: Transport;
    options?: any;
  }

  export interface ClientModuleOptions {
    name: string;
    transport: Transport;
    options?: any;
  }

  export interface ClientsModuleOptions extends Array<ClientModuleOptions> {}

  export interface ClientsProviderAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name: string;
    useFactory: (...args: any[]) => Promise<ClientOptions> | ClientOptions;
    inject?: any[];
  }

  export const ClientsModule: {
    register: (options: ClientsModuleOptions) => DynamicModule;
    registerAsync: (options: ClientsProviderAsyncOptions[]) => DynamicModule;
  };

  export interface DynamicModule extends ModuleMetadata {
    module: Type<any>;
  }
}
