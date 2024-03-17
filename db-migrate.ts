import { execSync } from 'child_process';
import { config as testConfig } from './configs/test.config.ts';
import { config as prodConfig } from './configs/prod.config.ts';

/**
 * This script is used to migrate the database for production and test environments.
 * To be used when schema is changed.
 * This script create the migration SQL scripts and apply them to dev.db and test.db.
 */

execSync(`DATABASE_URL="${prodConfig.databaseUrl}" npx prisma migrate dev --name update`, {
  stdio: 'inherit',
});
execSync(
  `DATABASE_URL="${testConfig.databaseUrl}" npx prisma migrate reset --force --skip-generate`,
  {
    stdio: 'inherit',
  },
);
