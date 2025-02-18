import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  private readonly looger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto) {

    const emailExists = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (emailExists) {
      this.looger.log("O email já foi cadastrado");
      throw new BadRequestException(`O email ${createUserDto.email} ja foi cadastrado`);
    }

    this.looger.log("Criando usuário");
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    this.looger.log("Listando vários usuários");
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    await this.exists(id);
    
    this.looger.log("Listando um usuário");
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.exists(id);

    this.looger.log("Atualizando um usuário");
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.exists(id);

    this.looger.log("Deletando um usuário");
    await this.usersRepository.delete(id);
    return { deleted: true };
  }

  async exists(id: number) {
    const user = await this.usersRepository.exists({
      where: {
        id
      }
    });
    
    if (!user) {
      this.looger.log("Aconteceu uma exceção");
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
