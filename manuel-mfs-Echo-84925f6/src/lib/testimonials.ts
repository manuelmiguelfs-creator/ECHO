export type Testimonial = {
  id: string;
  displayName: string;
  fullName: string;
  birthDate: string;
  nationality?: string;
  bio: string;
  featured: boolean;
  initials: string;
  color: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "david-beckham",
    displayName: "David Beckham",
    fullName: "David Robert Joseph Beckham",
    birthDate: "1975-05-02",
    nationality: "British",
    bio: "Former professional footballer, president and co-owner of Inter Miami CF, and co-owner of Salford City F.C.",
    featured: true,
    initials: "DB",
    color: "bg-blue-soft",
  },
  {
    id: "camila-cabello",
    displayName: "Camila Cabello",
    fullName: "Karla Camila Cabello Estrabao",
    birthDate: "1997-03-03",
    bio: "Singer and songwriter recognized as an influential figure in contemporary pop music.",
    featured: true,
    initials: "CC",
    color: "bg-pink-soft",
  },
  {
    id: "lili-reinhart",
    displayName: "Lili Reinhart",
    fullName: "Lili Pauline Reinhart",
    birthDate: "1996-09-13",
    nationality: "American",
    bio: "Actor, producer, writer, and singer.",
    featured: true,
    initials: "LR",
    color: "bg-sage-light",
  },
  {
    id: "amanda-seyfried",
    displayName: "Amanda Seyfried",
    fullName: "Amanda Michelle Seyfried",
    birthDate: "1985-12-03",
    bio: "Actor recognized with major television and film awards and nominations.",
    featured: false,
    initials: "AS",
    color: "bg-ochre-light",
  },
  {
    id: "ariana-grande",
    displayName: "Ariana Grande",
    fullName: "Ariana Grande-Butera",
    birthDate: "1993-06-26",
    bio: "Singer, songwriter, and actor known for a wide vocal range.",
    featured: false,
    initials: "AG",
    color: "bg-pink-soft",
  },
  {
    id: "aly-raisman",
    displayName: "Aly Raisman",
    fullName: "Alexandra Rose Raisman",
    birthDate: "1994-05-25",
    bio: "Retired artistic gymnast and two-time Olympian.",
    featured: false,
    initials: "AR",
    color: "bg-blue-soft",
  },
  {
    id: "katy-perry",
    displayName: "Katy Perry",
    fullName: "Katheryn Elizabeth Hudson",
    birthDate: "1984-10-25",
    bio: "Singer, songwriter, and television personality.",
    featured: false,
    initials: "KP",
    color: "bg-terracotta-light",
  },
  {
    id: "nf",
    displayName: "NF",
    fullName: "Nathan John Feuerstein",
    birthDate: "1991-03-30",
    bio: "Rapper, singer, songwriter, and producer.",
    featured: false,
    initials: "NF",
    color: "bg-sage-light",
  },
  {
    id: "john-green",
    displayName: "John Green",
    fullName: "John Michael Green",
    birthDate: "1977-08-24",
    bio: "Author, YouTuber, entrepreneur, and producer.",
    featured: false,
    initials: "JG",
    color: "bg-blue-soft",
  },
  {
    id: "howie-mandel",
    displayName: "Howie Mandel",
    fullName: "Howard Michael Mandel",
    birthDate: "1955-11-29",
    bio: "Comedian, television host, actor, and producer.",
    featured: false,
    initials: "HM",
    color: "bg-ochre-light",
  },
];
