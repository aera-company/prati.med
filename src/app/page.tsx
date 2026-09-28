import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/scenes/Hero";
import { Tensao } from "@/components/scenes/Tensao";
import { Fragmentos } from "@/components/scenes/Fragmentos";
import { Transformacao } from "@/components/scenes/Transformacao";
import { CasoReal } from "@/components/scenes/CasoReal";
import { Identidade } from "@/components/scenes/Identidade";
import { Jornada } from "@/components/scenes/Jornada";
import { Sinais } from "@/components/scenes/Sinais";
import { Orquestra } from "@/components/scenes/Orquestra";
import { Piloto } from "@/components/scenes/Piloto";
import { Fechamento } from "@/components/scenes/Fechamento";

// Da atenção à consulta · V2. Uma peça dirigida em cenas.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tensao />
        <Fragmentos />
        <Transformacao />
        <CasoReal />
        <Identidade />
        <Jornada />
        <Sinais />
        <Orquestra />
        <Piloto />
        <Fechamento />
      </main>
      <Footer />
    </>
  );
}
