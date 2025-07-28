// API base URL - uses environment variable or defaults to localhost
// For Kubernetes deployment, set NEXT_PUBLIC_API_URL=http://backend-app-service:80
declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string;
  };
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; 