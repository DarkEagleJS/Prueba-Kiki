import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servicio  Sistema de Logistica Basico con Calculo de Tarifas';
  }
}
