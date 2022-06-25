import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Sidebar";

export function Event(){
  const { slug } = useParams<{slug: string}>();

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex flex-1 min-h-screen">
        {slug ? <Player slug={slug} /> : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  )
}