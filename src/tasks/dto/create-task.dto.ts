import { Status } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsInt()
    userId: number;
    
    @IsString()
    @MinLength(4)
    @IsNotEmpty({message: "The name is required"})
    name: string;

    @IsString()
    @MinLength(10)
    @IsNotEmpty({message: "The description is required"})
    description: string;

    @IsEnum(Status)
    status: Status
}
