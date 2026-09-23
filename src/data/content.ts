import { ProductItem, PartnerItem, PlanItem } from '../types';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Desincrustante Neutro Orgânico',
    category: 'quimicos',
    categoryLabel: 'Química Neutra',
    tagline: 'Quelação seletiva de argamassa e cimento',
    description: 'Dissolve respingos de cimento sem atacar o silício do vidro nem esquadrias anodizadas ou pretas.',
    composition: 'Quelantes botânicos de pH 7.0 neutro',
    benefit: 'Zero queima química e zero manchas',
    iconName: 'Droplets',
    isEco: true
  },
  {
    id: 'prod-2',
    name: 'Emulsão Cítrica Desengraxante',
    category: 'quimicos',
    categoryLabel: 'Química Neutra',
    tagline: 'Remoção de tintas finas e vernizes',
    description: 'Amolece poliuretano, epóxi e tintas acrílicas sem fricção abrasiva mecânica.',
    composition: 'Terpeno puro de casca de laranja prensada',
    benefit: 'Desprendimento por solubilização',
    iconName: 'Sparkles',
    isEco: true
  },
  {
    id: 'prod-3',
    name: 'Removedor de Filmes & Adesivos',
    category: 'quimicos',
    categoryLabel: 'Química Neutra',
    tagline: 'Para fitas protetoras queimadas pelo sol',
    description: 'Neutraliza a cola acrílica vulcanizada de películas de fábrica e vedações de caixilho.',
    composition: 'Solvente biodegradável éster de soja',
    benefit: 'Elimina películas secas sem riscar',
    iconName: 'Eraser',
    isEco: true
  },
  {
    id: 'prod-4',
    name: 'Lâminas Cirúrgicas de Ângulo Zero',
    category: 'equipamentos',
    categoryLabel: 'Instrumental',
    tagline: 'Aço inox cirúrgico descartado por área',
    description: 'Empunhaduras com calibração milimétrica e substituição contínua da lâmina para garantir zero microrriscos.',
    composition: 'Aço inoxidável cirúrgico martensítico',
    benefit: 'Garantia contratual anti-riscos',
    iconName: 'Wrench',
    isEco: false
  },
  {
    id: 'prod-5',
    name: 'Água Deionizada 0 PPM',
    category: 'nanotecnologia',
    categoryLabel: 'Purificação',
    tagline: 'Osmose reversa em múltiplos estágios',
    description: 'Filtragem por leito misto sem sais, cloro ou calcário. Evaporação cristalina sem manchas minerais.',
    composition: 'Água 100% pura desmineralizada',
    benefit: 'Secagem natural sem marcas de gotas',
    iconName: 'Layers',
    isEco: true
  },
  {
    id: 'prod-6',
    name: 'Nanoproteção Sílica Vidro Puro',
    category: 'nanotecnologia',
    categoryLabel: 'Proteção',
    tagline: 'Efeito hidrofóbico de lótus',
    description: 'Camada molecular invisível que repele chuva ácida, maresia e poeira urbana residual.',
    composition: 'Dióxido de silício coloidal puro (SiO2)',
    benefit: 'Vidros nobres limpos por até 90 dias',
    iconName: 'ShieldCheck',
    isEco: true
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: 'part-1',
    name: 'Construtora Hochtief & Alfa',
    segment: 'Engenharia Alto Padrão',
    city: 'São Paulo',
    quote: 'Entrega de coberturas de 1.200m² com auditoria rigorosa de vidros.',
    author: 'Eng. Roberto Vasconcellos',
    authorRole: 'Diretor de Operações',
    metric: '14 Empreendimentos'
  },
  {
    id: 'part-2',
    name: 'Atelier de Arquitetura Bernardes',
    segment: 'Arquitetura Contemporânea',
    city: 'Jardins / Fazenda Boa Vista',
    quote: 'Grandes panos de vidro importados entregues sem uma única queixa.',
    author: 'Arq. Mariana Fontes',
    authorRole: 'Arquiteta Titular',
    metric: '28 Residências'
  },
  {
    id: 'part-3',
    name: 'Schüco & Alumini Premium',
    segment: 'Esquadrias Especiais',
    city: 'Alphaville',
    quote: 'Única equipe homologada que preserva a pintura anodizada e borrachas EPDM.',
    author: 'Carlos Eduardo Ramos',
    authorRole: 'Consultor Técnico de Esquadrias',
    metric: 'Homologado'
  },
  {
    id: 'part-4',
    name: 'Condomínio Reserva Real',
    segment: 'Administração Patrimonial',
    city: 'Vila Nova Conceição',
    quote: 'Pontualidade britânica, equipe discreta e laudo de entrega assinado.',
    author: 'Beatriz Meirelles',
    authorRole: 'Gestora Predial Executiva',
    metric: 'Contrato Recorrente'
  }
];

