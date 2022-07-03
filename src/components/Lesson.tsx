import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, type, availableAt, slug: slugProp }: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableAtFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });

  const isActiveLesson = slug === slugProp;

  return (
    <Link to={`/event/lesson/${slugProp}`} className='group'>
      <span className="text-gray-300">
        {availableAtFormatted}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-300 transition-colors', {
          'bg-green-500': isActiveLesson
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("text-sm  font-medium flex items-center gap-2", {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          

          <span className={classNames("text-xs rounded py-[2px] px-2 text-white border font-bold", {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PŔATICA'}
          </span>
        </header>

        <strong className={classNames("text-white mt-5 block", {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  );
}
