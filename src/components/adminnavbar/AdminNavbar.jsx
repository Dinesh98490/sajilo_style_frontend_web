import React from 'react';
import { Bell, Search, MoreVertical } from 'lucide-react';
import { Input } from '../landingpagecomponents/herosection/ui/input';
import { Button } from '../landingpagecomponents/herosection/ui/button';


// admin navbar 
function AdminNavbar() {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-80 bg-gray-50 border-gray-200"
            />
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JS</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
