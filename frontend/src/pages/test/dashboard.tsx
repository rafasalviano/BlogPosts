import React from "react";

// A faithful, static mock that looks like a real page running at localhost:3000
// It mimics your /[slug]/dashboard screen with sections & disabled controls.
export default function FakeLocalhostDashboard() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-6">
      {/* Fake browser chrome */}
      <div className="w-[1100px] max-w-full shadow-2xl rounded-2xl overflow-hidden border border-neutral-200 bg-white">
        <div className="bg-neutral-200 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-3 w-3 rounded-full bg-red-400 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-400 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-400 inline-block" />
          </div>
          <div className="mx-3 text-xs text-neutral-600">localhost</div>
          <div className="flex-1">
            <div className="w-full rounded-md bg-white border border-neutral-300 px-3 py-1 text-sm font-mono text-neutral-700 truncate">
              http://localhost:3000/acme/dashboard
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8 bg-neutral-50">
          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 space-y-6">
              {/* Org Info */}
              <section className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Organization name: <span className="font-bold">Example Org</span></h1>
                <p>Organization slug: <span className="px-2 py-0.5 rounded bg-neutral-100 border font-mono text-xs">example-org</span></p>
                <p>Current user: <span className="px-2 py-0.5 rounded bg-neutral-100 border font-mono text-xs">user@example.com</span></p>
                <p>Current role: <span className="px-2 py-0.5 rounded bg-neutral-100 border font-mono text-xs">admin</span></p>
              </section>

              {/* Members */}
              <section className="pt-4 border-t">
                <h2 className="text-xl font-semibold">Members</h2>
                <ul className="mt-2 divide-y">
                  <li className="py-2 flex items-center justify-between">
                    <a className="text-sm hover:underline" href="#">[admin] alice@example.com (active)</a>
                    <button disabled className="text-xs text-red-500 opacity-40 cursor-not-allowed">Delete User</button>
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <a className="text-sm hover:underline" href="#">[editor] bob@example.com (invited)</a>
                  </li>
                </ul>
                {/* Invite form (visible if authorized) */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">Invite new member</h3>
                  <div className="flex gap-2 max-sm:flex-col">
                    <input className="border px-3 py-2 rounded-md flex-1" placeholder="your-coworker@example.com" />
                    <select className="border px-3 py-2 rounded-md">
                      <option>Set Role</option>
                      <option>editor</option>
                      <option>stytch_admin</option>
                    </select>
                    <button disabled className="px-4 py-2 rounded-md bg-blue-500 text-white opacity-40 cursor-not-allowed">Invite</button>
                  </div>
                </div>
              </section>

              {/* SSO Connections */}
              <section className="pt-4 border-t">
                <h2 className="text-xl font-semibold">SSO Connections</h2>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium">SAML</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li><a className="hover:underline" href="#">Okta (active)</a></li>
                      <li><a className="hover:underline" href="#">OneLogin (inactive)</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">OIDC</h3>
                    <p className="mt-2 text-sm text-neutral-600">No connections configured.</p>
                  </div>
                </div>

                {/* Create connection (visible if authorized) */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium">Create a new SSO Connection</h3>
                  <div className="flex gap-2 max-sm:flex-col">
                    <input className="border px-3 py-2 rounded-md flex-1" placeholder="SAML Display Name" />
                    <button disabled className="px-4 py-2 rounded-md bg-blue-500 text-white opacity-40 cursor-not-allowed">Create</button>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <label className="inline-flex items-center gap-2"><input type="radio" name="sso" defaultChecked disabled/> SAML</label>
                    <label className="inline-flex items-center gap-2"><input type="radio" name="sso" disabled/> OIDC</label>
                  </div>
                </div>
              </section>

              {/* Org TODOs */}
              <section className="pt-4 border-t">
                <h2 className="text-xl font-semibold">Organization TODOs</h2>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between bg-neutral-50 border rounded-md px-3 py-2">
                    <span className="text-sm">Setup billing</span>
                    <button disabled className="text-xs text-red-500 opacity-40 cursor-not-allowed">Delete Item</button>
                  </li>
                </ul>
                <div className="mt-4 flex gap-2 max-sm:flex-col">
                  <input className="border px-3 py-2 rounded-md flex-1" placeholder="New TODO" />
                  <button disabled className="px-4 py-2 rounded-md bg-blue-500 text-white opacity-40 cursor-not-allowed">Save</button>
                </div>
              </section>

              {/* Footer */}
              <section className="pt-4 border-t flex items-center justify-between">
                <a className="text-blue-600 hover:underline" href="/orgswitcher">Switch Organizations</a>
                <button disabled className="text-red-600 opacity-40 cursor-not-allowed">Log Out</button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 