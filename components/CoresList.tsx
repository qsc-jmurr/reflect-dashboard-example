import { Core, getStatusColor, formatUptime } from '@/lib/api';

interface CoreCardProps {
  core: Core;
}

export function CoreCard({ core }: CoreCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{core.name}</h3>
          <p className="text-sm text-gray-600">{core.model} - {core.modelNumber}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(core.status.code)}`}>
          {core.status.message}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Serial Number</p>
          <p className="font-medium">{core.serialNumber || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500">Firmware</p>
          <p className="font-medium">{core.firmware}</p>
        </div>
        <div>
          <p className="text-gray-500">Site</p>
          <p className="font-medium">{core.site.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Uptime</p>
          <p className="font-medium">{formatUptime(core.uptime)}</p>
        </div>
        <div>
          <p className="text-gray-500">Access Mode</p>
          <p className="font-medium capitalize">{core.accessMode}</p>
        </div>
        {core.redundancy && (
          <div>
            <p className="text-gray-500">Redundancy</p>
            <p className="font-medium">{core.redundancy.role} - {core.redundancy.state}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface CoresListProps {
  cores: Core[];
  loading: boolean;
  error: string | null;
}

export function CoresList({ cores, loading, error }: CoresListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-2">Error loading cores</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (cores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No cores found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cores.map((core) => (
        <CoreCard key={core.id} core={core} />
      ))}
    </div>
  );
}