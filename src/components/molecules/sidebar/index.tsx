import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { HiArrowCircleLeft, HiHome } from 'react-icons/hi';

import styles from './styles.module.scss';

interface User {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
}

const SideBar = (): JSX.Element => {
  const [userName, setUserName] = useState<string | undefined>('');
  const [statusResponse, setStatusResponse] = useState<number>();
  const [repositories, setRepositories] = useState<User>();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setUserName(params.name);
    axios
      .get(`https://api.github.com/users/${userName}`, {
        validateStatus: function (status) {
          setStatusResponse(status);
          console.log(statusResponse);
          return status < 400;
        },
      })
      .then(({ data }) => {
        setRepositories(data);
      });
  }, [params.name, params.repo, statusResponse, userName]);

  return (
    <>
      <div className={styles.sidebar}>
        {statusResponse === 404 ? (
          <p>cant fetch any data</p>
        ) : (
          <div className={styles.content}>
            <div className={styles.containerUserImage}>
              <img
                className={styles.userImage}
                src={repositories?.avatar_url}
                alt='user'
              />
            </div>
            <h2 className={styles.text}>{repositories?.name}</h2>
            <p className={styles.text}>{repositories?.login}</p>
            <p className={styles.text}>{repositories?.bio}</p>
          </div>
        )}
        <div className={styles.line}></div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            <HiArrowCircleLeft />
          </button>
          <button className={styles.button} onClick={() => navigate('./')}>
            <HiHome />
          </button>
        </div>
      </div>
    </>
  );
};

export { SideBar };
