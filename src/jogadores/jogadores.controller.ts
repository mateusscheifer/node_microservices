import {Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {JogadoresService} from "./jogadores.service";
import {CriarJogadorDto} from "./dtos/criar-jogador.dtos";
import {Jogador} from "./interfaces/jogador.interface";
import {JogadoresValidacaoParametrosPipe} from "./pipes/jogadores-validacao-parametros.pipe";
import {AtualizarJogadorDto} from "./dtos/atualizar-jogador.dtos";

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }


    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ) {
        await this.jogadoresService.atualizarJogador(_id , atualizarJogadorDto)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{

        return await this.jogadoresService.consultarTodosJogadores()
    }

    @Get('/:_id')
    async consultarJogadorePeloId (
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<Jogador>{

            return await this.jogadoresService.consultarJogadoresPeloId(_id)

    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ){
        this.jogadoresService.deletarJogador(_id)
    }

}
