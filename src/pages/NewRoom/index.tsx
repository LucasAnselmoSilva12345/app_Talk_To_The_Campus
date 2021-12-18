// import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';

import { VscSignIn } from 'react-icons/vsc';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logoImg.svg';

import '../../styles/home_newRoom.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      alert('Por favor, digite um nome para sua sala');
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="pageAuth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de uma conversa via chat" />
        <strong>Toda pergunta precisa de uma resposta</strong>
        <p>Tire as dúvidas de seus espectadores ao vivo</p>
      </aside>
      <main>
        <div className="mainContent">
          <img src={logoImg} alt="Talk to the Campus" />
          <h4>Crie uma nova sala</h4>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o título da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala <VscSignIn />
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
