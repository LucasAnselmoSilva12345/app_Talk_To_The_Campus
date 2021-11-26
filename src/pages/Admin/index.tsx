// import { FormEvent, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// import { useAuth } from '../../hooks/useAuth';
import { UseRoom } from '../../hooks/useRoom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import deleteImg from '../../assets/images/delete.svg';

import styles from '../../styles/rooms.module.scss';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
};

export function Admin() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = UseRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <Button onClick={handleEndRoom}>Encerrar sala</Button>
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
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
