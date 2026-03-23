import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "./prisma/prisma.service"
import { hashPassword, comparePassword } from "./utils/password.util"
@Injectable()
export class AppService {
  constructor(private db: PrismaService) { }

  async regsterUser(username: string, email: string, password: string) {
    try {

      if (!username) {
        throw new BadRequestException('username is required')
      }

      if (!email) {
        throw new BadRequestException('email is required')
      }

      if (!password) {
        throw new BadRequestException('password is required')
      }

      const checkExistedUser = await this.db.user.findFirst({ where: { username } })

      if (checkExistedUser) {
        throw new UnauthorizedException(`user with ${username} already existed try another username`)
      }

      const hash = await hashPassword(password)

      const user = await this.db.user.create({
        data: {
          username,
          email,
          password: hash,
        }
      })


      return {
        message: "user registred sucessfully",
        status: 200,
        user
      }


    } catch (e: any) {
      return {
        message: "Internal Server Error",
        status: 500,
        error: e.message
      }
    }
  }


  async loginUser(identifier, password) {
    try {

      if (!identifier || !password) {
        return {
          message: "Username/Email and password required",
          status: 400,
        };
      }

      const user = await this.db.user.findFirst({
        where: {
          OR: [
            { email: identifier },
            { username: identifier }
          ]
        }
      })

      if (!user) {
        return {
          message: "user not found",
          status: 400
        }
      }

      const validatePassword = comparePassword(password, user?.password)

      if (!validatePassword) {
        return {
          message: "Invalid credentials",
          status: 401,
        };
      }

      return {
        message: "Login successful",
        status: 200,
        user,
      };


    } catch (e) {
      return {
        message: "Internal Server Error",
        status: 500,
        error: e.message
      }
    }
  }
}
