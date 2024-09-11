import * as mongoose from "mongoose";


export const JogadorSchema = new mongoose.Schema({
    telefoneCelular: {type: String, unicode: true},
    email: {type: String},
    nome: String,
    ranking: String,
    posicaoRanking: String,
    urlFotoJogador: String,
}, {timestamps: true, collection: 'jogadores'})
