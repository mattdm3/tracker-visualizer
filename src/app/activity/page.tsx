'use client';

import { useEffect, useState } from 'react';
import ActivityCards from '../ActivityCards';
import NewActivityType from '../new-activity';
import supabaseBrowser from '../utils/supabase-browser';

export default function ActivityPage() {
  const [activities, setActivities] = useState(null);

  const getActivities = async () => {
    const { data } = await supabaseBrowser.from('activities').select('*');
    setActivities(data);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <NewActivityType />
      <div className="mt-3">
        <h3>Existing Activities</h3>
        <ActivityCards small activities={activities} />
      </div>
    </div>
  );
}
