import { System, getStatusColor, formatUptime } from '@/lib/api';

interface SystemCardProps {
  system: System;
}

export function SystemCard({ system }: SystemCardProps) {
  const statusDetails = system.status.details?.items;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
          <p className="text-sm text-gray-600">{system.design.platform}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(system.status.code)}`}>
          {system.status.message}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Core</p>
            <p className="font-medium">{system.core.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Design</p>
            <p className="font-medium">{system.design.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Platform</p>
            <p className="font-medium">{system.design.platform}</p>
          </div>
          <div>
            <p className="text-gray-500">Uptime</p>
            <p className="font-medium">{formatUptime(system.design.uptime)}</p>
          </div>
        </div>

        {statusDetails && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Component Status</p>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="text-green-600 font-semibold text-lg">{statusDetails.normal}</div>
                <div className="text-gray-500">Normal</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 font-semibold text-lg">{statusDetails.warning}</div>
                <div className="text-gray-500">Warning</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-semibold text-lg">{statusDetails.fault}</div>
                <div className="text-gray-500">Fault</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 font-semibold text-lg">{statusDetails.unknown}</div>
                <div className="text-gray-500">Unknown</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <div className="flex justify-between">
            <span>System ID: {system.id}</span>
            <span>Design ID: {system.design.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SystemsListProps {
  systems: System[];
  loading: boolean;
  error: string | null;
}

export function SystemsList({ systems, loading, error }: SystemsListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-48"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, k) => (
                    <div key={k} className="text-center space-y-1">
                      <div className="h-6 bg-gray-300 rounded w-8 mx-auto"></div>
                      <div className="h-3 bg-gray-300 rounded w-12 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-2">Error loading systems</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (systems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No systems found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {systems.map((system) => (
        <SystemCard key={system.id} system={system} />
      ))}
    </div>
  );
}