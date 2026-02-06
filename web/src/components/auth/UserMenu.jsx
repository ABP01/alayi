import { LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-8 rounded-full bg-primary flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <User className="w-5 h-5 text-primary-content" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50">
          <div className="p-3 border-b border-base-300">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-base-content/70">{user.email}</p>
          </div>

          <div className="py-1">
            <button className="w-full text-left px-3 py-2 hover:bg-base-200 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 hover:bg-base-200 text-error flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;