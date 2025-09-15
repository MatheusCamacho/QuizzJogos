import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const dadosQuiz = [
  {
    id: 'rdr2',
    nome: 'Red Dead Redemption 2',
    imagem: 'https://lhsmagpie.com/wp-content/uploads/2024/12/red-dead-redemption-2-rockstar-games-red-dead-redemption-2-e1733771828662.jpg',
    questoes: [
      { id: 'protagonista', texto: 'Qual o nome do protagonista?', opcoes: ["John Marston", "Dutch van der Linde", "Micah Bell", "Arthur Morgan"], resposta: 'Arthur Morgan' },
      { id: 'gangue', texto: 'Qual o nome da gangue principal do jogo?', opcoes: ['O\'Driscolls', 'Van der Linde', 'Lemoyne Raiders', 'Del Lobos'], resposta: 'Van der Linde' },
      { id: 'ano', texto: 'Em que ano o jogo foi lançado?', opcoes: ["2016", "2017", "2018", "2019"], resposta: '2018' },
      { id: 'desenvolvedora', texto: 'Qual a desenvolvedora do jogo?', opcoes: ["Ubisoft", "Rockstar Games", "Naughty Dog", "CD Projekt Red"], resposta: 'Rockstar Games' },
      { id: 'prequel', texto: 'A história se passa ANTES do primeiro Red Dead?', opcoes: ['Sim', 'Não'], resposta: 'Sim' },
    ],
  },
  {
    id: 'cyberpunk2077',
    nome: 'Cyberpunk 2077',
    imagem: 'https://cdna.artstation.com/p/assets/images/images/033/037/886/large/artur-tarnowski-malemain.jpg?1608208334',
    questoes: [
      { id: 'cidade', texto: 'Qual o nome da cidade principal do jogo?', opcoes: ["Neo-Tokyo", "Mega-City One", "Night City", "Los Santos"], resposta: 'Night City' },
      { id: 'keanu', texto: 'Qual personagem é interpretado por Keanu Reeves?', opcoes: ['Jackie Welles', 'Viktor Vektor', 'Johnny Silverhand', 'Dexter DeShawn'], resposta: 'Johnny Silverhand' },
      { id: 'protagonista', texto: 'Qual o nome customizável do(a) protagonista?', opcoes: ["Geralt", "Shepard", "V", "Corvo"], resposta: 'V' },
      { id: 'desenvolvedora', texto: 'Qual a desenvolvedora do jogo?', opcoes: ["BioWare", "Bethesda", "CD Projekt Red", "Square Enix"], resposta: 'CD Projekt Red' },
      { id: 'rpg_mesa', texto: 'O jogo é baseado em um RPG de mesa?', opcoes: ['Sim', 'Não'], resposta: 'Sim' },
    ],
  },
  {
    id: 'silksong',
    nome: 'Hollow Knight: Silksong',
    imagem: 'https://assets.xboxservices.com/assets/c3/ba/c3badfea-655f-4ddb-a037-704e5cf27930.jpg?n=488123_GLP-Page-Hero-1084_1920x1080.jpg',
    questoes: [
      { id: 'protagonista', texto: 'Quem é a protagonista do jogo?', opcoes: ["O Cavaleiro", "Zote", "Quirrel", "Hornet"], resposta: 'Hornet' },
      { id: 'reino', texto: 'Em qual reino a aventura se passa?', opcoes: ['Hallownest', 'Pharloom', 'Radiance', 'Deepnest'], resposta: 'Pharloom' },
      { id: 'desenvolvedora', texto: 'Qual o nome da desenvolvedora indie?', opcoes: ["Supergiant Games", "Playdead", "Team Cherry", "Moon Studios"], resposta: 'Team Cherry' },
      { id: 'arma', texto: 'Qual a principal "arma" da protagonista?', opcoes: ["Ferrão dos Sonhos", "Espada de Osso", "Agulha e Linha", "Garras de Louva-a-deus"], resposta: 'Agulha e Linha' },
      { id: 'sequencia', texto: 'Silksong é uma continuação de Hollow Knight?', opcoes: ['Sim', 'Não'], resposta: 'Sim' },
    ],
  },
  {
    id: 'darksouls',
    nome: 'Dark Souls',
    imagem: 'https://fanatical.imgix.net/product/original/fbc395cc-a07d-441e-bb43-eb00fd7d8b33.jpeg?auto=compress,format&w=870&fit=crop&h=489',
    questoes: [
      { id: 'moeda', texto: 'Qual é a "moeda" usada para evoluir o personagem?', opcoes: ["Ecos de Sangue", "Ouro", "Almas", "Runas"], resposta: 'Almas' },
      { id: 'desenvolvedora', texto: 'Qual empresa japonesa desenvolveu a série Souls?', opcoes: ['Capcom', 'Konami', 'FromSoftware', 'Square Enix'], resposta: 'FromSoftware' },
      { id: 'frase', texto: 'Qual frase é famosa pelo personagem Solaire?', opcoes: ["Fear the Old Blood", "May the Flames Guide Thee", "Praise the Sun", "Don't You Dare Go Hollow"], resposta: 'Praise the Sun' },
      { id: 'hub', texto: 'Qual o nome da área central (hub) do primeiro jogo?', opcoes: ["The Nexus", "Majula", "Hunter's Dream", "Firelink Shrine"], resposta: 'Firelink Shrine' },
      { id: 'dificuldade', texto: 'O jogo é conhecido por ser fácil?', opcoes: ['Sim', 'Não'], resposta: 'Não' },
    ],
  },
  {
    id: 'expedition33',
    nome: 'Clair Obscur: Expedition 33',
    imagem: 'https://cdnb.artstation.com/p/assets/covers/images/076/962/927/large/nicholas-maxson-francombe-nicholas-maxson-francombe-2023-10-26-keyartexp33-full-1.jpg?1718223251',
    questoes: [
      { id: 'engine', texto: 'Qual motor gráfico (engine) o jogo utiliza?', opcoes: ["Unity", "Frostbite", "Unreal Engine 5", "Decima Engine"], resposta: 'Unreal Engine 5' },
      { id: 'combate', texto: 'Qual o estilo de combate do jogo?', opcoes: ['Ação em tempo real', 'Hack and Slash', 'JRPG por turnos', 'Luta'], resposta: 'JRPG por turnos' },
      { id: 'inimigo', texto: 'Como se chama a entidade que ameaça a todos?', opcoes: ["A Ceifadora", "A Arquiteta", "A Pintora", "A Escultora"], resposta: 'A Pintora' },
      { id: 'ano', texto: 'Em qual ano o jogo está previsto para ser lançado?', opcoes: ["2024", "2025", "2026", "2027"], resposta: '2025' },
      { id: 'gamepass', texto: 'Foi anunciado no Game Pass?', opcoes: ['Sim', 'Não'], resposta: 'Sim' },
    ],
  },
];

