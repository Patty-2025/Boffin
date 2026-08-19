import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'template';
  url: string;
}

export default function LearningResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'resources'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Resource[];
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Learning Resources</h1>
        
        {loading ? (
          <div className="text-slate-500">Loading resources...</div>
        ) : resources.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
            No resources available currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map(res => (
              <a 
                key={res.id} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all"
              >
                <h3 className="font-bold text-lg text-slate-900">{res.title}</h3>
                <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded">{res.type}</span>
              </a>
            ))}
          </div>
        )}
      </div>
  );
}
