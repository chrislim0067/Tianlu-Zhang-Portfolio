(function (root, factory) {
  var content = factory();
  if (typeof module === 'object' && module.exports) module.exports = content;
  if (root) root.__TIANLU_PORTFOLIO_CONTENT__ = content;
})(typeof window !== 'undefined' ? window : null, function () {
  var englishCases = [
    {
      slug: 'ai-ml-platform-at-production-scale',
      image: '/images/work/ai-ml-platform-at-production-scale.jpg',
      title: 'AI/ML Platform at Production Scale',
      category: 'ai-platforms',
      short:
        'Architected shared training and inference infrastructure supporting 40+ production and experimental models across eight engineering organizations and 120+ ML and software engineers.',
      detail: [
        'Built an end-to-end AI/ML platform spanning training orchestration, model artifacts, evaluation, deployment, production inference, observability, resource scheduling and lifecycle management.',
        'The shared architecture replaced fragmented workflows with reusable platform services, supporting more than 40 models and approximately 2.5 billion annual production inferences.'
      ]
    },
    {
      slug: 'llm-inference-optimization',
      image: '/images/work/llm-inference-optimization.jpg',
      title: 'LLM Inference Optimization',
      category: 'llm-systems',
      short:
        'Reduced p95 inference latency by 41%, increased effective throughput 2.3× and lowered average infrastructure cost by 31%.',
      detail: [
        'Led model and runtime co-optimization across batching, execution, memory management, scheduling and workload consolidation.',
        'The resulting platform reduced p95 latency by 41%, increased effective throughput 2.3×, raised accelerator utilization from 54% to 79% and lowered average inference infrastructure cost by 31%.'
      ]
    },
    {
      slug: 'distributed-fine-tuning-infrastructure',
      image: '/images/work/distributed-fine-tuning-infrastructure.jpg',
      title: 'Distributed Fine-Tuning Infrastructure',
      category: 'llm-systems',
      short:
        'Built repeatable fine-tuning infrastructure across clusters of 64+ accelerators while shortening turnaround by 43%.',
      detail: [
        'Designed distributed fine-tuning workflows covering orchestration, resource scheduling, checkpoints, evaluation and production handoff.',
        'The platform supported clusters of more than 64 accelerators while reducing fine-tuning turnaround by 43%.'
      ]
    },
    {
      slug: 'embedding-and-semantic-retrieval',
      image: '/images/work/embedding-and-semantic-retrieval.jpg',
      title: 'Embedding and Semantic Retrieval',
      category: 'llm-systems',
      short:
        'Trained embedding models on 180M+ semantic pairs, improving Recall@50 by 12.6% and NDCG@10 by 9.8%.',
      detail: [
        'Developed large-scale representation-learning and semantic-retrieval workflows covering data preparation, distributed training, evaluation and deployment.',
        'Training across more than 180 million semantic pairs improved Recall@50 by 12.6% and NDCG@10 by 9.8%.'
      ]
    },
    {
      slug: 'production-mlops-platform',
      image: '/images/work/production-mlops-platform.jpg',
      title: 'Production MLOps Platform',
      category: 'ai-platforms',
      short:
        'Reduced model productionization from approximately 14 days to five through reusable MLOps infrastructure.',
      detail: [
        'Built reusable infrastructure for experiment management, model registration, evaluation, deployment automation, monitoring and production governance.',
        'Standardizing the delivery lifecycle reduced model productionization from approximately 14 days to five—a 64% improvement.'
      ]
    },
    {
      slug: 'high-throughput-distributed-data-platform',
      image: '/images/work/high-throughput-distributed-data-platform.jpg',
      title: 'High-Throughput Distributed Data Platform',
      category: 'distributed-systems',
      short:
        'Led a Redis-based platform sustaining 250K+ peak requests per second at under 6 ms p99 latency and 99.995% availability.',
      detail: [
        'Designed and led a distributed Redis-based data platform focused on partitioning, replication, caching, fault tolerance and operational reliability.',
        'The system sustained more than 250,000 peak requests per second, maintained under 6 ms p99 latency, supported approximately 8 TB of data and achieved 99.995% availability.'
      ]
    },
    {
      slug: 'apple-maps-engineering-leadership',
      image: '/images/work/apple-maps-engineering-leadership.jpg',
      title: 'Apple Maps Engineering Leadership',
      category: 'leadership',
      short:
        'Managed 12 engineers across PlaceCard and Reverse Geocoding while coordinating delivery with eight partner teams.',
      detail: [
        'Led Apple Maps engineering across PlaceCard and Reverse Geocoding, managing a 12-engineer organization and coordinating architecture and delivery across more than eight partner teams.',
        'The role combined engineering management, technical strategy, cross-functional planning, design reviews and production ownership.'
      ]
    },
    {
      slug: 'ml-performance-engineering',
      image: '/images/work/ml-performance-engineering.jpg',
      title: 'ML Performance Engineering',
      category: 'distributed-systems',
      short:
        'Connected machine-learning research with systems architecture and production performance engineering at Intel.',
      detail: [
        'Developed performance models, engineering tools and APIs for evaluating machine-learning and distributed-system workloads.',
        'This early systems foundation informed later work across high-throughput data platforms, MLOps infrastructure and production AI systems.'
      ]
    }
  ];

  var frenchCases = [
    {
      slug: 'plateforme-ia-ml-a-lechelle-de-la-production',
      title: 'Plateforme IA/ML à l’échelle de la production',
      category: 'plateformes-ia',
      short:
        'Architecture d’une infrastructure partagée d’entraînement et d’inférence pour plus de 40 modèles en production et expérimentaux, au service de huit organisations d’ingénierie et de plus de 120 ingénieurs ML et logiciel.',
      detail: [
        'Conception d’une plateforme IA/ML de bout en bout couvrant l’orchestration de l’entraînement, les artefacts de modèles, l’évaluation, le déploiement, l’inférence en production, l’observabilité, l’ordonnancement des ressources et la gestion du cycle de vie.',
        'L’architecture partagée a remplacé des workflows fragmentés par des services de plateforme réutilisables, prenant en charge plus de 40 modèles et environ 2,5 milliards d’inférences annuelles en production.'
      ]
    },
    {
      slug: 'optimisation-de-linference-llm',
      title: 'Optimisation de l’inférence LLM',
      category: 'systemes-llm',
      short:
        'Réduction de 41% de la latence p95, multiplication par 2,3 du débit effectif et baisse de 31% du coût moyen d’infrastructure.',
      detail: [
        'Pilotage de la co-optimisation des modèles et du runtime sur le batching, l’exécution, la gestion de la mémoire, l’ordonnancement et la consolidation des charges.',
        'La plateforme a réduit la latence p95 de 41%, multiplié le débit effectif par 2,3, porté l’utilisation des accélérateurs de 54% à 79% et réduit de 31% le coût moyen de l’infrastructure d’inférence.'
      ]
    },
    {
      slug: 'infrastructure-distribuee-de-fine-tuning',
      title: 'Infrastructure distribuée de fine-tuning',
      category: 'systemes-llm',
      short:
        'Création d’une infrastructure reproductible de fine-tuning sur des clusters de plus de 64 accélérateurs, avec un délai réduit de 43%.',
      detail: [
        'Conception de workflows distribués de fine-tuning couvrant l’orchestration, l’ordonnancement des ressources, les checkpoints, l’évaluation et le passage en production.',
        'La plateforme a pris en charge des clusters de plus de 64 accélérateurs tout en réduisant de 43% le délai de fine-tuning.'
      ]
    },
    {
      slug: 'embeddings-et-recherche-semantique',
      title: 'Embeddings et recherche sémantique',
      category: 'systemes-llm',
      short:
        'Entraînement de modèles d’embeddings sur plus de 180 millions de paires sémantiques, améliorant Recall@50 de 12,6% et NDCG@10 de 9,8%.',
      detail: [
        'Développement de workflows à grande échelle d’apprentissage de représentations et de recherche sémantique, de la préparation des données au déploiement en passant par l’entraînement distribué et l’évaluation.',
        'L’entraînement sur plus de 180 millions de paires sémantiques a amélioré Recall@50 de 12,6% et NDCG@10 de 9,8%.'
      ]
    },
    {
      slug: 'plateforme-mlops-de-production',
      title: 'Plateforme MLOps de production',
      category: 'plateformes-ia',
      short:
        'Réduction du passage des modèles en production d’environ 14 jours à cinq grâce à une infrastructure MLOps réutilisable.',
      detail: [
        'Création d’une infrastructure réutilisable pour la gestion des expérimentations, l’enregistrement des modèles, l’évaluation, l’automatisation du déploiement, le monitoring et la gouvernance en production.',
        'La standardisation du cycle de livraison a réduit le passage des modèles en production d’environ 14 jours à cinq, soit une amélioration de 64%.'
      ]
    },
    {
      slug: 'plateforme-de-donnees-distribuee-a-haut-debit',
      title: 'Plateforme de données distribuée à haut débit',
      category: 'systemes-distribues',
      short:
        'Pilotage d’une plateforme Redis dépassant 250 000 requêtes par seconde en pointe, avec une latence p99 inférieure à 6 ms et une disponibilité de 99,995%.',
      detail: [
        'Conception et pilotage d’une plateforme de données distribuée fondée sur Redis, axée sur le partitionnement, la réplication, le cache, la tolérance aux pannes et la fiabilité opérationnelle.',
        'Le système a dépassé 250 000 requêtes par seconde en pointe, maintenu une latence p99 inférieure à 6 ms, géré environ 8 To de données et atteint une disponibilité de 99,995%.'
      ]
    },
    {
      slug: 'leadership-technique-apple-plans',
      title: 'Leadership technique pour Apple Plans',
      category: 'leadership',
      short:
        'Management de 12 ingénieurs sur PlaceCard et Reverse Geocoding, avec coordination de la livraison auprès de huit équipes partenaires.',
      detail: [
        'Direction de l’ingénierie Apple Plans sur PlaceCard et Reverse Geocoding, avec une organisation de 12 ingénieurs et la coordination de l’architecture et de la livraison auprès de plus de huit équipes partenaires.',
        'Le rôle associait management d’ingénierie, stratégie technique, planification transverse, revues de conception et responsabilité de la production.'
      ]
    },
    {
      slug: 'ingenierie-de-performance-ml',
      title: 'Ingénierie de performance ML',
      category: 'systemes-distribues',
      short:
        'Mise en relation de la recherche en machine learning, de l’architecture système et de l’ingénierie de performance en production chez Intel.',
      detail: [
        'Développement de modèles de performance, d’outils d’ingénierie et d’API pour évaluer des charges de machine learning et de systèmes distribués.',
        'Ces premières bases systèmes ont nourri les travaux ultérieurs sur les plateformes de données à haut débit, l’infrastructure MLOps et les systèmes d’IA en production.'
      ]
    }
  ];

  return {
    seo: {
      en: {
        defaultTitle: 'Tianlu Zhang | Principal AI/ML Engineer',
        description:
          'Principal AI and full-stack engineer with 12 years across Apple and Intel, specializing in LLM platforms, distributed systems, MLOps and engineering leadership.',
        aboutTitle: 'About | Tianlu Zhang',
        workTitle: 'Selected Work | Tianlu Zhang'
      },
      fr: {
        defaultTitle: 'Tianlu Zhang | Ingénieur principal IA/ML',
        description:
          'Ingénieur principal en IA et full-stack avec 12 ans d’expérience chez Apple et Intel, spécialisé dans les plateformes LLM, les systèmes distribués, le MLOps et le leadership technique.',
        aboutTitle: 'À propos | Tianlu Zhang',
        workTitle: 'Réalisations | Tianlu Zhang'
      }
    },
    home: {
      en: {
        summary:
          'Tianlu Zhang is a Principal AI and full-stack engineer with 12 years spanning Apple and Intel, leading teams building distributed LLM and MLOps platforms, accelerating delivery, reducing risk and turning ambitious startup ideas into market advantage.',
        interaction: 'Click to explore',
        endScreen: 'Build what matters at scale',
        statements: [
          'Engineer intelligent systems',
          'Scale AI with confidence',
          'Accelerate model delivery',
          'Optimize every inference',
          'Build for reliability',
          'Lead through complexity',
          'Turn ambitious ideas into impact'
        ]
      },
      fr: {
        summary:
          'Tianlu Zhang est ingénieur principal en IA et full-stack, avec 12 ans d’expérience chez Apple et Intel. Il dirige des équipes qui conçoivent des plateformes distribuées de LLM et de MLOps, accélèrent la livraison, réduisent les risques et transforment des idées ambitieuses en avantage concurrentiel.',
        interaction: 'Cliquez pour explorer',
        endScreen: 'Construire ce qui compte à grande échelle',
        statements: [
          'Concevoir des systèmes intelligents',
          'Déployer l’IA en toute confiance',
          'Accélérer la livraison des modèles',
          'Optimiser chaque inférence',
          'Construire pour la fiabilité',
          'Guider dans la complexité',
          'Transformer des idées ambitieuses en impact'
        ]
      }
    },
    about: {
      en: {
        summary:
          'Tianlu Zhang is a Principal AI and full-stack engineer with 12 years spanning Apple and Intel, leading teams building distributed LLM and MLOps platforms, accelerating delivery, reducing risk and turning ambitious startup ideas into market advantage.',
        paragraphs: [
          'With 12 years of experience across Apple and Intel, Tianlu Zhang builds production AI and full-stack systems that turn complex challenges into reliable products. Expertise spans LLM infrastructure, distributed systems, MLOps and high-performance computing.',
          'Across Principal AI/ML engineering and engineering management, Tianlu has scaled platforms supporting billions of inferences, cut latency and cost, and led teams from architecture through production—helping ambitious companies move faster and scale confidently.'
        ],
        expertise: [
          {
            heading: 'AI Platform Architecture',
            word: 'PLATFORMS',
            icon: '/images/expertise/platforms.svg',
            description:
              'Designing scalable platforms for model training, fine-tuning, evaluation and real-time inference, with robust architecture across compute, data, APIs and observability.'
          },
          {
            heading: 'Full-Stack AI Products',
            word: 'PRODUCTS',
            icon: '/images/expertise/products.svg',
            description:
              'Building production LLM applications, intelligent workflows and user-facing AI products that connect reliable backend services with intuitive full-stack experiences.'
          },
          {
            heading: 'Distributed Systems',
            word: 'SYSTEMS',
            icon: '/images/expertise/systems.svg',
            description:
              'Engineering high-throughput, low-latency services and data pipelines that remain reliable under demanding workloads and scale efficiently as products grow.'
          },
          {
            heading: 'MLOps & Reliability',
            word: 'RELIABILITY',
            icon: '/images/expertise/reliability.svg',
            description:
              'Creating repeatable systems for experimentation, deployment, monitoring and governance—reducing release time, infrastructure cost and production risk.'
          },
          {
            heading: 'Technical Leadership',
            word: 'LEADERSHIP',
            icon: '/images/expertise/leadership.svg',
            description:
              'Setting technical direction, leading multidisciplinary teams and turning ambiguous business goals into focused roadmaps, decisive execution and measurable outcomes.'
          }
        ]
      },
      fr: {
        summary:
          'Tianlu Zhang est ingénieur principal en IA et full-stack, avec 12 ans d’expérience chez Apple et Intel. Il dirige des équipes qui conçoivent des plateformes distribuées de LLM et de MLOps, accélèrent la livraison, réduisent les risques et transforment des idées ambitieuses en avantage concurrentiel.',
        paragraphs: [
          'Fort de 12 ans d’expérience chez Apple et Intel, Tianlu Zhang conçoit des systèmes d’IA et full-stack en production qui transforment des défis complexes en produits fiables. Son expertise couvre l’infrastructure LLM, les systèmes distribués, le MLOps et le calcul haute performance.',
          'À la croisée de l’ingénierie IA/ML principale et du management, Tianlu a déployé des plateformes gérant des milliards d’inférences, réduit latence et coûts, et dirigé des équipes de l’architecture à la production, aidant des entreprises ambitieuses à avancer plus vite et à évoluer avec confiance.'
        ],
        expertise: [
          {
            heading: 'Architecture de plateformes IA',
            word: 'PLATEFORMES',
            icon: '/images/expertise/platforms.svg',
            description:
              'Conception de plateformes évolutives pour l’entraînement, le fine-tuning, l’évaluation et l’inférence en temps réel, avec une architecture robuste pour le calcul, les données, les API et l’observabilité.'
          },
          {
            heading: 'Produits IA full-stack',
            word: 'PRODUITS',
            icon: '/images/expertise/products.svg',
            description:
              'Création d’applications LLM en production, de workflows intelligents et de produits IA qui relient des services backend fiables à des expériences full-stack intuitives.'
          },
          {
            heading: 'Systèmes distribués',
            word: 'SYSTÈMES',
            icon: '/images/expertise/systems.svg',
            description:
              'Ingénierie de services et de pipelines de données à haut débit et faible latence, fiables sous forte charge et capables d’évoluer efficacement avec les produits.'
          },
          {
            heading: 'MLOps et fiabilité',
            word: 'FIABILITÉ',
            icon: '/images/expertise/reliability.svg',
            description:
              'Création de systèmes reproductibles pour l’expérimentation, le déploiement, le monitoring et la gouvernance, afin de réduire les délais, les coûts d’infrastructure et les risques en production.'
          },
          {
            heading: 'Leadership technique',
            word: 'LEADERSHIP',
            icon: '/images/expertise/leadership.svg',
            description:
              'Définition de la direction technique, pilotage d’équipes pluridisciplinaires et transformation d’objectifs ambigus en feuilles de route ciblées, exécution décisive et résultats mesurables.'
          }
        ]
      }
    },
    contact: {
      en: [
        {
          text: 'tianluzhang55@gmail.com',
          href: 'mailto:tianluzhang55@gmail.com',
          label: 'Contact'
        },
        {
          text: 'linkedin.com/in/tianlu-z-623266429',
          href: 'https://linkedin.com/in/tianlu-z-623266429',
          label: 'LinkedIn'
        },
        {
          text: 'Résumé available on request',
          href: 'mailto:tianluzhang55@gmail.com',
          label: 'Résumé'
        }
      ],
      fr: [
        {
          text: 'tianluzhang55@gmail.com',
          href: 'mailto:tianluzhang55@gmail.com',
          label: 'Contact'
        },
        {
          text: 'linkedin.com/in/tianlu-z-623266429',
          href: 'https://linkedin.com/in/tianlu-z-623266429',
          label: 'LinkedIn'
        },
        {
          text: 'CV disponible sur demande',
          href: 'mailto:tianluzhang55@gmail.com',
          label: 'CV'
        }
      ]
    },
    work: {
      en: {
        heading: 'My Work',
        seeWork: 'See My Work',
        filters: [
          { uid: '', label: 'All' },
          { uid: 'ai-platforms', label: 'AI Platforms' },
          { uid: 'llm-systems', label: 'LLM Systems' },
          { uid: 'distributed-systems', label: 'Distributed Systems' },
          { uid: 'leadership', label: 'Leadership' }
        ],
        cases: englishCases
      },
      fr: {
        heading: 'Mes réalisations',
        seeWork: 'Voir mes réalisations',
        filters: [
          { uid: '', label: 'Tous' },
          { uid: 'plateformes-ia', label: 'Plateformes IA' },
          { uid: 'systemes-llm', label: 'Systèmes LLM' },
          { uid: 'systemes-distribues', label: 'Systèmes distribués' },
          { uid: 'leadership', label: 'Leadership' }
        ],
        cases: frenchCases
      }
    }
  };
});
