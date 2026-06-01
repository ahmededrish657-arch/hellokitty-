/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared Interfaces
export interface Character {
  id: string;
  name: string;
  jpName?: string;
  image: string;
  spotlightImage?: string;
  birthday: string;
  personality: string;
  favorite: string;
  tags: string[];
  description: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  stats: {
    sweetness: number;
    kindness: number;
    mischief: number;
    patience: number;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'Plushies' | 'Stationery' | 'Home' | 'Fashion';
  image: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Event' | 'New Arrival' | 'Park Update' | 'Celebration';
  date: string;
  image: string;
  description: string;
  badge: string;
  bgGrad: string;
}

// 1. Core Character Records with exact Hotlinked assets
export const CHARACTERS: Character[] = [
  {
    id: "hello-kitty",
    name: "Hello Kitty",
    jpName: "ハローキティ",
    image: "https://cdn.phototourl.com/free/2026-05-30-8d002f52-ceb4-498f-a86b-739de9acfa09.jpg",
    spotlightImage: "https://cdn.phototourl.com/free/2026-05-30-8d002f52-ceb4-498f-a86b-739de9acfa09.jpg",
    birthday: "Nov 1st",
    personality: "Kind & Cheerful",
    favorite: "Apple Pie",
    tags: ["Iconic", "Kind", "Pianist"],
    description: "A bright and kind-hearted girl. She loves baking cookies, playing the piano, and dreams of becoming a pianist or poet. Perfect at making new friends, she always says 'you can never have too many friends!'",
    accentColor: "#FF5E7E",
    textColor: "text-[#FF5E7E]",
    bgColor: "bg-[#FFF0F2]",
    stats: {
      sweetness: 100,
      kindness: 100,
      mischief: 10,
      patience: 90,
    }
  },
  {
    id: "my-melody",
    name: "My Melody",
    jpName: "マイメロディ",
    image: "https://cdn.phototourl.com/free/2026-05-30-3b438385-3149-46cc-a1f4-b7f3a8a2ee53.jpg",
    spotlightImage: "https://cdn.phototourl.com/free/2026-05-30-3b438385-3149-46cc-a1f4-b7f3a8a2ee53.jpg",
    birthday: "Jan 18th",
    personality: "Honest & Gentle",
    favorite: "Almond Cake",
    tags: ["Sweet", "Baker", "Caring"],
    description: "Incredibly sweet and honest, she wears a lovely pink hood handmade by her grandmother. She loves baking pound cakes with her mother and eating delicious almond cake with her cute mouse friend Flat.",
    accentColor: "#FF8EAA",
    textColor: "text-[#FF8EAA]",
    bgColor: "bg-[#FFEBF0]",
    stats: {
      sweetness: 98,
      kindness: 95,
      mischief: 8,
      patience: 95,
    }
  },
  {
    id: "kuromi",
    name: "Kuromi",
    jpName: "クロミ",
    image: "https://cdn.phototourl.com/free/2026-05-30-b0e3c9c4-3fc8-4494-8aad-7dc9c7bd05b7.jpg",
    spotlightImage: "https://cdn.phototourl.com/free/2026-05-30-b0e3c9c4-3fc8-4494-8aad-7dc9c7bd05b7.jpg",
    birthday: "Oct 31st",
    personality: "Spunky Rebel",
    favorite: "Shallots",
    tags: ["Spunky", "Sassy", "Dreamer"],
    description: "The cheeky, punk-inspired rival of My Melody! Although she might look a little mischievous, she has a heart of gold, loves romance novels, writes in her diary, and is secretly very girly.",
    accentColor: "#9D6BFF",
    textColor: "text-[#9D6BFF]",
    bgColor: "bg-[#F3EEFF]",
    stats: {
      sweetness: 75,
      kindness: 88,
      mischief: 92,
      patience: 50,
    }
  },
  {
    id: "pompompurin",
    name: "Pompompurin",
    jpName: "ポムポムプリン",
    image: "https://cdn.phototourl.com/free/2026-05-30-442904b2-c4b4-4baa-837f-d79b64cd3eec.jpg",
    birthday: "April 16th",
    personality: "Laid-back & Friendly",
    favorite: "Caramel Pudding",
    tags: ["Chill", "Pudding", "Collector"],
    description: "A good-natured Golden Retriever pup who loves collecting shoes and wearing his trademark brown beret. He spends most of his day napping and dreams of getting even bigger!",
    accentColor: "#EBB119",
    textColor: "text-[#E6AA00]",
    bgColor: "bg-[#FFFBF0]",
    stats: {
      sweetness: 90,
      kindness: 95,
      mischief: 15,
      patience: 98,
    }
  },
  {
    id: "cinnamoroll",
    name: "Cinnamoroll",
    jpName: "シナモロール",
    image: "https://cdn.phototourl.com/free/2026-05-30-a6b316c7-01c7-40f6-90fc-cf9dba6c622f.jpg",
    birthday: "March 6th",
    personality: "Quite but Friendly",
    favorite: "Cinnamon Rolls",
    tags: ["Dreamy", "Flyer", "Cloud"],
    description: "A shy but incredibly friendly little white puppy with long ears that enable him to fly. He resides at Café Cinnamon where customers adore his fluffy, rolled-up tail that looks just like a cinnamon roll.",
    accentColor: "#4B9EFF",
    textColor: "text-[#4B9EFF]",
    bgColor: "bg-[#EEF6FF]",
    stats: {
      sweetness: 100,
      kindness: 99,
      mischief: 5,
      patience: 90,
    }
  },
  {
    id: "mimmy",
    name: "Mimmy",
    jpName: "ミミィ",
    image: "https://cdn.phototourl.com/free/2026-05-30-10c2c29e-2f0f-4a0b-9f74-b1b40f0eb2d5.jpg",
    birthday: "Nov 1st",
    personality: "Shy & Polite",
    favorite: "Strawberry Shortcake",
    tags: ["Smart", "Twin", "Polite"],
    description: "Hello Kitty's adorable twin sister! She wears a yellow ribbon on her right ear to tell them apart. Mimmy is a bit shy and homebody-like, but she excels at schoolwork, crafts, and is incredibly polite.",
    accentColor: "#FCD02E",
    textColor: "text-[#E49F1B]",
    bgColor: "bg-[#FFFDF0]",
    stats: {
      sweetness: 95,
      kindness: 99,
      mischief: 2,
      patience: 99,
    }
  },
  {
    id: "dear-daniel",
    name: "Dear Daniel",
    jpName: "ディアダニエル",
    image: "https://cdn.phototourl.com/free/2026-05-30-3b474d8e-4a7d-40cc-ad6a-408302fc2e08.jpg",
    birthday: "May 3rd",
    personality: "Sensitive & Artistic",
    favorite: "Cheesecake",
    tags: ["Dancer", "Artistic", "Dreamer"],
    description: "Hello Kitty's childhood friend and soulmate. He is highly artistic, specializes in hip-hop dancing, loves taking pictures, and dreams of becoming a world-renowned photographer or dancer.",
    accentColor: "#1CB0C8",
    textColor: "text-[#1CB0C8]",
    bgColor: "bg-[#E6F8FA]",
    stats: {
      sweetness: 90,
      kindness: 95,
      mischief: 8,
      patience: 85,
    }
  },
  {
    id: "parents",
    name: "George & Mary White",
    jpName: "ジョージ & メアリー",
    image: "https://cdn.phototourl.com/free/2026-05-30-1250990f-161c-49e3-848f-19b9a00a621b.jpg",
    birthday: "Varies",
    personality: "Warm & Loving",
    favorite: "Family Picnics",
    tags: ["Family", "Love", "Nurturing"],
    description: "George is a warm father who loves reading the newspaper and playing with kitty toys, while Mary is a kind mother who bakes delicious apple pies and keeps their lovely cottage absolute perfection.",
    accentColor: "#5FA15F",
    textColor: "text-[#4E8F4E]",
    bgColor: "bg-[#EBF7EB]",
    stats: {
      sweetness: 95,
      kindness: 100,
      mischief: 0,
      patience: 100,
    }
  }
];

// 2. Curated boutique items with exact hotlinks
export const PRODUCTS: Product[] = [
  {
    id: "vintage-rose",
    name: "Vintage Rose Plushie",
    price: 3200,
    rating: 4.9,
    reviewsCount: 148,
    category: "Plushies",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4NsiVnTyeNkGM5xpDmITpVBDOyaEjOj03S-5Mu9DOuJFcRhbcQ-HkWnHL-1yCm-Oay2_JMKe-QRjD4JlFEOY4edlG8SgrEs9LCac1a_R98jAyJrcYUKL7F-ykedNua5_wpvWteB-Tgk4IkegdFNh66S8SpZJnagZ8-9A1VGFdpjsh9EYnJ22ExsAgfY-oB33zoAMpYqZl0dBnFgUxzQ1dBx6jxTUFvmmfobUYo0sN377oqCxJhHpe5QuQ2QNanDt0WoDR1x6-jyE",
    description: "An elegant, limited-edition plush of Hello Kitty holding an exquisitely designed vintage pink rose. Crafted with luxurious soft fabric and styled with classic mid-century lace detailing.",
    tags: ["Limited Edition", "Best Seller"],
    isNew: true,
    isPopular: true
  },
  {
    id: "dreamy-stationery",
    name: "Dreamy Stationery Kit",
    price: 1500,
    rating: 4.8,
    reviewsCount: 89,
    category: "Stationery",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoQK6NIJPxxWptDxUOwl8mBH-Mkd1MhDiZTPsPhDwKn4cJZ4L7EDbVZuwOo1MCr0tkJhSh8DUQLmkuOwEsGQ73fNNEqJ1JfHiT7ObrH0KxY1s3Rn6V9YBOrL_40z9qK6T2tVFkBh5lz1Mxn3koglYFkXJKbrrvMb52POFyIaSqFvTOEJAe85dl6zCb69Y6yZb6zQjA9Hopt-E7f5pf-H9q9eaBcU3zbWu74GlLZAYiApFO0ztG4qIt7yPAO6PjyjbkSnhi4098MFQ",
    description: "An absolute dream for journaling! This kit includes high-gloss holographic stickers, pastel mechanical pencils, a golden metal bow paperclip list, and a premium hardbound ruled journal.",
    tags: ["Pastel", "Must-have"],
    isNew: true
  },
  {
    id: "ceramic-bowl",
    name: "Heart Ceramic Bowl",
    price: 1800,
    rating: 4.7,
    reviewsCount: 204,
    category: "Home",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwrwHfz2YMQsaMtjl0AzuJK8ZGgLg2SNtmDg2GIT_7Bax4Y6xsvqKGBBDR7JdiEpZibf6EmZuAzKeHaiIrGUGhNPHgonEXRz30Xcli0ipCI3Ag4Kk8rVJylwDU7a05IOItm0SW0HDfcmqeoZg-qKIBdbV3Xq8vC2_BXJZYjY6g2NyrDO9qz5cEaU9ZSSQ9spCngQE45qrCbokl5RDjYZPLVNxprXw3Rwlg6JOgVnKF0S4hPDMCn3L9hdTN2DwqtbvE0v87GjWDWDs",
    description: "Durable heart-shaped pink porcelain cereal and soup bowl starring a sweet gold Hello Kitty monogram badge in the interior center. Freezer, oven, and dishwasher safe.",
    tags: ["Tableware", "Gold Motif"],
    isPopular: true
  },
  {
    id: "classic-bow-tee",
    name: "Classic Bow Cotton Tee",
    price: 2800,
    rating: 4.6,
    reviewsCount: 76,
    category: "Fashion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARf5T4twE4oSwNrwvjmyv74T0zhYBSW0cQvf1Kb4gUDGCOva3fOY3Gokd9BK9BIwHBG77Fi3kgz0G2bAeDar96ydYUUzqAYA2q7p6uHU4X8sNWzMFhs20Hjw00OQ7mZSoBr_pAvIPy9XGn0lppiSSNR1GwtxWQnfsM-t8Io98V9PQKfz1Dl9_PBQ4uTbz8qbFo4oSeQtO3BubFZvmIYABcOqaCnJAh1hnSla9XIh_Lo9c398SXJRib--lUvCapj1kZX0hq-f1asrM",
    description: "Premium 100% heavy combed-cotton crewneck t-shirt featuring a classy minimalist Hello Kitty ribbon embroidery at the left breast pocket, tailored for a relaxed, modern unisex fit.",
    tags: ["Unisex", "Minimalist"]
  },
  {
    id: "polka-dot-pack",
    name: "Polka Dot Daypack",
    price: 4500,
    rating: 4.9,
    reviewsCount: 312,
    category: "Fashion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIbGbfYxS4wQMHTsvf6WNu7-r8-MCctyo2nVMZr0Vv9tQp7DhjeengC0ZiQJSGfD2cn0HPTAQmHEzntKUbogNO69pOVme7ogdonWGZUGfZwsJhSaWSw9SvNo1W8FazbQiUKse5YZSa7xn-Z4Fp16jzmmqW-nWGk6Eb3RD8F9YR2CbrZPphdwLL-6TPn7fvEvSO4SMWmgIRhPYkBq6JSVz6SovmeoMYcYUhBgyDaY1ZVahsa0C53XwVmcK2yYN9A1QIoN_NDujrDzQ",
    description: "Extremely spacious retro polka-dot backpack with padded tablet compartment, quick-access front pockets, dynamic ribbon zippers, and water-resistant nylon canvas fabric.",
    tags: ["Best Seller", "School Gear"],
    isPopular: true
  },
  {
    id: "mystery-bag",
    name: "Mystery Charm Bag",
    price: 950,
    rating: 4.5,
    reviewsCount: 512,
    category: "Stationery",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfgVcPMC82yqDZHYXACF5ccyJuIHk6BkdQ0UstsFv7GO21LbEyIkApRAserzravmqHOz0hTauqJUuxW5NNK2kO4kbWNvTJugo06CorDdNNfj2iwvPBIeWd0gnIY5WRvK5Q0sUlN9gsrD0i6BgV9FXrQcKbvxsSi40DF1tS-6tYkhzyaH2_cr3W08F8mg07diskh1K72YZJEisRGePfIG19bHtIbGectGJ6jgm9OLpsLr60nbWCJiCWT63kC1IxUpM6lx-CvFfSz2Q",
    description: "Which charm will you find? Rip open this shiny foil bag to find one of ten vintage acrylic keychains of Sanrio characters swinging inside cute bubbles. Super rare metallic Sanrio gold coin inside 1% of bags!",
    tags: ["Collectibles", "Blind Bag"],
    isNew: true
  }
];

// 3. News Grid Stories
export const NEWS_STORIES: NewsItem[] = [
  {
    id: "cafe-tokyo",
    title: "Grand Opening: Hello Kitty & Friends Café in Shibuya!",
    category: "Event",
    date: "Jun 1st, 2026",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACR-UW6CpgGPgiAzt0227RDzccOMdYL6Jui5LhBEdcJq4_fgzB8-7rjN-J4MhK7Dv2h7kHxPkyLi973-1mumZjKY5uI8amvx7ccFeXlE08OijoIA2ubCg-j9LqPCmF1LunR8yhIOCrYUrWJxzhzJf_Mr_4AMGlu_mqcreaH7APx5dp0iriSf8I4Pko3VCuxCQO-rsS7c0DpxZo4ODHtuckq0cvBv7kboGqFzsAdpVcUU6Xur1cwyKUv84KmTgEwfFLBALQkJHikzY",
    description: "Step into a magical floral paradise custom designed for all sweet tooths. Indulge in tiered pastel cupcakes, cinnamon-spiced flat whites, and character parfaits designed by famous Tokyo pastry chefs, each served in a mini souvenir ceramic bow!",
    badge: "Food & Fun",
    bgGrad: "from-pink-50 to-rose-100"
  },
  {
    id: "spring-plush",
    title: "Spring Bloom Plush Collection is Now Live",
    category: "New Arrival",
    date: "May 25th, 2026",
    image: "https://cdn.phototourl.com/free/2026-05-30-2f03ddd4-3409-4d1c-b470-1b5f2f2ad4ff.jpg",
    description: "Add a touch of warm floral magic to your shelves with limited-edition high-density cotton, premium velvet-lined rose plushies showing Hello Kitty holding matching roses with cute lace dresses.",
    badge: "Exclusive",
    bgGrad: "from-emerald-50 to-teal-100"
  },
  {
    id: "puroland-stars",
    title: "Puroland 'Miracle Gift Parade' Sparkles with New Acts",
    category: "Park Update",
    date: "May 18th, 2026",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpw7dDcMZMLYteZRT9xrpEXqjep9RQyxXAFpzMsY_uCapUUsIqhD4cmwy1f3xIxoPv56C2bYzUe1Lts6nGi4C2QmBEdJ7r-Az4JoAbfXGYPJZUAaBoeq9eZWmv4ZH3x8hXiH772GgzJPBO3ogKBxt0bb2JvRTiS2BMGperyNHxdwMK2UPPfE-lT0cQalBGGpHJOEhpYJUnU745wB-LNcvBzRuITYiMwNq2g9W-A6v1k1uCJTzb_UWR20e62v6JQeJl815ViXcd-s",
    description: "Puroland's signature parade introduces three beautiful, high-altitude aerial acrobatic performances paired with custom projection-mapped stardust lasers and an original symphonic soundtrack.",
    badge: "New Show",
    bgGrad: "from-purple-50 to-indigo-100"
  },
  {
    id: "birthday-bash",
    title: "Kitty and Mimmy's Birthday Bash Reservations",
    category: "Celebration",
    date: "May 12th, 2026",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzujTudFCILWuGQMItRvqDkkohIfQBPrMuSKiWW3OzHOAL1mYQm9KYG3eqGQE9txcqAU8kkaO7lq2YKKsXTQCTpjHMK1Svxqy9n5iUoU4GyEjKTUOTmD5PIbYJX3RKUJTRQyG_GOvd-ouVlLUtgImVSN7OWBnZSoFldmsUrl9hExbQjfIAh2SunBr8pew2_W0_6oGUy0EdfziQREIaDNbyXmMuOqZ7lVRJ6mcAtnW4NCwg8c8OU4zwLwi5ksGGHtUwTWIZ3DxOrDg",
    description: "Register for reservations ahead of the massive November birthday dinner inside the Royal Grand Castle, featuring unique custom birthday shortcake baking sessions and ribbon making workshops.",
    badge: "Big Event",
    bgGrad: "from-amber-50 to-orange-100"
  }
];

export const LUCKY_READINGS = [
  { rating: "120% Sugar Sweet", message: "Today is a beautiful Pink Ribbon Day! Your acts of kindness will blossom. Share a sweet treat with a beloved friend.", ribbonColor: "bg-[#FF5E7E]" },
  { rating: "100% Sunshine Day", message: "Strawberry Fields Forever! A long-lost friend will drop a message. Dress in sweet pastel ribbons for maximum luck.", ribbonColor: "bg-[#FF8EAA]" },
  { rating: "95% Cherry Dream", message: "Your soft words will solve a sweet mystery today. Sit near a bright window and sip delicious almond milk.", ribbonColor: "bg-[#9D6BFF]" },
  { rating: "110% Stardust Lucky", message: "An unexpected pocket coin brings magical opportunities. Go check a vintage drawer—you might find precious ribbons!", ribbonColor: "bg-[#4B9EFF]" },
  { rating: "85% Cozy Apple Pie", message: "Bake a lovely memory with close family today! Hello Kitty's mother says warm kitchen cinnamon smells double your focus.", ribbonColor: "bg-[#EBB119]" }
];
