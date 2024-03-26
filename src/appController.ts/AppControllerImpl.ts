import { AppController } from './AppController';

export class AppControllerImpl implements AppController {
  exit(): void {
    process.exit(1);
  }
}
