import { ReactNode } from 'react';

import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={`question ${isAnswered ? 'answered' : ''} ${
        isHighlighted ? 'highlighted' : ''
      }`}
    >
      <div className="content">
        <p>{content}</p>
      </div>
      <footer>
        <div className="userInfo">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
