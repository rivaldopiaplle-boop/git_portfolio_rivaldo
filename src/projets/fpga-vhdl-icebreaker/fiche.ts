import type { Projet } from "../types";

const fiche: Projet = {
  slug: "fpga-vhdl-icebreaker",
  ordre: 78,
  titre: "Périphériques FPGA en VHDL",
  accroche: "Du comparateur 1 bit au périphérique UART complet et au microphone PDM, sur FPGA iCE40, chaque module avec son banc de test.",
  resume:
    "Conception matérielle en VHDL sur la carte iCEBreaker (FPGA Lattice iCE40, horloge 12 MHz) : chenillard, chronomètre à compteurs cascadés, périphérique UART avec générateur de débit à 230 400 bauds, et acquisition d'un microphone PDM renvoyée par la liaison série. Environ 2 900 lignes de VHDL, et un banc de test par module — car sur un FPGA, on ne débogue pas avec des affichages.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025 — 2026",
  cadre: "ENIB · électronique numérique",
  couleur: "#6b4fb0",
  puce: "iCE40 · VHDL",
  stack: ["vhdl", "fpga"],
  chiffres: [
    { valeur: 7, libelle: "modules conçus" },
    { valeur: 2900, libelle: "lignes de VHDL" },
    { valeur: 230400, libelle: "bauds sur la liaison série" },
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
        "Microphone PDM : acquisition puis envoi par la liaison série",
      ],
    },
    {
      titre: "Comment c'est vérifié",
      texte: "Un module qui ne se teste pas ne se corrige pas : on ne voit rien passer sur des fils.",
      points: [
        "Un banc de test (`icebreaker_tb.vhd`) par module",
        "Simulation avec GHDL, chronogrammes lus dans GTKWave",
        "Synthèse et programmation par la chaîne libre Yosys et nextpnr",
      ],
    },
  ],
  extraits: [
    {
      fichier: "VHDL/peripherique_UART2/uart.vhd",
      langage: "vhdl",
      commentaire: "Le périphérique complet n'est qu'un assemblage : un compteur de débit, un registre à décalage, un compteur de bits. Chaque pièce est testée séparément.",
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
      commentaire: "Le débit vient du comptage : 12 MHz divisés par 230 400 valent 52 cycles par bit. Le compteur donne ce rythme.",
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
  depots: [{ libelle: "Modules VHDL et bancs de test", url: null, visibilite: "public" }],
};

export default fiche;
