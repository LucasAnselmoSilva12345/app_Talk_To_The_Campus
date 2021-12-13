import { MdContentCopy } from 'react-icons/md';
import './style.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="roomCode" onClick={copyRoomCodeToClipboard}>
      <div>
        <MdContentCopy />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
