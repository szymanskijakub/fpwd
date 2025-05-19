import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class AppController {
  constructor() {}

  @Get('/healthcheck')
  healthcheck() {
    return {
      status: 'ok',
    };
  }
}
