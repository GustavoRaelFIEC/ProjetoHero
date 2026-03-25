const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { z } = require('zod');

const app = express();
app.use(express.json()); // habito de leitura no corpo da requisicao
app.use(cors()); // permite que o front end acesse essa API

//Configurar a conexão com o nosso BD, nesse caso é o mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1234',
    database: 'teste_tcc',
    port: '3306'
});

db.connect((error) => {
    if(error){
        console.error("Erro ao conectar ao mysql", error)
        return;
    }
    console.log("Conectado ao MYSQL com sucesso")
})  

// defininco o Schema (Contrato)
const CadastroSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email({ message: "faz o email certo!", }), // coerce para definir qual deve ser o tipo de entrada, nesse caso deve ser um numero!
    senha: z.string().min(8, "precisa ser 8 cracteres sua anta"),
});

// Função para testar a validação
function validarCadastro(dados) {
    console.log("---------- VALIDANDO CADASTRO ... ------------");
    const resultado = CadastroSchema.safeParse(dados);

    if (resultado.success) {
        console.log("✅ Sucesso! Dados validados:", resultado.data)
    }else {
        console.error("❌ Erro de Validação!")
        // Zod retorna um array de erros detalhados
        const errosFormatados = resultado.error.format();
        console.log(JSON.stringify(errosFormatados, null, 2))
    }

    console.log('\n');
}

app.post('/cadastrar', (req, res) => {
    const {nome, email, senha} = req.body;

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    const resultado = CadastroSchema.safeParse(req.body);

    if(!resultado.success) {
        return res.status(400).json(resultado.error.issues)
    }

    db.query(sql, [nome, email, senha], (err, result) => {
        if(err) return res.status(400).json({erro: err.message});
        res.status(201).json({mensagem: 'Usuario cadastrado com sucesso!'})
    })
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body;
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?"

    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).json({erro:err.message});

        if(result.length > 0){
            res.status(200).json({menssagem: "Login efetuado com sucesso!", usuario: result[0] })
        } else {
            res.status(401).json ({mensagem: "Email ou senha incorretos!"})
        }
    })
})

// Rorta de todos os usuarios

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result[0])
    })
})


app.get('/usuarios/:id', (req, res) => {
    
    const {id} = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.status(404, 'Usuario não encontrado').json(err);
        res.json(result[0]);
       
    });
});
      
app.listen(3000, () => {
    console.log('Deu certo');
})