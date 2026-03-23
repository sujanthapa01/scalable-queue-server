import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {envSchima} from "./env.config"


@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envSchima
        })
    ]
})


export class EnvModule {}