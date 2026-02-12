
import { Product } from './types';

export const ADMIN_USERNAME = 'SKDesign31';
export const TELEGRAM_BOT_USERNAME = 'SKDesign31';

export const INITIAL_PRODUCTS: Product[] = [
  // SERVICES
  {
    id: '1',
    name: "🕹Mini App Premium",
    price: 450,
    img: "https://i.postimg.cc/kgLnjWDS/78E5E69D-1A65-485B-9311-66CF2AEBDFDE.jpg",
    desc: "Mini-app complète avec boutique, panier, profil client, avis, packs, commandes automatiques Telegram et support technique dédié par SK DESIGN INDUSTRY.",
    category: 'Service',
    likes: 245,
    badges: ['PREMIUM', 'BEST-SELLER'],
    reviews: [
      { id: 'r1', user: 'Alex', comment: 'Incroyable travail, très pro !', rating: 5, date: '2024-03-10' },
      { id: 'r2', user: 'Sarah', comment: 'Interface magnifique.', rating: 5, date: '2024-03-12' }
    ]
  },
  {
    id: '2',
    name: "🕹️Mini App Demo",
    price: 200,
    img: "https://picsum.photos/seed/demoapp/400/400",
    desc: "Mini app simple avec boutique, fiche produit et envoi automatique des commandes Telegram. Idéal pour tester votre concept INDUSTRY.",
    category: 'Service',
    likes: 89,
    badges: ['PROMO'],
    reviews: []
  },
  {
    id: '3',
    name: "LOGO",
    price: 30,
    img: "https://i.postimg.cc/HL573YWT/IMG-2945.png",
    desc: "Logo Personnalisé 4K / HD / 3D. Une identité visuelle unique qui marque les esprits dès le premier regard.",
    category: 'Service',
    likes: 312,
    badges: ['HD', '4K'],
    reviews: []
  },
  {
    id: '4',
    name: "LOGO ANIMÉE",
    price: 40,
    img: "https://picsum.photos/seed/logoanim/400/400",
    desc: "Logo Animé Personnalisé pour vos intros vidéos ou vos profils réseaux sociaux. Fluidité et impact visuel garantis par SK DESIGN INDUSTRY.",
    category: 'Service',
    likes: 156,
    badges: ['ANIMÉ'],
    reviews: []
  },
  {
    id: '5',
    name: "FLYER",
    price: 30,
    img: "https://picsum.photos/seed/flyer/400/400",
    desc: "Flyer Personnalisé pour vos événements, promotions ou annonces. Design épuré et percutant.",
    category: 'Service',
    likes: 98,
    badges: ['CREATION'],
    reviews: []
  },
  {
    id: '6',
    name: "FLYER ANIMÉE",
    price: 60,
    img: "https://picsum.photos/seed/flyervid/400/400",
    desc: "Flyer Vidéo Personnalisé (Motion Graphics). Donnez vie à vos annonces avec des animations haut de gamme.",
    category: 'Service',
    likes: 120,
    badges: ['VIDEO'],
    reviews: []
  },
  {
    id: '7',
    name: "5 STICKERS TLG/PTT",
    price: 50,
    img: "https://picsum.photos/seed/stickers/400/400",
    desc: "Pack de 5 stickers personnalisés pour Telegram et Potato. Renforcez l'image de votre marque INDUSTRY dans les chats.",
    category: 'Service',
    likes: 67,
    badges: ['SOCIAL'],
    reviews: []
  },
  {
    id: '8',
    name: "🤖BOT TELEGRAM",
    price: 30,
    img: "https://picsum.photos/seed/bot/400/400",
    desc: "Création de bot Telegram sur mesure. Automatisez votre boutique, votre support ou la gestion de vos groupes.",
    category: 'Service',
    likes: 143,
    badges: ['BOT'],
    reviews: []
  },

  // PACKS
  {
    id: 'p1',
    name: "Pack Telegram",
    price: 120,
    img: "https://picsum.photos/seed/pack1/400/400",
    desc: "Le pack de lancement ultime : Logo + Flyer + Stickers + Bot. Tout ce qu'il faut pour professionnaliser votre canal instantanément.",
    category: 'Pack',
    likes: 189,
    badges: ['POPULAIRE'],
    reviews: []
  },
  {
    id: 'p2',
    name: "Pack Animée",
    price: 100,
    img: "https://picsum.photos/seed/pack2/400/400",
    desc: "Le pack Premium Motion : Logo Animé + Flyer Animé. Pour ceux qui veulent sortir du lot avec du contenu dynamique.",
    category: 'Pack',
    likes: 92,
    badges: ['HOT'],
    reviews: []
  },
  {
    id: 'p3',
    name: "Pack Snap",
    price: 100,
    img: "https://i.postimg.cc/HL573YWT/IMG-2945.png",
    desc: "Identité Snapchat complète : Logo + Flyer + Bannière. Optimisé pour les formats Story et les profils publics.",
    category: 'Pack',
    likes: 110,
    badges: ['SNAP'],
    reviews: []
  },

  // ABONNEMENTS
  {
    id: 'a1',
    name: "Abonnement 1 mois",
    price: 180,
    img: "https://picsum.photos/seed/abo1/400/400",
    desc: "Liberté totale pendant 30 jours. Créations illimitées, support ultra-prioritaire et révisions infinies sur tous vos projets.",
    category: 'Abonnement',
    likes: 201,
    badges: ['VIP'],
    reviews: []
  },
  {
    id: 'a2',
    name: "Abonnement 5 mois",
    price: 520,
    img: "https://picsum.photos/seed/abo5/400/400",
    desc: "Le choix des pros. Créations illimitées pendant 5 mois avec un suivi stratégique de votre identité visuelle par SK DESIGN INDUSTRY.",
    category: 'Abonnement',
    likes: 154,
    badges: ['PREMIUM'],
    reviews: []
  },
  {
    id: 'a3',
    name: "Abonnement 1 an",
    price: 1260,
    img: "https://picsum.photos/seed/abo12/400/400",
    desc: "L'offre Elite Ultime. 12 mois de design illimité, designer dédié, et accès en avant-première à toutes les technologies INDUSTRY.",
    category: 'Abonnement',
    likes: 88,
    badges: ['ELITE'],
    reviews: []
  }
];

export const CATEGORIES = ['Tous', 'Service', 'Pack', 'Abonnement', 'Creation'];
