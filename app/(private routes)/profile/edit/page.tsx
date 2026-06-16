'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import css from './EditProfilePage.module.css';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const setUser = useAuthStore(
    (state) => state.setUser
    );
    
    // Initialize username from user to avoid setting state synchronously in an effect
    const [username, setUsername] = useState(() => user?.username ?? '');

    useEffect(() => {
      // If user updates and local username is empty (not edited), sync it.
      // Defer the state update to avoid calling setState synchronously within the effect.
      if (user?.username && username === '') {
        const t = setTimeout(() => setUsername(user.username), 0);
        return () => clearTimeout(t);
      }
    }, [user?.username, username]);

  async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const updatedUser = await updateMe({
                username,
            });

            setUser(updatedUser);

            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>
          Edit Profile
        </h1>

        {user && (
          <>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form
              onSubmit={handleSubmit}
              className={css.profileInfo}
            >
              <div
                className={css.usernameWrapper}
              >
                <label htmlFor="username">
                  Username:
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  className={css.input}
                />
              </div>

              <p>
                Email: {user.email}
              </p>

              <div className={css.actions}>
                <button
                  type="submit"
                  className={css.saveButton}
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      '/profile'
                    )
                  }
                  className={
                    css.cancelButton
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}