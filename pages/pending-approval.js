import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function PendingApproval() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Get profile
      supabase
        .from('user_profiles')
        .select('full_name, approved')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.approved) {
            router.push('/');
          } else {
            setProfile(data);
          }
        });
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Layout title="Pending Approval" description="Your account is pending approval">
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
          <h1 className="mb-lg">Account Pending Approval</h1>

          <div className="card">
            {profile && (
              <p>Hi <strong>{profile.full_name}</strong>,</p>
            )}
            <p>
              Thank you for signing up for AI-AMP. Your account is currently under review.
            </p>
            <p>
              We review all new accounts to ensure AI-AMP is a good fit for your organization.
              You&apos;ll receive an email once your account has been approved.
            </p>
            <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
              This typically takes 1-2 business days.
            </p>
          </div>

          <div className="mt-xl">
            <button onClick={handleLogout} className="btn btn-secondary">
              Sign Out
            </button>
          </div>

          <p className="text-light mt-xl" style={{ fontSize: '0.9rem' }}>
            You&apos;ll receive an email when your account is approved.
          </p>
        </div>
      </section>
    </Layout>
  );
}
