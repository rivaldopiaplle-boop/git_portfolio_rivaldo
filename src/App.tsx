import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Coquille } from "./composants/coquille/Coquille";
import { FournisseurCoquille } from "./composants/coquille/contexte";
import Chaine from "./pages/Chaine";
import Competences from "./pages/Competences";
import Cv from "./pages/Cv";
import FicheProjet from "./pages/FicheProjet";
import Introuvable from "./pages/Introuvable";
import Parcours from "./pages/Parcours";
import Projets from "./pages/Projets";
import TableauDeBord from "./pages/TableauDeBord";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <FournisseurCoquille>
        <Coquille>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
              <Routes location={location}>
                <Route path="/" element={<TableauDeBord />} />
                <Route path="/projets" element={<Projets />} />
                <Route path="/projets/:slug" element={<FicheProjet />} />
                <Route path="/chaine" element={<Chaine />} />
                <Route path="/parcours" element={<Parcours />} />
                <Route path="/competences" element={<Competences />} />
                <Route path="/cv" element={<Cv />} />
                <Route path="*" element={<Introuvable />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Coquille>
      </FournisseurCoquille>
    </MotionConfig>
  );
}
