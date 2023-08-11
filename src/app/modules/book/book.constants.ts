import { IGenre } from './book.interface';

export const bookFiltrableFields = [
  'searchTerm',
  'id',
  'author',
  'genre',
  'title',
];

export const bookSearchableFields = [
  'id',
  'author',
  'genre',
  'title',
  'publicationDate',
];

export const Genre: IGenre[] = [
  'Self-Help',
  'Detective',
  'Programming',
  'Thriller',
  'Science Fiction',
  'Novel',
];
