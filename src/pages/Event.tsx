import { Header } from "../components/Header";
// import { Lesson } from "../components/Lesson";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Sidebar";

export function Event(){
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex flex-1 min-h-screen">
        <Player />
        <Sidebar />
      </main>
    </div>
  )
}