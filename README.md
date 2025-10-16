# QSC Reflect Dashboard

A modern, responsive dashboard for monitoring QSC Reflect systems and cores built with Next.js and Tailwind CSS.

## Features

- **Real-time Monitoring**: Auto-refreshing dashboard that polls the QSC Reflect API every 30 seconds
- **Core Management**: View all Q-SYS cores with status, uptime, firmware versions, and site information
- **System Overview**: Monitor system health, component status, and design information
- **Statistics Dashboard**: Quick overview with health metrics and status summaries
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface built with Tailwind CSS

## API Endpoints

The dashboard connects to the QSC Reflect API through Next.js API routes to avoid CORS restrictions:

- **Local Proxy Routes**:
  - `GET /api/cores` - Proxies requests to QSC Reflect `/cores` endpoint
  - `GET /api/systems` - Proxies requests to QSC Reflect `/systems` endpoint

- **External QSC Reflect API**:
  - **Cores**: `GET /cores` - Retrieves all Q-SYS cores with their status and configuration
  - **Systems**: `GET /systems` - Retrieves all systems with their health status and component information

The Next.js API routes act as a proxy to bypass CORS restrictions that prevent direct browser calls to the QSC Reflect API.

## Setup

1. **Clone the repository** (or create the project):
   ```bash
   npx create-next-app@latest reflect-dashboard-example --typescript --tailwind --eslint --app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your QSC Reflect Bearer token:
   ```env
   NEXT_PUBLIC_REFLECT_BASE_URL=https://reflect.qsc.com/api/public/v0
   REFLECT_BEARER_TOKEN=your_actual_bearer_token_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the dashboard**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── cores/route.ts    # API proxy for cores endpoint
│   │   └── systems/route.ts  # API proxy for systems endpoint
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # App layout wrapper
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── CoresList.tsx        # Component for displaying cores
│   ├── SystemsList.tsx      # Component for displaying systems
│   └── DashboardStats.tsx   # Statistics overview component
├── hooks/
│   └── useReflectData.ts    # Custom hook for API polling
├── lib/
│   └── api.ts               # API service and type definitions
├── .env.local               # Environment variables (create from .env.example)
└── .env.example             # Example environment configuration
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_REFLECT_BASE_URL`: The base URL for the QSC Reflect API (default: https://reflect.qsc.com/api/public/v0)
- `REFLECT_BEARER_TOKEN`: Your QSC Reflect API Bearer token (required)

### Polling Interval

The dashboard automatically refreshes every 30 seconds. You can modify this in the `useReflectData` hook by changing the `pollingInterval` parameter in `app/page.tsx`:

```typescript
const { cores, systems, loading, error, lastUpdated, refresh } = useReflectData(60000); // 60 seconds
```

## Data Models

### Core
Each core object contains:
- Basic info (id, name, model, serial number)
- Status (running, offline, idle)
- Firmware version and uptime
- Site information
- Access mode and redundancy configuration

### System
Each system object contains:
- System identification and design information
- Status with component health breakdown
- Core association
- Platform and uptime information

## Features in Detail

### Dashboard Statistics
- Total cores and systems count
- Status breakdown (running, offline, idle, initializing)
- Component health overview
- Overall system health percentage

### Core Monitoring
- Visual status indicators with color coding
- Uptime formatting (days, hours, minutes)
- Serial number and firmware tracking
- Site and redundancy information

### System Health
- Component status breakdown (normal, warning, fault, unknown)
- Design and platform information
- Real-time status monitoring

### Auto-refresh
- Configurable polling interval
- Visual indicators for refresh status
- Manual refresh capability
- Last updated timestamp

## Technology Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Custom hooks for state management
- **QSC Reflect API**: Real-time Q-SYS monitoring data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Security

- Bearer token authentication for API access
- Environment variables for sensitive data
- HTTPS-only communication with QSC Reflect API

## Development

### Adding New Features

1. Create new components in the `components/` directory
2. Add API service functions in `lib/api.ts`
3. Update TypeScript types as needed
4. Add appropriate styling with Tailwind CSS

### Error Handling

The dashboard includes comprehensive error handling:
- API request failures are displayed to users
- Loading states during data fetching
- Fallback UI for empty data states

## License

This project is provided as an example implementation. Check QSC's API terms of service for usage guidelines.

## Support

For issues related to:
- **QSC Reflect API**: Contact QSC support
- **Dashboard Code**: Create an issue in this repository
