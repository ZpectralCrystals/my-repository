import React, { useEffect, useState, PropsWithChildren } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

// Basic Loading Indicator
const LoadingIndicator: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <p>Loading session...</p>
  </div>
);

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Included as per example, though Navigate component is used for redirection

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error && mounted) {
          console.error('Error getting session:', error.message);
          // Potentially handle error, e.g. by setting an error state
        }
        if (mounted) {
          setSession(initialSession);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) {
          console.error('Exception in getInitialSession:', e);
          setLoading(false); // Ensure loading stops even on exception
        }
      }
    }

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (mounted) {
          setSession(newSession);
          // If getInitialSession hasn't finished, newSession might trigger loading false too soon.
          // However, getInitialSession sets loading to false, so this should be fine.
          // If newSession is null (logout), we want loading to be false to trigger redirect.
          if (loading && newSession !== undefined) { // if still loading and receive an auth event
             setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []); // No dependencies needed as navigate is not used within useEffect for redirection here

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
