# Project Structure & Architecture

## Directory Overview

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Root loading UI
│   ├── page.tsx                 # Home page (splash screen)
│   ├── location/                # Location selection page
│   │   └── page.tsx
│   ├── main/                    # Main weather display page
│   │   └── page.tsx
│   └── preference/              # User preference settings page
│       └── page.tsx
│
├── components/                   # Reusable UI components
│   ├── AnimatedContent.tsx      # Animation wrapper component
│   ├── button.tsx               # Button component
│   ├── dialog.tsx               # Dialog/Modal component
│   ├── field.tsx                # Form field wrapper
│   ├── input.tsx                # Input component
│   ├── label.tsx                # Label component
│   ├── layout.tsx               # Layout components
│   ├── loading.tsx              # Loading component
│   ├── separator.tsx            # Separator/Divider component
│   ├── spinner.tsx              # Spinner component
│   ├── tooltip.tsx              # Tooltip component
│   └── __tests__/               # Component tests
│       ├── button.test.tsx
│       ├── input.test.tsx
│       ├── label.test.tsx
│       ├── layout.test.tsx
│       └── spinner.test.tsx
│
├── configs/                      # Configuration files
│   ├── region_coords.json       # Region coordinates data
│   └── urls.tsx                 # API URLs and endpoints
│
├── containers/                   # Page-level container components
│   ├── Location/                # Location page containers
│   │   ├── LocationClientBlock.tsx
│   │   ├── LocationClientContainer.tsx
│   │   ├── LocationServerBlock.tsx
│   │   └── LocationServerContainer.tsx
│   ├── Main/                    # Main page containers
│   │   ├── MainClientBlock.tsx
│   │   ├── MainClientContainer.tsx
│   │   ├── MainServerBlock.tsx
│   │   └── MainServerContainer.tsx
│   ├── Preference/              # Preference page containers
│   │   ├── PreferenceClientBlock.tsx
│   │   ├── PreferenceClientContainer.tsx
│   │   ├── PreferenceServerBlock.tsx
│   │   └── PreferenceServerContainer.tsx
│   └── Splash/                  # Splash screen containers
│       ├── SplashClientBlock.tsx
│       ├── SplashClientContainer.tsx
│       ├── SplashServerBlock.tsx
│       └── SplashServerContainer.tsx
│
├── hooks/                        # Custom React hooks (empty)
│
├── lib/                          # Utility libraries
│   └── utils.ts                 # General utility functions
│
├── states/                       # State management
│   ├── location.tsx             # Location state
│   ├── preference.tsx           # Preference state
│   └── __tests__/               # State tests
│       ├── location.test.ts
│       └── preference.test.ts
│
├── types/                        # TypeScript type definitions
│   └── weather.d.ts             # Weather-related types
│
└── utils/                        # API utilities
    ├── requestAirApi.ts         # Air quality API requests
    ├── requestLocalApi.ts       # Local API requests
    ├── requestWeatherApi.ts     # Weather API requests
    └── __tests__/               # Utility tests
        ├── requestAirApi.test.ts
        ├── requestLocalApi.test.ts
        └── requestWeatherApi.test.ts
```

## Architecture Patterns

### Container Pattern

Each page follows a **Server/Client + Block/Container** structure:

- **ServerContainer**: Server-side data fetching
- **ServerBlock**: Server component rendering
- **ClientContainer**: Client-side state management
- **ClientBlock**: Client component rendering

### Separation of Concerns

- `/app`: Next.js routing and pages
- `/components`: Reusable, generic UI components
- `/containers`: Page-specific business logic
- `/states`: Global state management
- `/utils`: API communication layer
- `/configs`: Static configuration and data

---

## Project-Specific Rules

### Next.js App Router

- **Server Components by default** - Only use `'use client'` when necessary
- **Data fetching in ServerContainer** - Keep data fetching on the server
- **Client state in ClientContainer** - Manage client-side state separately
- **Pure rendering in Blocks** - ServerBlock/ClientBlock only handle rendering

### State Management (Zustand)

- **Global state in `/states`** - Define stores under states directory
- **Single responsibility** - Each store handles one domain (location, preference)
- **Selective subscriptions** - Use selectors to prevent unnecessary re-renders
- **Minimal state** - Keep only what needs to be global

### API Integration

- **Encapsulate in `/utils/request*.ts`** - All external API calls go here
- **Handle errors locally** - Each request function handles its own errors
- **Define types in `/types`** - API response types belong in types directory
- **No direct fetch in components** - Always use utility functions

### Styling

- **Tailwind utilities first** - Prefer utility classes over custom CSS
- **Minimal globals.css** - Keep custom styles to minimum
- **shadcn/ui in `/components`** - UI components from shadcn go here
- **Consistent spacing** - Use Tailwind spacing scale (4, 8, 12, 16...)

---

## Naming Conventions

### Files

- **Components**: PascalCase.tsx (`Button.tsx`, `Input.tsx`)
- **Utilities**: camelCase.ts (`requestWeatherApi.ts`)
- **Types**: camelCase.d.ts (`weather.d.ts`)
- **Tests**: `*.test.tsx` or `*.test.ts`

### Components

- **Server Components**: `[Feature]ServerContainer`, `[Feature]ServerBlock`
- **Client Components**: `[Feature]ClientContainer`, `[Feature]ClientBlock`
- **UI Components**: PascalCase (`Button`, `Input`, `Dialog`)

### Code Elements

- **React hooks**: `use[Name]` (`useLocation`, `useWeather`)
- **State stores**: `[name]Store` (`locationStore`, `preferenceStore`)
- **API functions**: `request[API]Api` (`requestWeatherApi`, `requestAirApi`)
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: PascalCase (`WeatherData`, `LocationState`)

---

## External API Guidelines

### Weather API (기상청 단기예보)

- **Rate limiting** - Consider caching if needed
- **Coordinate conversion** - Convert lat/lng to grid coordinates
- **Error fallback** - Provide fallback data on API failure
- **Response validation** - Verify data structure before use

### Kakao Local API

- **Environment variables** - Store API keys in env vars
- **Debounce searches** - Debounce address search input
- **Validate coordinates** - Always validate coordinate conversion results
- **Handle quota limits** - Gracefully handle API quota errors

### Error Handling Best Practices

- **Clear user messages** - Show meaningful errors to users
- **Retry with caution** - Only retry idempotent operations
- **Distinguish error types** - Separate network errors from data errors
- **Log for debugging** - Log errors for development troubleshooting

### API Response Caching

- **Weather data** - Cache for 30-60 minutes (updates hourly)
- **Location data** - Cache indefinitely (rarely changes)
- **User preferences** - Store locally, no caching needed
