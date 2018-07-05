export default {
  'en-US': {
    intro: {
      title: 'Help O`Greeny',
      desc1:
        'Our little lepprechaun O`Greeny was chilling, having a cold Guiness while his money was stolen.',
      desc2: 'He has been looking all over the world for it but cannot find it. Help him!',
      button: 'Start game',
      nameplaceholder: 'Your name',
    },
    header: {
      city: 'City',
      casino: 'Casino',
      airport: 'Airport',
      police: 'Police',
      hotel: 'Hotel',
      profile: 'Profile',
    },
    rules: {
      intro:
        'You are now a detective and need to find clues on each city to find out the thief`s whereabouts.',
      task: 'Your task:',
      task1: 'Capture the criminal and find the stolen gold.',
      rules: 'Rules',
      money:
        'You start with {money} €. In each city there is a casino with different games where you can earn more money.',
    },
    profile: {
      header: 'Hello {name}',
      label: 'Your profile',
      points: 'Points',
      time: 'Time remaining: {seconds} seconds',
      money: 'Money',
      earn_money: 'Earn money',
      rules: 'Rules',
      find: 'Find him',
      items: 'Items',
    },
    casino: {
      title: 'Welcome to the casino of {city}',
      welcome: 'What can I do for you?',
      cards: 'Play Cards',
      loading: 'Loading cards',
      pairs_found: 'Pairs found:',
      time: 'Time: {seconds} seconds',
      timeup: 'Your time is up!',
      all_found: 'Great! You found all the pairs!',
      timeup_answer: 'Your time is up, you`ve found {pairs} pairs.',
      money: 'You`ve won {money} €. You now have {total} €',
      back_profile: 'Back to the profile',
      back_city: 'Back to the city',
      forget: 'Did you forget something?',
    },
    airport: {
      title: 'Welcome to the airport of {city}',
      choose: 'What do you want to do?',
      closed: 'The airport is closed, come back after 7 A.M.',
      destinations: 'Destinations',
      activities: 'Activities',
      waiter_intro: 'What can I do for you?',
	  waiter_flag: 'A guy talking about some stolen gold took a flight with this flag on it.',
      buy_food:
        'It was delicious and you feel recovered. You have now {money} €. Now, get back to work! You are a detective, not a tourist!',
      no_money: 'I am afraid you have no money to pay for it',
      plane_no_money:
        'I am afraid you do not have money to pay for that flight. Your account has {money} €',
      found_gold: 'O`Greeny is really happy to have his gold back!',
      found_city: 'You found him! He was hiding in {city}',
      found_lightbox: 'Yes, he was here but he already left.',
      not_found_lightbox: 'No sorry, he was not here.',
      tickets: 'You`ve spent 30 € on the tickets and have {money} € left. ',
      lightbox_correct: 'Correct!',
      lightbox_incorrect: 'Incorrect!',
    },
    police: {
      title: 'Welcome to the Police Department of {city}',
      info: 'I heard you are looking for the thief who stole O`Greeny`s money',
      interpol: 'Interpol sent us these 3 pictures. It might be his next destination.',
      info_desc: 'Tengo información interesante si pagas por ella ',
      info_money: 'Pagar 10€ por la información',
      photo_info:
        'Pagas 10€ y consigues las fotos en buena calidad junto a su titulo. Ahora tienes {money}',
      airport_info:
        'El agente te muestra las 3 fotos. ¿Ya sabes la siguiente ciudad? ¡Ve al aeropuerto!',
      corrupt_cop:
        'Agente de Policia Corrupto: ¡Esta información no es gratis! Cuesta 10 € y tu cuenta tiene {money}',
    },
    cities: {
      berlin: {
        name: 'Berlin',
        food: 'Have a bratwurst',
        '1': 'Did you know Berlin has more Döner Kebap shops than Istanbul?',
        '2':
          'Did you know the Berliner Fernsehturm is the tallest building in Germany with 368 meters?',
        '3': 'Did you know Berlin has more museums (180) than rainy days (108)?',
      },
      paris: {
        name: 'Paris',
        food: 'Have a croissant',
        '1': 'Did you know Paris was originally a Roman City called Lutetia ?',
        '2': 'Did you know that there are more than 1700 bakeries in Paris ?',
        '3': 'Did you know that the Eiffel Tower was meant to be temporary ?',
      },
      rome: {
        name: 'Rome',
        food: 'Have a pizza',
        '1': 'Did you know Rome has 280 fountains and more than 900 churches ?',
        '2': 'Did you know Rome has a museum dedicated entirely to pasta ?',
        '3':
          'Did you know Rome’s mascot is a wolf that cared for the brothers Romulus and Remus, the legendary founders of Rome ?',
      },
      madrid: {
        name: 'Madrid',
        food: 'Have a cocido',
        '1': 'Did you know that Madrid is the highest capital in Europe ?',
        '2': 'Did you know the oldest restaurant in the world (1752) is located in Madrid ?',
        '3': 'Did you know Madrid coat of arms is a bear and a tree ?',
      },
      athens: {
        name: 'Athens',
        food: 'Have a souvlaki',
        '1': 'Did you know Athens is Europe`s oldest capital (3400 B.C.) ?',
        '2': 'Did you know Athens was the first ever European Cultural Capital ?',
        '3': 'Did you know Athens has 148 theatrical stages ?',
      },
      zakynthos: {
        name: 'Zakynthos',
        food: 'Have a moussaka',
        '1': 'Did you know Zakynthos escaped Ottoman domination but was subject of the Republic of Venice for centuries ?',
        '2': 'Did you know Zakynthos touristic development begun in 1965 ?',
        '3': 'Did you know Homer was the first to mention Zakynthos in his Odyssey and Iliad masterpieces ?',
      },
      amsterdam: {
        name: 'Amsterdam',
        food: 'Have a heineken',
        '1': 'Did you know there are approximately 881.000 bicycles in Amsterdam ?',
        '2': 'Did you know there are more than 2500 houseboats in Amsterdam ?',
        '3': 'Did you know Amsterdam lies below sea level ?',
      },
      oslo: {
        name: 'Oslo',
        food: 'Have a smoked Salmon',
        1: 'Did you know the Nobel Peace Prize is awarded in Oslo every year?',
        2: 'Did you know there are 40 islands and 343 lakes within Oslo limits ?',
        3: 'Did you know Oslo donates the Trafalgar Square Christmas tree in London every year in gratitude to the people of London for their assistance during WWII ?',
      },
      prague: {
        name: 'Prague',
        food: 'Have a trdelnik',
        1: 'Did you know the historic centre of Prague was added to Unesco’s World Heritage list in 1992 ?',
        2: 'Did you know Prague Castle is the largest ancient castle complex in the world ?',
        3: 'Did you know Prague astronomical clock was installed in 1410 and is still working ?',
      },
      krakow: {
        name: 'Krakow',
        food: 'Have a pierogi',
        1: 'Did you know Krak0w’s Market Square is the largest medieval commercial square in Europe ?',
        2: 'Did you know Krakow was the capital of Poland for over 500 years ?',
        3: 'Did you know Kraków University, established in the 14th century, is the oldest university in Poland ?',
      },
    },
    facts: {
      berlin: {
        '1': 'Did you know Berlin has more Döner Kebap shops than Istanbul?',
        '2':
          'Did you know the Berliner Fernsehturm is the tallest building in Germany with 368 meters?',
        '3': 'Did you know Berlin has more museums (180) than rainy days (108)?',
      },
    },
  },
  'es-ES': {
    intro: {
      title: 'Ayuda a O`Greeny',
      desc1:
        'Nuestro pequeño lepprechaun O`Greeny estaba tomandose una cerveza Guiness fría mientras robaban su oro.',
      desc2: 'Ha estado buscando por todo el mundo pero no lo encuentra. Ayúdalo!',
      button: 'Comenzar juego',
      nameplaceholder: 'Tu nombre',
    },
    header: {
      city: 'Ciudad',
      casino: 'Casino',
      airport: 'Aeropuerto',
      police: 'Policía',
      hotel: 'Hotel',
      profile: 'Perfil',
    },
    rules: {
      intro:
        'Eres un detective y tienes que conseguir pistas en cada ciudad para descubir el paradero del ladrón.',
      task: 'Tu tarea:',
      task1: 'Captura al criminal y recupera el dinero robado.',
      rules: 'Reglas',
      money:
        'Empiezas con {money} €. En cada ciudad tienes un casino con diferentes juegos para poder ganar dinero.',
    },
    profile: {
      header: 'Hola {name}',
      label: 'Tu perfil',
      points: 'Puntos',
      time: 'Tiempo restante: {seconds} segundos',
      money: 'Dinero',
      earn_money: 'Gana dinero',
      rules: 'Reglas',
      find: 'Encuéntralo',
      items: 'Objectos',
    },
    casino: {
      title: 'Bienvenido al casino de {city}',
      welcome: '¿En qué puedo ayudarte?',
      cards: 'Jugar a las cartas',
      loading: 'Cargando cartas',
      pairs_found: 'Parejas encontradas:',
      time: 'Tiempo: {seconds} segundos',
      timeup: '¡Se acabó el tiempo !',
      all_found: '¡Bien! ¡Has encontrado todas las parejas!',
      timeup_answer: 'Se acabó el tiempo, has encontrado {pairs} parejas.',
      money: 'Has conseguido {money} €. Ahora tienes {total} €',
      back_profile: 'Volver al perfil',
      forget: '¿Has olvidado algo?',
      back_city: 'Volver a la ciudad',
    },
    airport: {
      title: 'Bienvenido al aeropuerto de {city}',
      choose: '¿Qué quieres hacer?',
      closed: 'El aeropuerto está cerrado, vuelve a las 7 de la mañana.',
      destinations: 'Destinos',
      activities: 'Actividades',
      waiter_intro: '¿En qué puedo ayudarte?',
	  waiter_flag: 'Alguien que hablaba sobre un oro robado se subió a un avion con esta bandera.',
      buy_food:
        'Estaba delicioso y te sientes mejor. Te quedan {money} €. Pero ahora, ¡vuelve al trabajo! ¡Eres un detective, no un turista!',
      plane_no_money:
        'Me temo que no tienes dinero para pagar ese vuelo. En la cuenta te quedan {money} €',
      no_money: 'Me temo que no tienes dinero para pagar.',
      found_gold: '¡O Greeny está muy contento de recuperar su oro!',
      found_city: '¡Lo encontraste! Estaba escondido en {city}',
      found_lightbox: 'Sí, ha estado aquí pero se ha ido a otra ciudad.',
      not_found_lightbox: 'No, lo siento, no ha estado aquí.',
      tickets: 'Has pagado 30 € por los billetes, te quedan {money} €',
      lightbox_correct: '¡Correcto!',
      lightbox_incorrect: '¡Incorrecto!',
    },

    cities: {
      berlin: {
        name: 'Berlin',
        food: 'Tómate un bratwurst',
        '1': '¿Sabías que Berlin tiene más Döner Kebap que Estambul?',
        '2':
          '¿Sabías que la Fernsehturm de Berlin es el edificio más alto de Alemania con 368 metros?',
        '3': '¿Sabías que Berlin tiene más museos (180) que dias de lluvia (108)?',
      },
      paris: {
        name: 'París',
        food: 'Tómate un croissant',
        '1': '¿Sabías que París era originalmente una ciudad romana llamada Lutecia?',
        '2': '¿Sabías que hay más de 1700 panaderias en París?',
        '3': '¿Sabías que la Torre Eiffel iba a ser temporal?',
      },
      rome: {
        name: 'Roma',
        food: 'Tómate una pizza',
        '1': '¿Sabías que Roma tiene más de 280 fuentes y más de 900 iglesias?',
        '2': '¿Sabías que Roma tiene un museo dedicado unicamente a la pasta?',
        '3':
          '¿Sabías que la mascota de Roma es una loba que cuido a Romulo y Remo, legendarios fundadores de Roma?',
      },
      madrid: {
        name: 'Madrid',
        food: 'Tómate un cocido',
        1: '¿Sabías que Madrid es la capital más alta de Europa?',
        2: '¿Sabías que el restaurante más antiguo del mundo (1752) esta situado en Madrid?',
        3: '¿Sabías que el escudo de Madrid es un oso y un madroño?',
      },
      athens: {
        name: 'Atenas',
        food: 'Tómate un souvlaki',
        1: '¿Sabías que Atenas es la capital más antigua (3400 A.C.) de Europa?',
        2: '¿Sabías que Atenas fue la primera Capital Europea de la Cultura?',
        3: '¿Sabías que Atenas tiene 148 teatros?',
      },
      zakynthos: {
        name: 'Zakynthos',
        food: 'Tómate una moussaka',
        '1': '¿Sabías que Zakynthos escapó a la dominación otomana pero fue parte del reino de Venecia durante siglos?',
        '2': '¿Sabías que el desarrollo turistico de Zakynthos empezó en 1965 ?',
        '3': '¿Sabías que Homero fue el primero en mencionar Zakynthos en la Odisea y la Iliada?',
      },
      amsterdam: {
        name: 'Amsterdam',
        food: 'Bébete una Heineken',
        1: '¿Sabías que hay aproximadamente 881.000 bicicletas en Amsterdam?',
        2: '¿Sabías que hay más de 2500 casas barco en Amsterdam?',
        3: '¿Sabías que Amsterdam esta bajo el nivel del mar?',
      },
      oslo: {
        name: 'Oslo',
        food: 'Tómate un salmón ahumado',
        1: '¿Sabías que el premio Nobel de la Paz es concedido en Oslo cada año?',
        2: '¿Sabías que hay 40 islas y 343 lagos dentro del perímetro urbano de Oslo?',
        3: '¿Sabías que Oslo dona cada año el árbol de Navidad de la plaza de Trafalgar en agradecimiento a su asistencia durante la segunda guerra mundial?',
      },
      prague: {
        name: 'Praga',
        food: 'Tómate un trdelnik',
        1: '¿Sabías que el centro histórico de Praga fue incluido en la lista del Patrimonio Mundial de la UNESCO en 1992?',
        2: '¿Sabías que el castillo de Praga es el conjunto palaciego más grande y antiguo del mundo?',
        3: '¿Sabías que el reloj astronómico de Praga fue instalado en 1410 y todavía sigue funcionando?',
      },
      krakow: {
        name: 'Cracovia',
        food: 'Tómate un pierogi',
        1: '¿Sabías que la plaza del mercado de Cracovia es la plaza medieval comercial más grande de Europa?',
        2: '¿Sabías que Cracovia fue la capital de Polonia durante más de 500 años?',
        3: '¿Sabías que la universidad de Cracovia, establecida en el siglo 14, es la universidad más antigua de Polonia?',
      },
    },

    police: {
      title: 'Bienvenido al Departamento de Policia de {city}',
      info: 'Me han dicho que buscas al ladrón que robó el dinero de O`Greeny',
      interpol: 'La Interpol nos ha enviado estas 3 fotos. Puede que sea su siguiente destino.',
      info_desc: 'Tengo información interesante si pagas por ella',
      info_money: 'Pagar 10€ por la información',
      photo_info:
        'Pagas 10€ y consigues las fotos en buena calidad junto a su titulo. Ahora tienes {money}',
      airport_info:
        'El agente te muestra las 3 fotos. ¿Ya sabes la siguiente ciudad? ¡Ve al aeropuerto!',
      corrupt_cop:
        'Agente de Policia Corrupto: ¡Esta información no es gratis! Cuesta 10 € y tu cuenta tiene {money}',
    },
    facts: {
      berlin: {
        '1': '¿Sabías que Berlin tiene más Döner Kebap que Estambul?',
        '2':
          '¿Sabías que la Fernsehturm de Berlin es el edificio más alto de Alemania con 368 metros?',
        '3': '¿Sabías que Berlin tiene más museos (180) que dias de lluvia (108)?',
      },
    },
  },
};
