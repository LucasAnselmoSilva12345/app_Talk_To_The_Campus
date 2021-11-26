// import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

// import { useAuth } from '../../hooks/useAuth';
import { UseRoom } from '../../hooks/useRoom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import styles from '../../styles/rooms.module.scss';

type RoomParams = {
  id: string;
};

export function Admin() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = UseRoom(roomId);
  return (
    <div id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <Button>Encerrar sala</Button>
          <h2>Talk To The Campus</h2>
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala de {title}</h1>
          {questions.length > 0 && <span>{questions.length} dúvida(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
