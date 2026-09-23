import { PortfolioHouse } from '../types';

export const DEFAULT_PORTFOLIO_HOUSES: PortfolioHouse[] = [
  {
    id: 'casa-1',
    title: 'Mansão Contemporânea Tamboré',
    location: 'Alphaville, Barueri - SP',
    areaM2: 240,
    category: 'mansao',
    categoryLabel: 'Mansão de Luxo',
    imageUrl: '/src/assets/images/luxury_villa_facade_1790144087617.jpg',
    dateCompleted: 'Março 2026',
    scope: 'Pós-obra completo em pele de vidro, portas de correr estruturais e espelho d\'água.'
  },
  {
    id: 'casa-2',
    title: 'Cobertura Penthouse Jardins',
    location: 'Jardins, São Paulo - SP',
    areaM2: 160,
    category: 'cobertura',
    categoryLabel: 'Cobertura Penthouse',
    imageUrl: '/src/assets/images/luxury_penthouse_terrace_1790144435489.jpg',
    dateCompleted: 'Fevereiro 2026',
    scope: 'Descontaminação de guarda-corpos panorâmicos, coberturas envidraçadas e nanoproteção contra maresia.'
  },
  {
    id: 'casa-3',
    title: 'Residência Fazenda Boa Vista',
    location: 'Porto Feliz - SP',
    areaM2: 380,
    category: 'mansao',
    categoryLabel: 'Residência Campo',
    imageUrl: '/src/assets/images/luxury_mansion_interior_1790144446981.jpg',
    dateCompleted: 'Janeiro 2026',
    scope: 'Pé-direito duplo de 7 metros com remoção de tinta epóxi e cimento em esquadrias embutidas.'
  }
];

export const DEFAULT_VIDEO_CONFIG = {
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  videoTitle: 'Apresentação Executiva · JK Vidros Private',
  videoSubtitle: 'Engenharia de desincrustação e acabamento óptico cristalino para obras de alto padrão.'
};
