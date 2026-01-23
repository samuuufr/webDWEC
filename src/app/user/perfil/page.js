import { User, Mail, Calendar, DollarSign } from 'lucide-react';

export default function Profile() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
      
      <div className="card bg-base-100 shadow-lg max-w-2xl">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar">
              <div className="w-20 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Crypto Trader</h2>
              <p className="text-gray-500">Premium Member</p>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">crypto.trader@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-semibold">January 2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Total portfolio value</p>
                <p className="font-semibold text-2xl">$45,280.50</p>
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-outline">View Stats</button>
          </div>
        </div>
      </div>
    </div>
  );
}