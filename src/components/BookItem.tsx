import type { Book } from '../types';
export function BookItem({ book }: { book: Book }) {
  return <article className="book-row">
    <img src={book.coverImage} alt={`Cover of ${book.title}`} />
    <div className="book-copy"><h3>{book.title}</h3><p>{book.author}</p></div>
    <strong>${book.price.toFixed(2)}</strong>
  </article>;
}
