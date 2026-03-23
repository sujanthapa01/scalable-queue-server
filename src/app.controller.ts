import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("/greet")
  Greet() {
    return {
      greeting: "hello world",
      message: "server is up and running",
      status: 200,
      author: "Sujan Thapa"
    }
  }

  @Post("/register")
  Register(@Body() body: { username: string, email: string, password: string }) {

    const { username, email, password } = body

    return this.appService.regsterUser(username, email, password);
  }


  @Post("/login")
  Login(@Body() body: {}){

  }
}
