// Types for the API responses
export interface Core {
  id: number;
  serial: string;
  serialNumber: string | null;
  name: string;
  model: string;
  modelNumber: string;
  firmware: string;
  accessMode: string;
  accessLevel: number;
  uptime: number;
  status: {
    code: number;
    message: string;
    details: string;
  };
  redundancy: {
    role: string;
    state: string;
  } | null;
  site: {
    id: number;
    name: string;
  };
}

export interface System {
  id: number;
  code: string;
  name: string;
  status: {
    code: number;
    message: string;
    details: {
      items: {
        normal: number;
        warning: number;
        fault: number;
        unknown: number;
      };
    } | null;
  };
  design: {
    id: number;
    code: string;
    name: string;
    platform: string;
    isRedundant: number;
    isEmulated: number;
    uptime: number;
  };
  core: {
    id: number;
    name: string;
  };
}

// API service class
class ReflectApiService {
  private async fetchFromApi(endpoint: string): Promise<Response> {
    const response = await fetch(`/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }

    return response;
  }

  async getCores(): Promise<Core[]> {
    try {
      const response = await this.fetchFromApi('/cores');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cores:', error);
      throw error;
    }
  }

  async getSystems(): Promise<System[]> {
    try {
      const response = await this.fetchFromApi('/systems');
      return await response.json();
    } catch (error) {
      console.error('Error fetching systems:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const reflectApi = new ReflectApiService();

// Helper functions
export function getStatusColor(statusCode: number): string {
  switch (statusCode) {
    case 0:
    case 2:
    case 3:
      return 'text-green-600 bg-green-100';
    case 4:
      return 'text-yellow-600 bg-yellow-100';
    case 7:
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function formatUptime(uptimeMs: number): string {
  const seconds = Math.floor(uptimeMs / 1000);
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}