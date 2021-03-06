import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { UseRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { FcLike } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';

import logoImg from '../../assets/images/logoRooms.svg';

import '../../styles/rooms.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;

  const { questions, title } = UseRoom(roomId);

  async function handleCreateRoom() {
    await signInWithGoogle();
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error(
        'Você precisa estar logado na aplicação, para enviar suas dúvidas.'
      );
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Talk to the campus" />
          </Link>
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="roomTitle">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} dúvida(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você deseja saber sobre nôs?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="formFooter">
            {user ? (
              <div className="userInfo">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={handleCreateRoom}>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta <AiOutlineSend />
            </Button>
          </div>
        </form>

        <div className="questionsAsked">
          <h3>Perguntas já realizadas</h3>
        </div>
        <div className="questionList">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className="likeButton"
                    type="button"
                    aria-label="Marcar com gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <FcLike />
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
