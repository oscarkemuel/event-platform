import { gql, useQuery } from "@apollo/client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      id
      description
      videoId
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    id: string;
    description: string;
    videoId: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    };
  };
}
interface PlayerProps {
  slug: string;
}

export function Player({ slug }: PlayerProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: { slug },
  });

  const lesson = data?.lesson;

  if(!lesson) {
    return (
      <div className="flex-1 mx-1">
        <div className="mx-auto">
          <SkeletonTheme baseColor="#202020" highlightColor="#333">
            <Skeleton className="h-full w-full max-h-[60vh] aspect-video" />
            <Skeleton className="w-full max-w-[600px] h-[30px] mt-6" />
            <div className="mt-2">
              <Skeleton count={3} className="max-w-[500px]" />
            </div>
            <div className="mt-4 grid grid-cols-2 max-w-[200px]">
              <Skeleton circle className="max-w-[64px] h-[64px]" />
              <div>
                <Skeleton className="max-w-[45px] h-[15px]" />
                <Skeleton className="h-[15px]" count={2} />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            />
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={lesson.teacher.avatarURL}
                alt="Oscar Kemuel"
                className="h-16 w-16 rounded-full border-2 border-blue-500"
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href=""
              className="p-4 bg-green-500 font-bold text-sm flex items-center rounded uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>

            <a
              href=""
              className="p-4 bg-transparent font-bold text-sm flex items-center rounded uppercase gap-2 justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
