import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty({message: "The name is required"})
    name: string;

    @IsEmail()
    @IsNotEmpty({message: "Email is required"})
    email: string;

    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(4, { message: "Minimum 8 characters required" })
    @Matches(/(?=.*[a-z])/, {
        message: "At least one lower case character is required"
    })
    @Matches(/(?=.*[A-Z])/, {
        message: "At least one upper case character is required"
    })
    @Matches(/(?=.*\d)/, {
        message: "At least one digit is required"
    })
    @Matches(/(?=.*[@$!%*?&\-_#.,:;])/, {
        message: "At least one special character is required (@$!%*?&)"
    })
    password: string;
}
