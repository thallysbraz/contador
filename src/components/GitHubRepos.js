import React, { useState } from 'react';
import './GitHubRepos.css';

export default function GitHubRepos() {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch(e) {
        e.preventDefault();

        const trimmed = username.trim();
        if (!trimmed) {
            setError('Informe um nome de usuario.')
            setRepos([]);
            return;
        }

        setLoading(true);
        setError(null);
        setRepos([]);

        try {
            const response = await fetch(`https://api.github.com/users/${trimmed}/repos`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Usuario não encontrado no GitHub.')
                }
                throw new Error('erro ao buscar repositorios')
            }

            const data = await response.json();
            setRepos(data)
        } catch (error) {
            setError(error.message);
            setRepos([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="github">
            { }
            <form className="github__form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Digite o usuário do GitHub (ex.: facebook, vercel)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="github__input"
                />
                <button type="submit" className="github__button">
                    Buscar
                </button>
            </form>

            {/* Estados */}
            {loading && <p className="github__loading">Carregando repositórios...</p>}
            {error && <p className="github__error">{error}</p>}

            {!loading && !error && repos.length === 0 && username.trim() === '' && (
                <p className="github__hint">
                    Digite um nome de usuário do GitHub e clique em <strong>Buscar</strong>.
                </p>
            )}

            {!loading && !error && repos.length === 0 && username.trim() !== '' && (
                <p className="github__empty">
                    Nenhum repositório público encontrado para esse usuário.
                </p>
            )}

            {/* Lista de repositórios */}
            {!loading && !error && repos.length > 0 && (
                <div className="github__results">
                    <h3 className="github__title">
                        Repositórios de: {username.trim()}
                    </h3>

                    <ul className="github__list">
                        {repos.map((repo) => (
                            <li key={repo.id} className="github__item">
                                <div className="github__item-header">
                                    <strong className="github__repo-name">{repo.name}</strong>
                                    {repo.language && (
                                        <span className="github__language">{repo.language}</span>
                                    )}
                                </div>

                                {repo.description && (
                                    <p className="github__description">{repo.description}</p>
                                )}

                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="github__link"
                                >
                                    Ver no GitHub
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
