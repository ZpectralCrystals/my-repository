import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Adjusted path
import { Button } from '../ui/button'; // Adjusted path

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
        // Optionally, show a toast or alert to the user
      }
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out (catch block):', error);
      // Optionally, show a toast or alert
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div>
          <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/admin/productos" 
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/categorias" 
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/promociones" 
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Promociones
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto"> {/* Pushes logout button to the bottom */}
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
