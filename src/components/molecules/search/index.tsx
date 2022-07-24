import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../atoms';

import styles from './styles.module.scss';

interface ISearch {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setUserName: (event: string) => void;
  userName: string;
  statusResponse: number | undefined;
}

const Search = ({
  onSubmit,
  setUserName,
  userName,
  statusResponse,
}: ISearch): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit(e);
          if (statusResponse) {
            navigate(`/repositories/${userName}`);
          }
        }}
      >
        <Container>
          <div className={styles.forms}>
            <label htmlFor='userName'>
              <h3>Enter your GitHub user name:</h3>
            </label>
            <input
              onChange={(event) => setUserName(event.target.value)}
              className={styles.userNameInput}
              id='userName'
              type='text'
              value={userName}
            />
            <button className={styles.btn} type='submit'>
              <span className={styles.searchText}>Search</span>
            </button>
            <div>{statusResponse === 404 && <p>User does not exist!</p>}</div>
          </div>
        </Container>
      </form>
    </div>
  );
};

export { Search };
