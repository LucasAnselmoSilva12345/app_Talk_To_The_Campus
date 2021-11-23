import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';

import { FaGoogle } from 'react-icons/fa';
import { VscSignIn } from 'react-icons/vsc';

import illustrationImg from '../../assets/images/illustration.svg';
import styles from './style.module.scss';
import { database } from '../../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/new-room');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      alert('Digite o código da sala');
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Essa sala não existe.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id={styles.pageAuth}>
      <aside>
        <img src={illustrationImg} alt="Ilustração de uma conversa via chat" />
        <strong>Toda pergunta precisa de uma resposta</strong>
        <p>Tire as dúvidas de seus espectadores ao vivo</p>
      </aside>
      <main>
        <div className={styles.mainContent}>
          <h2>Talk To The Campus</h2>
          <button onClick={handleCreateRoom} className={styles.createRoom}>
            <FaGoogle />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala <VscSignIn />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
