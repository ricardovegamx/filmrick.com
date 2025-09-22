export type Language = 'es' | 'en'

export interface Translations {
  navigation: {
    home: string
    galleries: string
    stories: string
    myGear: string
    about: string
  }
  home: {
    tagline: string
    title: string
    description: string
    viewGalleries: string
    readStories: string
    featuredWork: string
    featuredDescription: string
    viewAllGalleries: string
    featuredStory: string
    latestFromBlog: string
    readFullStory: string
    quote: string
    quoteAuthor: string
  }
  galleries: {
    title: string
    description: string
    noGalleries: string
    checkBack: string
  }
  stories: {
    title: string
    description: string
    noStories: string
    checkBack: string
  }
  myGear: {
    title: string
    description: string
    cameras: string
    lenses: string
    filmStocks: string
    accessories: string
    primaryCamera: string
    secondaryCamera: string
    primaryCameraDesc: string
    secondaryCameraDesc: string
    kodakTriX: string
    fujiPro400H: string
    ilfordHP5: string
    lightMeter: string
    tripod: string
    filters: string
    cameraBag: string
    cleaningKit: string
  }
  about: {
    title: string
    description: string
    letsConnect: string
    connectDescription: string
    readOnSubstack: string
    viewGalleries: string
    madeWith: string
  }
  footer: {
    brand: string
    brandDescription: string
    explore: string
    connect: string
    newsletter: string
    newsletterDescription: string
    copyright: string
  }
  common: {
    featuredImage: string
    portraitPhoto: string
    cameraPhoto: string
    gallery: string
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    navigation: {
      home: 'Inicio',
      galleries: 'Galerías',
      stories: 'Historias',
      myGear: 'Mi Equipo',
      about: 'Acerca de'
    },
    home: {
      tagline: 'Fotografía analógica desde Ciudad de México',
      title: 'Aventuras en fotografía analógica',
      description: 'Explorando la poesía entre momentos a través de la fotografía analógica. Galerías, reseñas de cámaras, historias del cuarto oscuro y todo lo analógico — donde cada cuadro cuenta y la luz se encuentra con la emoción.',
      viewGalleries: 'Ver Galerías',
      readStories: 'Leer Historias',
      featuredWork: 'Trabajo Destacado',
      featuredDescription: 'Exploraciones recientes en luz, sombra y conexión humana.',
      viewAllGalleries: 'Ver Todas las Galerías →',
      featuredStory: 'Historia Destacada',
      latestFromBlog: 'Lo Más Reciente del Blog',
      readFullStory: 'Leer Historia Completa',
      quote: 'La fotografía no se trata solo de congelar el tiempo; se trata de entender la poesía que existe en el espacio entre momentos.',
      quoteAuthor: '— Sobre el arte de ver'
    },
    galleries: {
      title: 'Galerías',
      description: 'Colecciones de momentos capturados en película, cada uno contando una historia a través de luz, sombra y emoción.',
      noGalleries: 'Aún no hay galerías disponibles.',
      checkBack: 'Regresa pronto para nuevas colecciones de fotografía analógica.'
    },
    stories: {
      title: 'Historias',
      description: 'Relatos del mundo analógico: reseñas de cámaras, aventuras del cuarto oscuro y reflexiones sobre el arte de la fotografía analógica.',
      noStories: 'Aún no hay historias disponibles.',
      checkBack: 'Regresa pronto para relatos del mundo analógico.'
    },
    myGear: {
      title: 'Mi Equipo',
      description: 'Las cámaras, lentes y herramientas que me ayudan a capturar la poesía de los momentos cotidianos en película.',
      cameras: 'Cámaras',
      lenses: 'Lentes',
      filmStocks: 'Películas Favoritas',
      accessories: 'Accesorios Esenciales',
      primaryCamera: 'Cámara Principal',
      secondaryCamera: 'Cámara Secundaria',
      primaryCameraDesc: 'Detalles sobre tu cámara principal, por qué la elegiste y qué la hace especial para tu fotografía.',
      secondaryCameraDesc: 'Tu cámara de respaldo o especializada para diferentes situaciones y enfoques fotográficos.',
      kodakTriX: 'Película clásica en blanco y negro con hermoso grano y amplia latitud de exposición.',
      fujiPro400H: 'Película de color negativo con tonos de piel suaves y rendición natural del color.',
      ilfordHP5: 'Película versátil en blanco y negro, excelente para fotografía callejera y retratos.',
      lightMeter: 'Fotómetro externo para lecturas precisas de exposición',
      tripod: 'Trípode de fibra de carbono para exposiciones largas y estabilidad',
      filters: 'Filtros UV y polarizadores para protección y control creativo',
      cameraBag: 'Bolsa resistente al clima para transportar equipo de forma segura',
      cleaningKit: 'Mantener las ópticas limpias y libres de polvo'
    },
    about: {
      title: 'Acerca de FILMRICK',
      description: 'Fotógrafo analógico radicado en Ciudad de México, explorando la poesía entre momentos a través de la fotografía analógica',
      letsConnect: 'Conectemos',
      connectDescription: 'Me encantaría escuchar de otros fotógrafos, colaboradores potenciales o cualquier persona interesada en el arte de la fotografía analógica.',
      readOnSubstack: 'Leer en Substack',
      viewGalleries: 'Ver Galerías',
      madeWith: 'Hecho con película y paciencia digital en Ciudad de México'
    },
    footer: {
      brand: 'FILMRICK',
      brandDescription: 'Fotografía analógica desde Ciudad de México. Explorando la poesía entre momentos a través de la fotografía analógica.',
      explore: 'Explorar',
      connect: 'Conectar',
      newsletter: 'Newsletter de Substack',
      newsletterDescription: 'Historias sobre fotografía analógica, técnicas de cuarto oscuro y el arte de ver.',
      copyright: 'Todos los derechos reservados.'
    },
    common: {
      featuredImage: 'Imagen Destacada',
      portraitPhoto: 'Foto de Retrato',
      cameraPhoto: 'Foto de Cámara',
      gallery: 'Galería'
    }
  },
  en: {
    navigation: {
      home: 'Home',
      galleries: 'Galleries',
      stories: 'Stories',
      myGear: 'My Gear',
      about: 'About'
    },
    home: {
      tagline: 'Film Photography from Mexico City',
      title: 'Adventures in Film Photography',
      description: 'Exploring the poetry between moments through analog photography. Galleries, camera reviews, darkroom stories, and everything analog — where every frame counts and light meets emotion.',
      viewGalleries: 'View Galleries',
      readStories: 'Read Stories',
      featuredWork: 'Featured Work',
      featuredDescription: 'Recent explorations in light, shadow, and human connection.',
      viewAllGalleries: 'View All Galleries →',
      featuredStory: 'Featured Story',
      latestFromBlog: 'Latest from the Blog',
      readFullStory: 'Read Full Story',
      quote: 'Photography is not just about freezing time; it\'s about understanding the poetry that exists in the space between moments.',
      quoteAuthor: '— On the art of seeing'
    },
    galleries: {
      title: 'Galleries',
      description: 'Collections of moments captured on film, each telling a story through light, shadow, and emotion.',
      noGalleries: 'No galleries available yet.',
      checkBack: 'Check back soon for new collections of film photography.'
    },
    stories: {
      title: 'Stories',
      description: 'Tales from the analog world: camera reviews, darkroom adventures, and reflections on the art of film photography.',
      noStories: 'No stories available yet.',
      checkBack: 'Check back soon for tales from the analog world.'
    },
    myGear: {
      title: 'My Gear',
      description: 'The cameras, lenses, and tools that help me capture the poetry of everyday moments on film.',
      cameras: 'Cameras',
      lenses: 'Lenses',
      filmStocks: 'Favorite Film Stocks',
      accessories: 'Essential Accessories',
      primaryCamera: 'Primary Camera',
      secondaryCamera: 'Secondary Camera',
      primaryCameraDesc: 'Details about your main film camera, why you chose it, and what makes it special for your photography.',
      secondaryCameraDesc: 'Your backup or specialized camera for different situations and photographic approaches.',
      kodakTriX: 'Classic black and white film with beautiful grain and wide exposure latitude.',
      fujiPro400H: 'Color negative film with smooth skin tones and natural color rendition.',
      ilfordHP5: 'Versatile black and white film, great for street photography and portraits.',
      lightMeter: 'External light meter for precise exposure readings',
      tripod: 'Carbon fiber tripod for long exposures and stability',
      filters: 'UV and polarizing filters for protection and creative control',
      cameraBag: 'Weather-resistant bag for carrying gear safely',
      cleaningKit: 'Keeping optics clean and dust-free'
    },
    about: {
      title: 'About FILMRICK',
      description: 'Film photographer based in Mexico City, exploring the poetry between moments through analog photography',
      letsConnect: 'Let\'s Connect',
      connectDescription: 'I\'d love to hear from fellow photographers, potential collaborators, or anyone interested in the art of analog photography.',
      readOnSubstack: 'Read on Substack',
      viewGalleries: 'View Galleries',
      madeWith: 'Made with film and digital patience in Mexico City'
    },
    footer: {
      brand: 'FILMRICK',
      brandDescription: 'Film photography from Mexico City. Exploring the poetry between moments through analog photography.',
      explore: 'Explore',
      connect: 'Connect',
      newsletter: 'Substack Newsletter',
      newsletterDescription: 'Stories about analog photography, darkroom techniques, and the art of seeing.',
      copyright: 'All rights reserved.'
    },
    common: {
      featuredImage: 'Featured Image',
      portraitPhoto: 'Portrait Photo',
      cameraPhoto: 'Camera Photo',
      gallery: 'Gallery'
    }
  }
}

export const defaultLanguage: Language = 'es'

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations[defaultLanguage]
}