import { Core, System } from '@/lib/api';

interface StatsProps {
  cores: Core[];
  systems: System[];
}

export function DashboardStats({ cores, systems }: StatsProps) {
  const coreStats = {
    total: cores.length,
    running: cores.filter(core => core.status.code === 2).length,
    offline: cores.filter(core => core.status.code === 7).length,
    idle: cores.filter(core => core.status.code === 0).length,
  };

  const systemStats = {
    total: systems.length,
    running: systems.filter(system => system.status.code === 2 || system.status.code === 0 || system.status.code === 3).length,
    offline: systems.filter(system => system.status.code === 7).length,
    initializing: systems.filter(system => system.status.code === 4).length,
  };

  const totalComponents = systems.reduce((sum, system) => {
    if (system.status.details?.items) {
      const items = system.status.details.items;
      return sum + items.normal + items.warning + items.fault + items.unknown;
    }
    return sum;
  }, 0);

  const totalFaults = systems.reduce((sum, system) => {
    return sum + (system.status.details?.items?.fault || 0);
  }, 0);

  const totalWarnings = systems.reduce((sum, system) => {
    return sum + (system.status.details?.items?.warning || 0);
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Cores Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cores</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-600">{coreStats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Running:</span>
            <span className="font-semibold text-green-600">{coreStats.running}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">Offline:</span>
            <span className="font-semibold text-red-600">{coreStats.offline}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-600">Idle:</span>
            <span className="font-semibold text-yellow-600">{coreStats.idle}</span>
          </div>
        </div>
      </div>

      {/* Systems Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Systems</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-600">{systemStats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Running:</span>
            <span className="font-semibold text-green-600">{systemStats.running}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">Offline:</span>
            <span className="font-semibold text-red-600">{systemStats.offline}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-600">Initializing:</span>
            <span className="font-semibold text-blue-600">{systemStats.initializing}</span>
          </div>
        </div>
      </div>

      {/* Component Health */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Health</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Components:</span>
            <span className="font-semibold text-gray-600">{totalComponents}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">Faults:</span>
            <span className="font-semibold text-red-600">{totalFaults}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-600">Warnings:</span>
            <span className="font-semibold text-yellow-600">{totalWarnings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Healthy:</span>
            <span className="font-semibold text-green-600">
              {totalComponents - totalFaults - totalWarnings}
            </span>
          </div>
        </div>
      </div>

      {/* System Health Percentage */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Health</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {totalComponents > 0 
              ? Math.round(((totalComponents - totalFaults - totalWarnings) / totalComponents) * 100)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Systems Healthy</div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Cores Online</span>
            <span>{cores.length > 0 ? Math.round((coreStats.running / cores.length) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${cores.length > 0 ? (coreStats.running / cores.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}