export const PLANS_DATA: PlanItem[] = [
  {
    id: 'pos-obra-master',
    title: 'Pós-Obra Private',
    badge: 'Entrega de Chaves',
    popular: false,
    type: 'pontual',
    frequency: 'Contratação Avulsa',
    idealFor: 'Imóveis recém-reformados, coberturas e mansões para vistoria final.',
    basePrice: 'R$ 680',
    features: [
      'Remoção técnica de cimento, tinta e filme solar',
      'Descontaminação de caixilhos e canaletas',
      'Raspagem milimétrica anti-risco',
      'Laudo técnico de entrega com seguro Zurich'
    ],
    ctaLabel: 'Solicitar Pós-Obra'
  },
  {
    id: 'assinatura-residencial',
    title: 'Concierge Residencial',
    badge: 'Mais Escolhido • -25%',
    popular: true,
    type: 'assinatura',
    frequency: 'Bimestral ou Trimestral',
    idealFor: 'Residências de alto padrão, penthouses e casas de campo.',
    basePrice: 'R$ 340',
    features: [
      'Manutenção preventiva contínua de transparência',
      'Aplicação de nanoproteção hidrorrepelente inclusa',
      'Data fixa no calendário e equipe com histórico verificado',
      'Economia de 25% com cancelamento flexível'
    ],
    ctaLabel: 'Assinar Concierge'
  },
  {
    id: 'assinatura-corporativa',
    title: 'Sede Corporativa & Fachada',
    badge: 'Executivo',
    popular: false,
    type: 'assinatura',
    frequency: 'Mensal ou Bimestral',
    idealFor: 'Escritórios executivos, edifícios comerciais e lojas de luxo.',
    basePrice: 'R$ 1.150',
    features: [
      'Equipe certificada NR-35 com balancim e alpinismo',
      'Lavagem técnica com água deionizada 0 PPM',
      'Atendimento aos finais de semana para discrição',
      'Apólice de seguro Zurich até R$ 5 Milhões'
    ],
    ctaLabel: 'Plano Corporativo'
  }
];

export const FAQS_DATA = [
  {
    question: 'Qual a garantia contratual contra arranhões em vidros nobres?',
    answer: 'Nossa garantia de zero riscos é expressa em contrato. Jamais raspamos a seco: realizamos o amolecimento molecular prévio dos resíduos com química neutra de pH 7.0 e utilizamos lâminas cirúrgicas descartáveis de precisão.'
  },
  {
    question: 'A equipe possui seguro e verificações de segurança?',
    answer: 'Sim. Todos os colaboradores são registrados, possuem antecedentes checados, certificação NR-35 para trabalhos em altura e a operação é amparada por apólice de responsabilidade civil Zurich.'
  },
  {
    question: 'Como funciona a assinatura de manutenção residencial?',
    answer: 'Um programa de visitas programadas (bimestral ou trimestral) que renova a nanoproteção e mantém os vidros sempre espelhados, com desconto de 25% sobre a tabela avulsa e prioridade em datas executivas.'
  }
];
