import { MdContentCopy } from 'react-icons/md';
import styles from './style.module.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <MdContentCopy />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
