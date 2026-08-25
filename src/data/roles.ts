import type { Role } from '../types'

/** Village / autres — ordre de priorité pour le shuffle */
export const VILLAGE_ROLES: Role[] = [
  { id: 'voyante', nom: 'Voyante', emoji: '🔮', camp: 'village', description: "Découvre la véritable identité d'un joueur chaque nuit.", custom: false },
  { id: 'sorciere', nom: 'Sorcière', emoji: '🧪', camp: 'village', description: "Possède deux fioles uniques : une de soin pour sauver la victime des loups, et une de poison pour éliminer un joueur.", custom: false },
  { id: 'protecteur', nom: 'Protecteur', emoji: '🛡️', camp: 'village', description: "Désigne un joueur chaque nuit pour le protéger contre l'attaque des loups.", custom: false },
  { id: 'chasseur', nom: 'Chasseur', emoji: '🏹', camp: 'village', description: "S'il vient à mourir, il tire une dernière balle pour éliminer immédiatement le joueur de son choix.", custom: false },
  { id: 'alien', nom: 'Alien', emoji: '👽', camp: 'neutre', description: "Fait un signe discrètement au narrateur en cours de partie pour deviner le rôle exact d'un joueur. S'il réussit, le joueur meurt ; s'il se trompe, l'Alien meurt sur-le-champ.", custom: false },
  { id: 'corbeau', nom: 'Corbeau', emoji: '🐦', camp: 'village', description: "Désigne un joueur chaque nuit pour lui ajouter automatiquement deux voix de pénalité lors du vote du lendemain.", custom: false },
  { id: 'pute', nom: 'Pute', emoji: '💋', camp: 'village', description: "Passe la nuit chez le joueur de son choix. Si les loups l'attaquent directement chez elle, elle survit à l'attaque.", custom: false },
  { id: 'enfant-sauvage', nom: 'Enfant sauvage', emoji: '🧒', camp: 'neutre', description: '', custom: false },
  { id: 'ours', nom: 'Ours', emoji: '🐻', camp: 'village', description: "Grogne au lever du jour si au moins un loup-garou est directement assis à sa gauche ou à sa droite.", custom: false },
  { id: 'voleur', nom: 'Voleur', emoji: '🎭', camp: 'village', description: "La première nuit, il échange sa carte avec celle d'un autre joueur et découvre son nouveau rôle.", custom: false },
  { id: 'barbie', nom: 'Barbie', emoji: '💅', camp: 'village', description: "Fait un signe au narrateur en cours de partie pour tenter de deviner si un joueur est un Loup-Garou ou un Villageois (Loup / Non-Loup).", custom: false },
  { id: 'ange', nom: 'Ange', emoji: '😇', camp: 'village', description: "Cherche à se faire éliminer lors du tout premier vote du village pour remporter immédiatement la partie.", custom: false },
  { id: 'berger', nom: 'Berger', emoji: '🐑', camp: 'village', description: "Commande ses moutons chaque nuit pour vérifier l'alignement ou bloquer les actions de certains joueurs.", custom: false },
  { id: 'feurgeron', nom: 'Feurgeron', emoji: '🔥', camp: 'village', description: "Transmet son épée magique à un joueur de son choix lors de la deuxième nuit.", custom: false },
  { id: 'ancien', nom: 'Ancien', emoji: '👴', camp: 'village', description: "Résiste à la première attaque directe des loups-garous, mais si le village l'élimine, tous les villageois perdent leurs pouvoirs.", custom: false },
  { id: 'detective', nom: 'Détective', emoji: '🕵️', camp: 'village', description: "Enquête discrètement pour comparer l'alignement ou découvrir les indices du rôle de deux joueurs ciblés durant la nuit.", custom: false },
  { id: 'singe', nom: 'Singe', emoji: '🐒', camp: 'village', description: "Il est sondé comme un Loup-Garou par la Voyante (ou vu comme un Loup), mais il fait partie du camp des Villageois et cherche à éliminer les loups.", custom: false },
  { id: 'petite-fille', nom: 'Petite Fille', emoji: '👧', camp: 'village', description: "Elle peut espionner discrètement les Loups-Garous pendant leur tour de nuit, mais si elle se fait repérer, elle meurt.", custom: false },
  { id: 'cavalier', nom: 'Cavalier', emoji: '🐎', camp: 'village', description: "S'il est tué par les Loups-Garous, le premier loup à sa gauche meurt de l'infection.", custom: false },
  { id: 'institutrice', nom: "L'Institutrice", emoji: '👩‍🏫', camp: 'village', description: "Elle peut interdire à un joueur de voter pendant le débat de la journée, mais elle n'a jamais le droit de voter elle-même.", custom: false },
  { id: 'chien-loup', nom: 'Chien-Loup', emoji: '🐕', camp: 'neutre', description: "Choisit dès la première nuit s'il souhaite être un Simple Villageois ou un Loup-Garou pour toute la partie.", custom: false },
]

/** Camp loup — ordre de priorité pour le shuffle */
export const LOUP_ROLES: Role[] = [
  { id: 'pere-infecte', nom: 'Père infecté', emoji: '🦠', camp: 'loup', description: "Peut choisir d'infecter la victime des loups une fois par partie pour la transformer en loup-garou tout en lui gardant son pouvoir initial.", custom: false },
  { id: 'loup-bleu', nom: 'Loup bleu', emoji: '🔵', camp: 'loup', description: "Peut masquer la véritable nature d'un loup pour qu'il soit perçu comme un simple villageois (notamment auprès de la Voyante).", custom: false },
  { id: 'loup-noir', nom: 'Loup noir', emoji: '🌑', camp: 'loup', description: "Possède le pouvoir de faire taire (silence) un joueur spécifique durant la nuit, l'empêchant de parler le jour suivant.", custom: false },
  { id: 'loup-simple', nom: 'Loup simple', emoji: '🐺', camp: 'loup', description: "Se réveille chaque nuit avec la meute pour désigner et dévorer une victime.", custom: false },
]

export const BASE_ROLES: Role[] = [...LOUP_ROLES, ...VILLAGE_ROLES]

export const CAPITAINE_BADGE = {
  nom: 'Capitaine',
  emoji: '🎖️',
  description: "Titre attribué par vote du village dont la voix compte double lors des égalités. S'il meurt, il désigne son successeur.",
}

export const CAMP_LABEL: Record<Role['camp'], string> = {
  village: 'Village',
  loup: 'Loup',
  neutre: 'Neutre',
}

export const EMOJI_PICKER = [
  '🐺', '🌙', '🔮', '🧪', '🛡️', '🏹', '👽', '🧒', '🐦‍⬛', '💋', '🐻',
  '🎭', '💅', '😇', '🐑', '🔥', '👴', '🦠', '🔵', '🌑', '🎖️',
  '💀', '🕯️', '🦊', '🦉', '🪄', '⚔️', '👑', '🩸', '🌲', '⭐',
]
