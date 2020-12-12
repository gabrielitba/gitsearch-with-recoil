// Depedencies
import { useRecoilValue } from 'recoil';
import { gitUserState } from '../../atoms/gitUserState';
import { hasUsers } from '../../atoms/hasUsers';

// CSS
import './styles.css';

// Component
export default function Card() {
  const dateFromApi = useRecoilValue(gitUserState);
  const hasUser = useRecoilValue(hasUsers);

  return (
    <div className="cards">
      {hasUser
        ? dateFromApi.map((user) => (
            <ul key={user.id}>
              <span className="Head">
                <img src={user.avatar_url} alt="" />
                <h2>{user.name}</h2>
              </span>
              <li>
                <p>Localização:</p> <small>{user.location}</small>
              </li>
              <li>
                <p>Tipo:</p> <small>{user.type}</small>
              </li>
              <li>
                <p>Repositórios: </p> <small>{user.public_repos}</small>
              </li>
              <li>
                <p>E-mail: </p> <small>{user.email}</small>
              </li>
              <li>
                <p>Criado em: </p>
                <small>{user.created_at.split('T')[0]}</small>
              </li>
              <li>
                <p>Atualizado em: </p>
                <small>{user.updated_at.split('T')[0]}</small>
              </li>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <button className="acessar">Exibir no Github</button>
              </a>
            </ul>
          ))
        : null}
    </div>
  );
}
