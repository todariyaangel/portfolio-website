'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [section, setSection] = useState('projects');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can connect a database later; for now, it saves locally to your browser state/console
    console.log(`Saved new ${section}:`, { title, description });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold">Owner Control Panel</h1>
        <a href="/" className="text-sm text-zinc-400 hover:text-white">← Back to Portfolio</a>
      </div>

      <div className="flex gap-2 mb-6">
        {['projects', 'education', 'skills', 'certifications'].map((sec) => (
          <button 
            key={sec} 
            onClick={() => setSection(sec)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize ${section === sec ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
          >
            {sec}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-semibold capitalize">Add New {section}</h2>
        {success && <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs rounded-lg">Successfully saved entry!</div>}
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Title / Name</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none"
            placeholder="e.g., Advanced ML Research"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Description / Details</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            rows={4}
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none"
            placeholder="Write details about this entry..."
          />
        </div>
        <button type="submit" className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-zinc-200 transition">
          Publish to Website
        </button>
      </form>
    </div>
  );
}