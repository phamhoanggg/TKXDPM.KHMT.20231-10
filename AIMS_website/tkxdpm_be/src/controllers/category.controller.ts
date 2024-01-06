import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';
import {basicAuthorization} from '../services';
import {inject} from '@loopback/core';
import {RestBindings} from '@loopback/rest';
import {Response} from '@loopback/rest';
import {checkValidLength} from '../services/checkValid';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response,
  ) {}

  // (
  //   await this.userRepository.find({
  //     where: {username: newUserRequest.username},
  //   })
  // ).length > 0

  @authenticate('jwt')
  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  @post('/categories')
  @response(200, {
    description: 'Category model instance',
    content: {'application/json': {schema: getModelSchemaRef(Category)}},
  })
  async createCategory(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
            exclude: ['id', 'isDeleted'],
          }),
        },
      },
    })
    category: Omit<Category, 'id'>,
  ): Promise<any> {
    if (!checkValidLength(category.cateName, 50)) {
      return this.response
        .status(422)
        .send({message: 'Đã vượt quá 50 kí tự rồi'});
    }

    if (
      (
        await this.categoryRepository.find({
          where: {cateName: category.cateName},
        })
      ).length > 0
    )
      return this.response
        .status(422)
        .send({message: 'Đã tồn tại cate này rồi '});

    return this.categoryRepository.create(category);
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Category model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async getAllCategories(@param.filter(Category) filter?: Filter<Category>): Promise<any> {
    const data = await this.categoryRepository.find(filter);
    this.response.header('Access-Control-Expose-Headers', 'Content-Range');
    return this.response
      .header('Content-Range', 'categories 0-20/20')
      .send(data);
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Category, {exclude: 'where'})
    filter?: FilterExcludingWhere<Category>,
  ): Promise<Category> {
    return this.categoryRepository.findById(id, filter);
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Category PUT success',
  })
  async replaceCategoryById(
    @param.path.string('id') id: string,
    @requestBody() category: Category,
  ): Promise<any> {
    if (!checkValidLength(category.cateName, 50)) {
      return this.response.status(422).send ({message: 'Vượt quá 50 kí tự'})
    }

    if (
      (
        await this.categoryRepository.find({
          where: {cateName: category.cateName},
        })
      ).length > 0
    )
      return this.response.status(422).send({message:'Đã tồn tại cate này rồi'});

    await this.categoryRepository.replaceById(id, category);

    return this.categoryRepository.findById(id);
  }

  @put('/categories/{id}/del')
  @response(204, {
    description: 'Category DELETE success',
  })
  async deleteCategoryById(@param.path.string('id') id: string): Promise<void> {
    await this.categoryRepository.updateById(id, {isDeleted: true});
  }
}
