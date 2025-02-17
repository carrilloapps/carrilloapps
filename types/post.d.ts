export type Posts = Post[];

interface RenderedContent {
  rendered: string;
}

interface ProtectedContent extends RenderedContent {
  protected: boolean;
}

interface Meta {
  _acf_changed: boolean;
  yasr_overall_rating: number;
  yasr_post_is_review: string;
  yasr_auto_insert_disabled: string;
  yasr_review_type: string;
  footnotes: string;
}

interface Robots {
  index: string;
  follow: string;
  "max-snippet": string;
  "max-image-preview": string;
  "max-video-preview": string;
}

interface OgImage {
  width: number;
  height: number;
  url: string;
  type: string;
}

interface TwitterMisc {
  "Escrito por": string;
  "Tiempo de lectura": string;
}

interface GraphCommon {
  "@type": string;
  "@id": string;
}

interface Graph extends GraphCommon {
  url: string;
  name: string;
  isPartOf: GraphCommon;
  primaryImageOfPage: GraphCommon;
  image: GraphCommon;
  thumbnailUrl: string;
  datePublished: string;
  dateModified: string;
  author: GraphCommon;
  description: string;
  breadcrumb: GraphCommon;
  inLanguage: string;
  potentialAction: PotentialAction[];
}

interface PotentialAction {
  "@type": string;
  target: string[];
}

interface Schema {
  "@context": string;
  "@graph": (Graph | GraphCommon | boolean)[];
}

interface YoastHeadJson {
  title: string;
  description: string;
  robots: Robots;
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_published_time: string;
  article_modified_time: string;
  og_image: OgImage[];
  author: string;
  twitter_card: string;
  twitter_misc: TwitterMisc;
  schema: Schema;
}

interface AuthorMeta {
  ID: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: string;
  display_name: string;
}

interface YasrVisitorVotes {
  stars_attributes: {
    read_only: boolean;
    span_bottom: boolean;
  };
  number_of_votes: number;
  sum_votes: number;
}

interface Links {
  self: { href: string; targetHints?: { allow: string[] } }[];
  collection: { href: string }[];
  about: { href: string }[];
  author: { embeddable: boolean; href: string }[];
  replies: { embeddable: boolean; href: string }[];
  "version-history": { count: number; href: string }[];
  "predecessor-version": { id: number; href: string }[];
  "wp:featuredmedia": { embeddable: boolean; href: string }[];
  "wp:attachment": { href: string }[];
  "wp:term": { taxonomy: string; embeddable: boolean; href: string }[];
  curies: { name: string; href: string; templated: boolean }[];
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedContent;
  content: ProtectedContent;
  excerpt: ProtectedContent;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Meta;
  categories: number[];
  tags: number[];
  class_list: string[];
  acf: any[];
  yoast_head: string;
  yoast_head_json: YoastHeadJson;
  author_meta: AuthorMeta;
  yasr_visitor_votes: YasrVisitorVotes;
  _links: Links;
}
