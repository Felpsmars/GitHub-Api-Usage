import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Repositories } from '../../molecules';

import styles from './styles.module.scss';

interface Users {
  name: string;
  id: number;
}

const RepositoriesPage = (): JSX.Element => {
  const [repositories, setRepositories] = useState<Users[]>([]);
  const [userName, setUserName] = useState<string | undefined>('');
  const [statusResponse, setStatusResponse] = useState<number>();

  const params = useParams();

  useEffect(() => {
    setUserName(params.name);
    axios
      .get(`https://api.github.com/users/${userName}/repos`, {
        headers: {
          Authorization: `token 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`,
        },
        validateStatus: function (status) {
          setStatusResponse(status);
          console.log(statusResponse);
          return status < 400;
        },
      })
      .then(({ data }) => {
        console.log('logou');

        setRepositories(data);
      });
  }, [params.name, params.repo, statusResponse, userName]);

  return (
    <div className={styles.container}>
      <Repositories
        statusResponse={statusResponse}
        userName={userName}
        repositories={repositories}
      />
    </div>
  );
};

export { RepositoriesPage };
