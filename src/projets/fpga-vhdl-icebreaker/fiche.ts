import type { Projet } from "../types";
import chenillard from "./chenillard.svg";
import chronometre from "./chronometre.svg";
import uartVerif from "./uart-verif.svg";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git_fpga-vhdl-icebreaker";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "fpga-vhdl-icebreaker",
  ordre: 78,
  titre: "Périphériques FPGA en VHDL",
  accroche: "Du comparateur 1 bit au périphérique UART, sur FPGA iCE40 : simulés, vérifiés et synthétisés pour la vraie puce à chaque poussée.",
  resume:
    "Conception matérielle en VHDL sur la carte iCEBreaker (FPGA Lattice iCE40, horloge 12 MHz) : chenillard, chronomètre à compteurs cascadés, périphérique UART avec générateur de débit à 230 400 bauds, et un début d'acquisition de microphone PDM. Environ 2 900 lignes de VHDL et un banc de test par module. À la reprise : une chaîne qui simule chaque module, vérifie l'UART par assertions, trace les chronogrammes et synthétise chaque design pour la puce.",
  categorie: "robotique",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · électronique numérique",
  equipe: "Projet d'équipe",
  role: [
    "Conception des modules en VHDL : comparateur, chenillard, chronomètre, UART, et l'ébauche du microphone PDM",
    "Générateur de débit à 230 400 bauds dérivé de l'horloge de 12 MHz",
    "Un banc de test par module, simulé avec GHDL et lu dans GTKWave",
    "Synthèse et programmation de la carte iCEBreaker avec Yosys et nextpnr",
  ],
  couleur: "#6b4fb0",
  puce: "iCE40 · VHDL",
  couverture: { src: uartVerif, alt: "Chronogramme de l'UART : octets 0x55 puis 0xA3 envoyés sur TX", format: "schema" },
  galerie: [
    { src: uartVerif, alt: "Chronogramme de l'UART vérifiée", legende: "UART : 0x55 puis 0xA3 chargés, envoyés, décodés et comparés par le banc auto-vérifiant", format: "schema" },
    { src: chenillard, alt: "Chronogramme du chenillard", legende: "Chenillard : les trois LED s'allument tour à tour", format: "schema" },
    { src: chronometre, alt: "Chronogramme du chronomètre", legende: "Chronomètre : marche et pause pressés ensemble font osciller l'état à chaque cycle (entre 48 et 60 ms)", format: "schema" },
  ],
  stack: ["vhdl", "fpga", "githubactions"],
  chiffres: [
    { valeur: 6, libelle: "designs simulés et synthétisés à chaque poussée" },
    { valeur: 194, libelle: "cellules logiques au plus, sur 5 280" },
    { valeur: 226416, libelle: "bauds mesurés en simulation, pour 230 400 visés" },
  ],
  probleme:
    "Sur un microcontrôleur, une liaison série s'obtient en appelant une fonction. Sur un FPGA, il faut la construire : compter les cycles d'horloge, sérialiser les bits, et prouver que le montage fonctionne avant de le programmer.",
  solution:
    "Une progression module par module, du comparateur au périphérique complet. Chaque module est décrit en VHDL, assemblé par branchement de composants, et vérifié par un banc de test qui rejoue les chronogrammes.",
  sections: [
    {
      titre: "Les modules",
      points: [
        "Comparateur 1 bit : premier module et premier banc de test",
        "Chenillard sur les LED de la carte",
        "Chronomètre : compteurs cascadés et affichage",
        "Périphérique UART : générateur de débit, registre à décalage, compteur de bits",
        "Microphone PDM : ébauche, qui ne compile pas encore",
      ],
    },
    {
      titre: "Vérifié à chaque poussée",
      texte: "Sur un FPGA, on ne débogue pas avec des affichages : la preuve vient de la simulation, puis de la synthèse.",
      points: [
        "Chaque banc de test simulé sous GHDL, dans une chaîne GitHub Actions",
        "Un banc auto-vérifiant joue le PC branché sur la liaison série : il décode TX et compare chaque octet par assertion ; un design volontairement faussé est rejeté",
        "Chronogrammes tracés en SVG depuis les traces, sans GTKWave",
        "Synthèse pour l'iCE40 UP5K (Yosys, nextpnr, icepack) : de 6 à 194 cellules logiques, horloges maximales de 57 à 99 MHz pour 12 MHz utiles",
      ],
    },
    {
      titre: "Ce que la simulation a montré",
      points: [
        "L'UART émet à 226 416 bauds, non 230 400 : 53 cycles par bit au lieu de 52. L'écart de 1,7 % reste dans la tolérance d'une liaison série",
        "Chronomètre : sans priorité entre marche et pause, les presser ensemble fait osciller l'état à chaque cycle",
        "Le microphone PDM ne compile pas : il est exclu, et signalé comme inachevé",
      ],
    },
  ],
  extraits: [
    {
      fichier: "VHDL/peripherique_UART2/uart.vhd",
      langage: "vhdl",
      commentaire: "Le périphérique complet n'est qu'un assemblage : un compteur de débit, un registre à décalage, un compteur de bits, pilotés par une machine d'états.",
      code: `entity uart is
port( 	clk, reset, start, ld_t : in std_logic;
		data_to_send : in std_logic_vector(7 downto 0);
		ready, tx: out std_logic;
		tx_test : out std_logic);
end uart;

architecture arch_uart of uart is
signal raz_ser, ld_ser, ser, ce_count_nb_bits, raz_count_nb_bits : std_logic;
signal ce_count_baudrate, raz_count_baudrate : std_logic;
begin

compt_baudrate0: entity compteur_baudrate port map(
			clk => clk, raz => raz_count_baudrate,
			ce  => ce_count_baudrate, count => count_baudrate);

reg_ser: entity reg_serial port map(
			raz => raz_ser, clk => clk, load => ld_ser,
			rotate => ser, d_in => tamp_out, TX => tx);`,
    },
    {
      fichier: "VHDL/peripherique_UART2/uart.vhd",
      langage: "vhdl",
      commentaire: "Le débit vient du comptage : 12 MHz divisés par 230 400 valent 52 cycles par bit. La simulation en mesure 53 : l'attente se compare à x\"33\" (52 cycles), plus le cycle de décalage.",
      code: `-- F_ice = 12 MHz · Baudrate = 230400 · 12e6/230400 = 52

entity compteur_baudrate is
port( 	clk, raz, ce : in  std_logic;
	count        : out std_logic_vector(7 downto 0));
end compteur_baudrate;

architecture arch_compteur_baudrate of compteur_baudrate is
signal count_int : unsigned (7 downto 0);
begin
process(clk)
	begin
	if rising_edge(clk) then
		if raz = '1' then count_int <= (others => '0');
		elsif ce = '1' then
			if count_int = "11111111" then count_int <= (others => '0');
			else count_int <= count_int + 1;
			end if;
		end if;
	end if;
end process;`,
    },
  ],
  preuves: [
    {
      libelle: "La chaîne : simulation et synthèse",
      url: `${CHAINE}?query=branch%3Amain`,
      detail: "GHDL, vérification de l'UART par assertions, chronogrammes, puis synthèse pour la puce",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
  ],
  depots: [{ libelle: "Modules VHDL et bancs de test", url: DEPOT, visibilite: "public" }],
};

export default fiche;
