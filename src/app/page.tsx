import { SiteHeader } from "@/components/SiteHeader";
import { Scene1Hero } from "@/components/scenes/Scene1Hero";
import { Scene2Conteudo } from "@/components/scenes/Scene2Conteudo";
import { Scene3Jornada } from "@/components/scenes/Scene3Jornada";
import { Scene4Marca } from "@/components/scenes/Scene4Marca";
import { Scene5Leitura } from "@/components/scenes/Scene5Leitura";
import { Scene6Piloto } from "@/components/scenes/Scene6Piloto";
import { Scene7Convite } from "@/components/scenes/Scene7Convite";

// Da atenção à consulta · sete cenas, uma progressão (brief V6, seção 03).
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Scene1Hero />
        <Scene2Conteudo />
        <Scene3Jornada />
        <Scene4Marca />
        <Scene5Leitura />
        <Scene6Piloto />
        <Scene7Convite />
      </main>
    </>
  );
}
