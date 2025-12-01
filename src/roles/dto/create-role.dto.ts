import { Action, Resource } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayUnique, IsEnum, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MinLength(3)
    name: string;

    @ValidateNested()
    @Type(() => Permission)
    permissions: Permission[];
}


export class Permission {
  @IsEnum(Resource)
  resource: Resource;

  @IsEnum(Action, { each: true })
  @ArrayUnique()
  actions: Action[];
}
