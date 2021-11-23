// import { useAuth } from '../../hooks/useAuth';

import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { VscSignIn } from 'react-icons/vsc';

import illustrationImg from '../../assets/images/illustration.svg';
import styles from '../Home/style.module.scss';

export function NewRoom() {
  // const { user } = useAuth();

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
          <h4>Crie uma nova sala</h4>
          <form>
            <input type="text" placeholder="Digite o none da sala" />
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
