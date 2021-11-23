import { useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';

import { AiOutlineSend } from 'react-icons/ai';

import styles from '../../styles/rooms.module.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <h2>Talk To The Campus</h2>
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala de Bacharelado de Ciências Políticas</h1>
          <span>4 dúvidas</span>
        </div>

        <form>
          <textarea placeholder="O que você deseja saber sobre nôs?" />

          <div className={styles.formFooter}>
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <Button type="submit">
              Enviar pergunta <AiOutlineSend />
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
