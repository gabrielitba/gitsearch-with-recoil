// Depedencies
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { gitUserState } from '../../atoms/gitUserState';
import { hasUsers } from '../../atoms/hasUsers';
import api from '../../services/api';

// CSS
import './styles.css';

// Component
export default function Input() {
  const setDateFromApi = useSetRecoilState(gitUserState);
  const setHasUser = useSetRecoilState(hasUsers);
  const githubUser = useRef();

  const fetchMyAPI = function fetchMyAPI() {
    const inputElement = document.querySelector('input[name="inputElement"]');
    const spanElement = document.querySelector('span');

    setHasUser(true);
    api
      .get(`${githubUser.current.value}`)
      .then((response) => {
        const { data } = response;
        setDateFromApi([data]);
        inputElement.classList.remove('fail');
        spanElement.classList.add('hidden');
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setHasUser(false);
          setDateFromApi([]);
          inputElement.classList.add('fail');
          spanElement.classList.remove('hidden');
        }
      });
  };

  return (
    <>
      <span className="hidden show">Usuário não encontrado!</span>
      <input
        className=""
        name="inputElement"
        type="text"
        placeholder="Digite para pesquisar..."
        ref={githubUser}
        onKeyDown={(event) => {
          if (event.key === 'Enter') fetchMyAPI();
        }}
      />
    </>
  );
}
