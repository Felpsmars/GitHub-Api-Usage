import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import axios from 'axios';
import { Commits } from '../../molecules';

interface Users {
  name: string;
  author: {
    login: string;
  };
  commit: {
    message: string;
  };
}

const CommitsPage = (): JSX.Element => {
  const [repositoryName, setRepositoryName] = useState<string | undefined>('');
  const [username, setUsername] = useState<string | undefined>('');
  const [statusResponse, setStatusResponse] = useState<number>();

  const [repositories, setRepositories] = useState<Users[]>([]);

  const params = useParams();

  useEffect(() => {
    setUsername(params.name);
    setRepositoryName(params.repo);
    axios
      .get(
        `https://api.github.com/repos/${username}/${repositoryName}/commits`,
        {
          headers: {
            Authorization: `token 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`,
          },
          validateStatus: function (status) {
            setStatusResponse(status);
            return status < 400;
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setRepositories(data);
      });
  }, [params, repositoryName, statusResponse, username]);

  return (
    <div className={styles.container}>
      <Commits statusResponse={statusResponse} repositories={repositories} />
    </div>
  );
};

export { CommitsPage };
