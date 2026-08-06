import { useState } from 'react'
import { User, Lock, Globe } from 'lucide-react'
import Tabs from '../components/admin/Tabs'
import ProfileSettingsForm from '../components/admin/settings/ProfileSettingsForm'
import PasswordSettingsForm from '../components/admin/settings/PasswordSettingsForm'
import WebsiteSettingsForm from '../components/admin/settings/WebsiteSettingsForm'

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'password', label: 'Password', icon: Lock },
  { key: 'website', label: 'Website', icon: Globe },
]

/**
 * Settings page — tabbed container for Profile, Password, and Website
 * settings. Each tab's form is a fully independent component with its
 * own data fetching/submission, so switching tabs never mixes state.
 */
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your account and website preferences.
        </p>
      </div>

      <div className="mt-6">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'profile' && <ProfileSettingsForm />}
          {activeTab === 'password' && <PasswordSettingsForm />}
          {activeTab === 'website' && <WebsiteSettingsForm />}
        </div>
      </div>
    </div>
  )
}
