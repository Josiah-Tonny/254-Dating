import { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PreferencesPage() {
  const session = await getServerSession(authOptions);

  const [preferences, setPreferences] = useState({
    gender: "",
    age: "",
    distance: "",
    connections: [],
    bodyType: "",
    height: "",
    languages: [],
    orientation: "",
    ethnicity: "",
    religion: "",
    politicalViews: "",
    education: [],
    employment: "",
    astrologySign: "",
    lifestyle: {
      alcohol: false,
      smoking: false,
      marijuana: false,
    },
    family: {
      hasPets: false,
      hasKids: false,
      wantsKids: false,
    },
  });

  const handleCheckboxChange = (category, value) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session.user.id, preferences }),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Set Your Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Gender:</label>
          <input type="text" value={preferences.gender} onChange={(e) => setPreferences({ ...preferences, gender: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Age:</label>
          <input type="number" value={preferences.age} onChange={(e) => setPreferences({ ...preferences, age: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Distance:</label>
          <input type="number" value={preferences.distance} onChange={(e) => setPreferences({ ...preferences, distance: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Connections:</label>
          <select multiple value={preferences.connections} onChange={(e) => handleCheckboxChange('connections', e.target.value)} className="input">
            <option value="New friends">New friends</option>
            <option value="Long-term">Long-term</option>
            <option value="Short-term">Short-term</option>
            <option value="Hookups">Hookups</option>
            <option value="One night stand">One night stand</option>
            <option value="Fun nights">Fun nights</option>
          </select>
        </div>
        <div>
          <label className="block">Body Type:</label>
          <input type="text" value={preferences.bodyType} onChange={(e) => setPreferences({ ...preferences, bodyType: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Height:</label>
          <input type="text" value={preferences.height} onChange={(e) => setPreferences({ ...preferences, height: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Languages:</label>
          <input type="text" value={preferences.languages} onChange={(e) => handleCheckboxChange('languages', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block">Orientation:</label>
          <input type="text" value={preferences.orientation} onChange={(e) => setPreferences({ ...preferences, orientation: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Preferred Ethnicity:</label>
          <input type="text" value={preferences.ethnicity} onChange={(e) => setPreferences({ ...preferences, ethnicity: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Religion:</label>
          <input type="text" value={preferences.religion} onChange={(e) => setPreferences({ ...preferences, religion: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Political Views:</label>
          <input type="text" value={preferences.politicalViews} onChange={(e) => setPreferences({ ...preferences, politicalViews: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Education:</label>
          <input type="text" value={preferences.education} onChange={(e) => handleCheckboxChange('education', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block">Employment:</label>
          <input type="text" value={preferences.employment} onChange={(e) => setPreferences({ ...preferences, employment: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Astrology Sign:</label>
          <input type="text" value={preferences.astrologySign} onChange={(e) => setPreferences({ ...preferences, astrologySign: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block">Lifestyle:</label>
          <div>
            <label><input type="checkbox" checked={preferences.lifestyle.alcohol} onChange={() => setPreferences({ ...preferences, lifestyle: { ...preferences.lifestyle, alcohol: !preferences.lifestyle.alcohol } })} /> Alcohol</label>
            <label><input type="checkbox" checked={preferences.lifestyle.smoking} onChange={() => setPreferences({ ...preferences, lifestyle: { ...preferences.lifestyle, smoking: !preferences.lifestyle.smoking } })} /> Smoking</label>
            <label><input type="checkbox" checked={preferences.lifestyle.marijuana} onChange={() => setPreferences({ ...preferences, lifestyle: { ...preferences.lifestyle, marijuana: !preferences.lifestyle.marijuana } })} /> Marijuana</label>
          </div>
        </div>
        <div>
          <label className="block">Family:</label>
          <div>
            <label><input type="checkbox" checked={preferences.family.hasPets} onChange={() => setPreferences({ ...preferences, family: { ...preferences.family, hasPets: !preferences.family.hasPets } })} /> Has Pets</label>
            <label><input type="checkbox" checked={preferences.family.hasKids} onChange={() => setPreferences({ ...preferences, family: { ...preferences.family, hasKids: !preferences.family.hasKids } })} /> Has Kids</label>
            <label><input type="checkbox" checked={preferences.family.wantsKids} onChange={() => setPreferences({ ...preferences, family: { ...preferences.family, wantsKids: !preferences.family.wantsKids } })} /> Wants Kids</label>
          </div>
        </div>
        <button type="submit" className="btn">Save Preferences</button>
      </form>
    </div>
  );
}
