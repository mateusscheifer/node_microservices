import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CriarJogadorDto} from "./dtos/criar-jogador.dtos";
import {Jogador} from "./interfaces/jogador.interface";
import {v4 as uuidv4} from "uuid"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AtualizarJogadorDto} from "./dtos/atualizar-jogador.dtos";

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {
    }

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const {email} = criarJogadorDto

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if (jogadorEncontrado){
            throw new BadRequestException('jogador com email cadastrado')
        }
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()

    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto){

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

        if (!jogadorEncontrado){
            throw new NotFoundException('Jogados não encontrado')
        }
        await this.jogadorModel.findOneAndUpdate({_id},{$set: atualizarJogadorDto}).exec()

    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec()

        // return await this.jogadores
    }

    async consultarJogadoresPeloId(_id: string):Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

        if (jogadorEncontrado){
            return jogadorEncontrado
        }else{
            throw new NotFoundException(`Jogador _id ${_id} não encontrado`)
        }
    }

    async deletarJogador(_id: string){

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

        if (!jogadorEncontrado){
            throw new NotFoundException('Jogados não encontrado')
        }
        await this.jogadorModel.deleteOne({_id}).exec()
    }

}

