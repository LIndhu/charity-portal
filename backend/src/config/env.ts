import dotenv from 'dotenv';

dotenv.config();

/* ========= REQUIRED ENV CHECK ========= */
const requiredVars = [
  'PORT',
  'JWT_SECRET',
  'MYSQL_URL',
  'ADMIN_SECURITY_CODE',
] as const;

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
});

/* ========= EXPORT ENV ========= */
export const env = {
  // Server
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET as string,

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',

  // Admin
  adminSecurityCode: process.env.ADMIN_SECURITY_CODE as string,

  // MySQL (Railway)
  mysqlUrl: process.env.MYSQL_URL as string,

  // SMTP (email)
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM,

  // Logs
  enableHttpLogs: process.env.ENABLE_HTTP_LOGS === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
};
