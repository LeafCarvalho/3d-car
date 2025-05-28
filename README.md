# 3D Car

Projeto desenvolvido para teste técnico, utilizando React + Vite + Typescript, CSS Modules e SCSS. </br>
O projeto consiste na criação de uma tela de mapa com animação de sprite baseado na direção de um carro, com funcionalidades extras como seleção de trajetos e controle de velocidade.

## Ferramentas utilizadas e motivos para uso

<div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
  <a href="https://vitejs.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
  <a href="https://react.dev/" target="_blank">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://sass-lang.com/" target="_blank">
    <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
  </a>
  <a href="https://www.i18next.com/" target="_blank">
    <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=polymerproject&logoColor=white" alt="i18next" />
  </a>
  <a href="https://leafletjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
  </a>
  <a href="https://www.openstreetmap.org/" target="_blank">
    <img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white" alt="OpenStreetMap" />
  </a>
</div>

- Vite: Escolhido para acelerar o tempo de inicialização do projeto e proporcionar hot-reload eficiente.

- React: Permite construção de interfaces reativas e componentes reutilizáveis de forma simples.

- TypeScript: Aumenta a segurança do código com tipagem forte, prevenindo erros em tempo de desenvolvimento.

- SCSS: Facilita a organização dos estilos e reutilização de variáveis e mixins.

- i18next: Permite fácil gerenciamento de múltiplos idiomas.

- Leaflet + OpenStreetMap: Solução leve e eficiente para visualização de mapas open-source.

## Estrutura de pastas

```plaintext
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Decisões de Arquitetura

Separação de assets e dados: assets para imagens e idiomas; data para informações do sistema (trajetos e informações do carro).

Componentização: Componentes como Mapa e RouteSelector dividem responsabilidades específicas, promovendo reuso e manutenção facilitada.

Hooks personalizados: Criação do useGpsData para gerenciar o estado de posição, direção e animação do veículo.

Organização de estilos: Utilização de SCSS para padrões e reutilização.

Internacionalização: Implementação do i18n para alternar idiomas facilmente, conforme requisito do desafio.

## Funcionalidades implementadas

Animação baseada na direção: O sprite do carro se ajusta conforme a direção apontada.

Controle de velocidade: A animação respeita a velocidade informada no arquivo JSON.

Seleção de trajetos: O usuário pode escolher entre diferentes trajetos disponíveis.

Internacionalização de textos: Suporte a múltiplos idiomas utilizando i18next.

Mapa dinâmico: Utilização do Leaflet para exibir os percursos em um mapa interativo.

## Instalação inicial

Clone o repositório com o comando:
```bash
git clone https://github.com/LeafCarvalho/3d-car.git
```
Pelo cmd, acesse a pasta onde o repositório estiver disponível e execute os comandos abaixo para acessar o repositório e abrí-lo no vscode respectivamente:
```bash
cd 3d-car
code .
```
Instale as dependências necessárias que o projeto possui para seu devido funcionamento:
```bash
npm i
```
Utilize o comando abaixo para iniciar o projeto:
```bash
npm run dev
```
**⚠️ Atenção:** Caso o projeto não abra automático, segure a tecla `Ctrl` do seu teclado e clique na url que for apresentada em seu terminal (Exemplo: http://localhost:5173)

## Observações
Durante a implementação, foi observado que em alguns trechos a direção do carro pode apresentar pequenas variações, assim como certos pontos do trajeto podem se afastar um pouco da pista no mapa. Esse comportamento parece estar relacionado às informações de geolocalização fornecidas, uma vez que os dados foram comparados diretamente com o OpenStreetMap e mantiveram as mesmas características.
