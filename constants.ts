import { Experience, Project, Skill } from './types';

export const PROFILE = {
  name: "Rafael de Andrade Ammon",
  title: "Engenheiro Florestal",
  bio: "Engenheiro Florestal pela UFRRJ com MBA em Gestão de Projetos (USP/ESALQ) e trajetória voltada à conservação ambiental, restauração florestal e sustentabilidade corporativa. Atuo como Fiscal Operacional na RPBC, promovendo práticas alinhadas à gestão ambiental em áreas industriais. Participei de projetos de relevância ecológica como o Inventário Florestal Nacional (RJ) e a restauração do COMPERJ/GasLub.",
  email: "rafael.ammon@gmail.com",
  location: "Praia Grande - SP",
  phone: "(31) 99915-4408",
  linkedinUrl: "https://www.linkedin.com/in/rafael-andrade-ammon-2527a72a/",
  instagram: "" 
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Engenheiro Florestal (Fiscal Operacional)",
    company: "Vinil Engenharia",
    period: "2024 - Atual",
    description: "Fiscalização de contratos de áreas verdes na refinaria Presidente Bernardes (RPBC) e consultoria técnica na refinaria de Paulínia (REPLAN). Elaboração de pareceres técnicos, análise de conformidade legal e treinamentos."
  },
  {
    id: 2,
    role: "Planejador em áreas verdes",
    company: "Vinil Engenharia",
    period: "2023 - 2024",
    description: "Planejamento e gestão de atividades de manutenção de áreas verdes em ambiente industrial. Responsável por equipes, cronogramas operacionais, implantação de plantios compensatórios e análise de risco. Presidente da CIPA do contrato."
  },
  {
    id: 3,
    role: "Coordenador Operacional",
    company: "Elementus",
    period: "2021 - 2023",
    description: "Coordenação de projeto de restauração florestal do GasLub com 350 hectares de mata nativa. Liderança de equipes, planejamento de atividades e avaliação da qualidade técnica dos plantios e manutenção."
  },
  {
    id: 4,
    role: "Analista Ambiental Pleno",
    company: "EGIS Brasil",
    period: "2018 - 2021",
    description: "Atuação em projetos de restauração florestal na bacia do Rio Doce. Supervisão de equipes, gestão ambiental e elaboração de diagnósticos técnicos. Apoio a vistorias da Fundação Renova e levantamentos fitossociológicos."
  },
  {
    id: 5,
    role: "Analista Ambiental Jr.",
    company: "CTA Meio Ambiente",
    period: "2015 - 2018",
    description: "Atuação focada em licenciamento e estudos ambientais, garantindo conformidade técnica e legal em projetos diversos."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Restauração GasLub (COMPERJ)",
    category: "Reflorestamento",
    description: "Coordenação da restauração de 350 hectares de mata nativa, gerenciando equipes e qualidade técnica em um dos maiores projetos de recuperação do RJ.",
    imageUrl: "https://picsum.photos/seed/gaslub/800/600",
    tags: ["Mata Atlântica", "Gestão de Equipes", "Restauração"]
  },
  {
    id: 2,
    title: "Gestão Áreas Verdes RPBC",
    category: "Consultoria",
    description: "Fiscalização e planejamento de manutenção de áreas verdes em refinarias (Petrobras), integrando segurança (SMS) e conservação ambiental industrial.",
    imageUrl: "https://picsum.photos/seed/refinery/800/600",
    tags: ["Industrial", "SMS", "Fiscalização"]
  },
  {
    id: 3,
    title: "Recuperação Rio Doce",
    category: "Reflorestamento",
    description: "Participação estratégica na recuperação da bacia do Rio Doce, realizando diagnósticos, planejamento de campo e levantamentos fitossociológicos.",
    imageUrl: "https://picsum.photos/seed/riodoce/800/600",
    tags: ["Bacia Hidrográfica", "Diagnóstico", "Fundação Renova"]
  },
  {
    id: 4,
    title: "Inventário Florestal Nacional",
    category: "Consultoria",
    description: "Execução de levantamentos para o Inventário Florestal Nacional no Rio de Janeiro, contribuindo para o mapeamento da biodiversidade brasileira.",
    imageUrl: "https://picsum.photos/seed/inventory/800/600",
    tags: ["Pesquisa", "Botânica", "Levantamento"]
  }
];

export const SKILLS: Skill[] = [
  { name: "Gestão de Projetos (PMBOK)", level: 90, category: "Gestão" },
  { name: "QGIS / Geoprocessamento", level: 95, category: "Software" },
  { name: "MS Project & Primavera P6", level: 85, category: "Software" },
  { name: "Power BI", level: 80, category: "Software" },
  { name: "Restauração Florestal", level: 95, category: "Técnica" },
  { name: "Fiscalização de Contratos", level: 90, category: "Gestão" },
  { name: "Inglês Fluente", level: 90, category: "Gestão" }
];