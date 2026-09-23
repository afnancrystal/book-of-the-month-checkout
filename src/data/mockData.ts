import type { Address, Book } from '../types';

export const books: Book[] = [
  { id:'book-1', title:'The Midnight Library', author:'Matt Haig', coverImage:'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg', price:17.99 },
  { id:'book-2', title:'Tomorrow, and Tomorrow, and Tomorrow', author:'Gabrielle Zevin', coverImage:'https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg', price:18.99 },
  { id:'book-3', title:'The Vanishing Half', author:'Brit Bennett', coverImage:'https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg', price:16.99 }
];

export const address: Address = { name:'Alex Morgan', street:'125 Reader Lane', city:'Austin', state:'TX', zip:'78701' };
