import {Entity, hasMany, model, property} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cateName: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'boolean',
    required: false,
    default: false
  })
  isDeleted: boolean;

  @hasMany(() => Product, {keyTo: 'idOfCategory'})
  products: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
