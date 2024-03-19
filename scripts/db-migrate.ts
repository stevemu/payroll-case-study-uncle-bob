import { execSync } from 'child_process';
import { config as testConfig } from '../configs/test.config.ts';
import { config as prodConfig } from '../configs/prod.config.ts';

/**
 * This script is used to migrate the database for production and test environments.
 * To be used when schema is changed.
 * This script create the migration SQL scripts and apply them to dev.db and test.db and product updated prisma client in node_modules.
 */

// create sql migration scripts, generate prisma client and apply the migration to dev.db
execSync(`DATABASE_URL="${prodConfig.databaseUrl}" npx prisma migrate dev --name update`, {
  stdio: 'inherit',
});

// apply generated sql migration scripts to test.db
execSync(
  `DATABASE_URL="${testConfig.databaseUrl}" npx prisma migrate reset --force --skip-generate`,
  {
    stdio: 'inherit',
  },
);