// const sortearJogo = () => {
//   const indice = Math.floor(Math.random() * dadosQuiz.length);
//   return dadosQuiz[indice];
// };
let i = -2
const sortearJogo = () => {
  i++
  if(i >= dadosQuiz.length) i = 0
  
  return dadosQuiz[i];
}

const EstilosGlobais = () => (
  <style>{`
    :root {
      font-size: 16px;
    }
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #1a1a1a;
      color: #f0f0f0;
      margin: 0;
    }
    .main-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1.25rem;
    }
    .quiz-container {
      background-color: #2c2c2c;
      padding: 1.875rem;
      border-radius: 0.9375rem;
      width: 100%;
      max-width: 37.5rem;
      border: 1px solid #444;
    }
    .game-title {
      text-align: center;
      color: #e53e3e;
      font-size: 2rem;
      margin-top: 0;
      margin-bottom: 1.25rem;
    }
    .game-image {
      width: 100%;
      height: 15rem;
      object-fit: cover;
      border-radius: 0.625rem;
      margin-bottom: 1.875rem;
    }
    .question-block {
      margin-bottom: 1.5rem;
      padding: 0.625rem;
      border-left: 0.25rem solid transparent;
      transition: background-color 0.3s ease;
    }
    .question-block label {
      display: block;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.625rem;
    }
    .question-block.incorrect {
      background-color: rgba(229, 62, 62, 0.1);
      border-left-color: #e53e3e;
      border-radius: 0.5rem;
    }
    .correct-answer-text {
      color: #a7f3d0;
      font-weight: 600;
      margin-top: 0.625rem;
      display: block;
      font-size: 0.9rem;
    }
    .radio-group label {
      display: block;
      background-color: #3f3f46;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .radio-group label:hover {
      background-color: #52525b;
    }
    .radio-group input[type="radio"] {
      margin-right: 0.75rem;
      accent-color: #e53e3e;
    }
    .button-group {
      display: flex;
      gap: 0.9375rem;
      margin-top: 1.875rem;
    }
    button {
      flex-grow: 1;
      padding: 0.9375rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .submit-btn {
      background-color: #c53030;
      color: white;
    }
    .submit-btn:hover {
      background-color: #9b2c2c;
    }
    .new-game-btn {
      background-color: #4a5568;
      color: #fff;
    }
    .new-game-btn:hover {
      background-color: #2d3748;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .modal.visible {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-content {
      background: #2c2c2c;
      padding: 2.5rem;
      border-radius: 0.9375rem;
      text-align: center;
      width: 90%;
      max-width: 25rem;
    }
    .result-image {
      width: 9.375rem;
      height: 9.375rem;
      border-radius: 0.625rem;
      margin-bottom: 1.25rem;
    }
    .result-percentage {
      font-size: 3rem;
      font-weight: 700;
      color: #e53e3e;
      margin: 0;
    }
    .result-message {
      font-size: 1.2rem;
      margin-top: 0.625rem;
      margin-bottom: 1.875rem;
    }
  `}</style>
);

