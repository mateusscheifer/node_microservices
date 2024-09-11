import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CriarJogadorDto} from "./dtos/criar-jogador.dtos";
import {Jogador} from "./interfaces/jogador.interface";
import {v4 as uuidv4} from "uuid"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {
    }

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto){

        const {email} = criarJogadorDto

        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if (jogadorEncontrado){
            this.atualizar(criarJogadorDto)
        }else {
            this.criar(criarJogadorDto)
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec()

        // return await this.jogadores
    }

    async consultarJogadoresPeloEmail(email: string):Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if (jogadorEncontrado){
            return jogadorEncontrado
        }else{
            throw new NotFoundException(`Jogador email ${email} não encontrado`)
        }
    }

    async deletarJogador(email: string):Promise<any>{

        return await this.jogadorModel.deleteOne({email}).exec()
        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        //
        // this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)

    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()
        // const {nome, email,telefoneCelular} = criarJogadorDto
        //
        // const jogador: Jogador = {
        //     _id: uuidv4(),
        //     nome,
        //     telefoneCelular,
        //     email,
        //     ranking: "A",
        //     posicaoRanking: 1,
        //     urlFotoJogador: "www.google.com.br/foto123.jpg"
        // };
        // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        // this.jogadores.push(jogador)

    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email},{$set: criarJogadorDto}).exec()

        // const  {nome} = criarJogadorDto
        // jogadorEncontrado.nome = nome;

    }

}

