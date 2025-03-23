# Soar Finance Dashboard

A modern financial dashboard built with Next.js, showcasing best practices in web development and user interface design.

## Getting Started

### Requirements
- Node.js (version 20 or higher recommended)
- npm (version 10 or higher recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/teimurjan/soar-assessment.git
   cd soar-assessment
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Decisions

### Why Next.js?
- **Server-Side Rendering**: Improves initial page load and SEO
- **API Routes**: Enables backend functionality without separate server
- **File-based Routing**: Simplifies navigation structure
- **Built-in Optimizations**: Image optimization, code splitting, and more
- **TypeScript Support**: Enhanced type safety and developer experience

### Why shadcn/ui?
- **Accessibility**: Built on Radix UI primitives for WCAG compliance
- **Customization**: Tailwind CSS-based styling for easy theming
- **Component Architecture**: Well-structured, reusable components
- **Modern Design**: Clean, professional UI components
- **Developer Experience**: Easy to implement and maintain

### Data Flow
1. **API Routes**: Located in `app/api/`
   - Simulate backend endpoints
   - Generate mock data using Faker.js
   - TypeScript interfaces ensure type safety

2. **State Management**:
   - Redux Toolkit for predictable state updates
   - Async thunks for API calls
   - Type-safe actions and reducers

3. **Mock Data Generation**:
   - Faker.js creates realistic financial data
   - Consistent data structure through TypeScript interfaces
   - Easy to replace with real API endpoints

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix linting issues

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [Faker.js Guide](https://fakerjs.dev)

## Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
