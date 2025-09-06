A modern full-stack e-commerce application built with Next.js 15, Shopify and AI integration. This project features an intelligent shopping assistant powered by vector search and natural language processing.

## 🚀 Features

### Core E-commerce

- **Product Catalog**: Browse products with detailed information, images, and variants
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: Complete customer account management
- **Collections**: Organized product categories and collections
- **Search**: Advanced product search functionality
- **Favorites**: Save products for later purchase

### AI-Powered Assistant

- **Intelligent Chat**: AI assistant that understands product queries
- **Vector Search**: Semantic search through product catalog using Pinecone
- **Context-Aware Responses**: AI provides relevant product recommendations
- **Real-time Streaming**: Live chat responses using AI SDK

### Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Custom UI components with Radix UI
- **Smooth Animations**: Enhanced user experience with transitions
- **Accessibility**: WCAG compliant design patterns

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React 19** - Latest React features

### Backend & Services

- **Shopify Storefront API** - E-commerce backend
- **GraphQL** - Data fetching and mutations
- **Next.js API Routes** - Serverless functions

### AI & Search

- **AI SDK** - AI integration framework
- **Groq** - Fast AI model inference
- **Pinecone** - Vector database for semantic search
- **LangChain** - Document processing and chunking

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Shopify store with Storefront API access
- Pinecone account for vector search
- Groq API key for AI functionality

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Shopify Configuration
Shopify_STORE_DOMAIN=https://your-store.myshopify.com
Shopify_Storefront_Access_Token=your_storefront_token
SHOPIFY_REVALIDATION_SECRET=your_revalidation_secret
LIVE_STORE_DOMAIN=https://your-domain.com

# AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Vector Database
PINECONE_PRODUCTS_COLLECTIONS_INDEX_NAME=your_products_index
PINECONE_STORE_INDEX_NAME=your_store_index

# Environment
NODE_ENV=development
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/shopify-nextjs.git
   cd shopify-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
shopify-nextjs/
├── app/                          # Next.js App Router
│   ├── (storefront)/            # Storefront pages
│   │   ├── products/            # Product pages
│   │   ├── collections/         # Collection pages
│   │   ├── account/             # User account pages
│   │   └── search/              # Search functionality
│   ├── api/                     # API routes
│   │   ├── chat/                # AI chat endpoint
│   │   └── revalidate/          # Cache revalidation
│   └── actions/                 # Server actions
├── components/                   # React components
│   ├── chat/                    # AI chat components
│   ├── layout/                  # Layout components
│   ├── shared/                  # Shared components
│   └── ui/                      # UI component library
├── lib/                         # Utility libraries
│   ├── ai/                      # AI utilities
│   └── shopify/                 # Shopify integration
├── services/                    # Business logic services
├── contexts/                    # React contexts
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
└── constants/                   # Application constants
```

## 🔧 Key Features Implementation

### AI Chat System

The AI assistant uses a sophisticated pipeline:

1. **Intent Classification** - Determines user intent (general, product search, store info)
2. **Vector Search** - Retrieves relevant product information from Pinecone
3. **Context Building** - Combines search results with system prompts
4. **Streaming Response** - Delivers real-time AI responses

### Shopify Integration

- **GraphQL Queries** - Efficient data fetching
- **Storefront API** - Customer-facing e-commerce operations
- **Real-time Updates** - Cart and inventory synchronization
- **Image Optimization** - Next.js image optimization for product photos

### Vector Search

- **Document Chunking** - Products and collections are split into searchable chunks
- **Metadata Enrichment** - Rich metadata for better search results
- **Semantic Search** - Natural language product discovery

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Built with ❤️ by [Rahul Puri](https://www.linkedin.com/in/rahulpuri02)**
