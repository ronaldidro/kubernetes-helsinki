import { IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MaxLength(140)
  description: string;
}
