import React, { useState } from 'react';
import Counter from './components/Counter';
import GitHubRepos from './components/GitHubRepos';

function App() {
  const [page, setPage] = useState('counter');
  return (
    <div className='App'>
      <h1>Meu primeiro projeto react</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setPage('counter')} style={{ marginRight: 8 }}>
          Pagina do contador
        </button>
        <button onClick={() => setPage('github')}>
          Pagina do Github repositorios
        </button>
      </div>

      {/* renderizacao condicional */}

      {page === 'counter' && (
        <>
          <h2>Contador</h2>
          <Counter />
        </>
      )}

      {page === 'github' && (
        <>
          <h2>Buscar repositorios de um usuario do github</h2>
          <GitHubRepos />
        </>
      )}
    </div>
  );
}

export default App;