function ModalResultado({ resultado, aoReiniciar }) {
  if (!resultado) return null;

  const imagemResultado = resultado.porcentagem > 50 
    ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemppNXp0Mmo5Mm8yNmQ2c2RseGk5NXlpOXJ2czNwbGhxbmtoYTIwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2fJ38cWehMCRGgShBq/giphy.gif"
    : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV5ZjVsdmJ3a3U2amw2ZGI3eDlocWltZGo5bmtiemZoM3VtNXg0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j6DRmBc0nTDG7OWsxy/giphy.gif";
  
  const mensagemResultado = resultado.porcentagem > 50
    ? "Parabéns, tá sabendo bem"
    : "Você tá sabendo pouco, ein";

  return (
    <div className={`modal ${resultado ? 'visible' : ''}`}>
      <div className="modal-content">
        <img src={imagemResultado} alt="Resultado" className="result-image"/>
        <h2 className="result-percentage">{resultado.porcentagem.toFixed(0)}%</h2>
        <p className="result-message">{mensagemResultado}</p>
        <button onClick={aoReiniciar} className="new-game-btn">
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [jogoAtual, setJogoAtual] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [gabarito, setGabarito] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setJogoAtual(sortearJogo());
  }, []);
  
  const reiniciarJogo = () => {
    setResultado(null);
    setGabarito({});
    reset();
    setJogoAtual(sortearJogo());
  }

  const verificarRespostas = (dados) => {
    let acertos = 0;
    const novoGabarito = {};

    jogoAtual.questoes.forEach(questao => {
      const respostaUsuario = dados[questao.id];
      const respostaCorreta = questao.resposta;
      
      if (respostaUsuario === respostaCorreta) {
        acertos++;
      } else {
        novoGabarito[questao.id] = respostaCorreta;
      }
    });

    setGabarito(novoGabarito);
    const porcentagem = (acertos / jogoAtual.questoes.length) * 100;
    
    setTimeout(() => {
        setResultado({ porcentagem });
    }, 1500);
  };

  if (!jogoAtual) {
    return <div>Sorteando um jogo...</div>;
  }

  return (
    <>
      <EstilosGlobais />
      <ModalResultado resultado={resultado} aoReiniciar={reiniciarJogo} />
      <main className="main-container">
        <div className="quiz-container">
          <h1 className="game-title">{jogoAtual.nome}</h1>
          <img 
            src={jogoAtual.imagem} 
            alt={`Capa do jogo ${jogoAtual.nome}`} 
            className="game-image"
          />
          <form onSubmit={handleSubmit(verificarRespostas)}>
            {jogoAtual.questoes.map((q, index) => {
              const estaIncorreta = gabarito[q.id] !== undefined;
              return (
                <div key={q.id} className={`question-block ${estaIncorreta ? 'incorrect' : ''}`}>
                  <label>{`${index + 1}. ${q.texto}`}</label>
                  <div className="radio-group">
                    {q.opcoes.map(opcao => (
                      <label key={opcao}>
                        <input type="radio" value={opcao} {...register(q.id, { required: true })} />
                        {opcao}
                      </label>
                    ))}
                  </div>
                  {estaIncorreta && (
                    <span className="correct-answer-text">Resposta correta: {gabarito[q.id]}</span>
                  )}
                </div>
              )
            })}
            
            <div className="button-group">
              <button type="submit" className="submit-btn">Verificar Respostas</button>
              <button type="button" onClick={reiniciarJogo} className="new-game-btn">Novo Jogo</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

