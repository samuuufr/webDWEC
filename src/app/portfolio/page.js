import CryptoPortfolio from '@/app/components/CryptoPortfolio';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <CryptoPortfolio />
      </div>
    </div>
  );
}