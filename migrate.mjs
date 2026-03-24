import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, 'prisma', 'migrations');
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('DATABASE_URL not set in .env');
  process.exit(1);
}

try {
  // Run migrations using DATABASE_URL
  process.env.DATABASE_URL = dbUrl;
  const result = execSync('npx prisma migrate deploy', {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: dbUrl }
  });
  console.log('Migrations applied successfully');
} catch (error) {
  console.error('Error running migrations:', error.message);
  process.exit(1);
}
