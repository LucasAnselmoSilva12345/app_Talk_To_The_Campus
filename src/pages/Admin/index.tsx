import { useParams, useHistory, Link } from 'react-router-dom';

import { UseRoom } from '../../hooks/useRoom';

import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import logoImg from '../../assets/images/logoRooms.svg';

import '../../styles/rooms.scss';
import { database } from '../../services/firebase';
import { VscSignOut } from 'react-icons/vsc';
import {
  AiOutlineCheckCircle,
  AiOutlineComment,
  AiOutlineDelete,
} from 'react-icons/ai';

type RoomParams = {
  id: string;
};

export function Admin() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = UseRoom(roomId);

  console.log(questions);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <button className="buttonHandleEndRoom" onClick={handleEndRoom}>
            Encerrar sala <VscSignOut />
          </button>
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
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <AiOutlineCheckCircle />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <AiOutlineComment />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <AiOutlineDelete />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
