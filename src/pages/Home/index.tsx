import { useHistory } from 'react-router-dom';

import { auth, firebase } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import { FaGoogle } from 'react-icons/fa';
import { VscSignIn } from 'react-icons/vsc';

import styles from './style.module.scss';
import { Button } from '../../components/Button';

export function Home() {
  const history = useHistory();

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) => {
      console.log(result);

      history.push('/new-room');
    });
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
          <form>
            <input type="text" placeholder="Digite o codigo da sala" />
            <Button type="submit">
              Entrar na sala <VscSignIn />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
