export default defineEventHandler((event) => {

  let healthcheck: HealthCheck;

  try {
    healthcheck = {
      status: 'OK',
      timestamp: Date.now(),
    };

    event.node.res.statusCode = 200;
  } catch (error) {
    const typedError = error as Error;

    healthcheck = {
      status: 'ERROR',
      message: typedError?.message || 'Unexpected error occurred during health check',
      timestamp: Date.now(),
    };

    event.node.res.statusCode = 503;
  }

  return healthcheck;
});

interface HealthCheck {
  status: 'OK' | 'ERROR';
  timestamp: number;
  message?: string;
}
