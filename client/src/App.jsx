import { useEffect, useState } from 'react';
import supabase from './lib/supabase';

function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      const { count, error } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true });

      if (!error) setCount(count);
    }
    fetchCount();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Supabase connected!</h1>
      {count !== null && <p>Total tasks in DB: {count}</p>}
    </div>
  );
}

export default App;
