# Aplicações avançadas com Angular

## :scroll: Sumário

- [Sobre](#about)
- [Estrutura](#structure)
- [Conceitos](#learned)

## :computer: Sobre <a name = "about"></a>

Projeto consiste em um jogo de memória com tecnologias referente ao front-end

> Bootcamp 🚀 = Avanade Angular Developer

<p align="center">
<br>
  <a href="https://web.digitalinnovation.one/" rel="noopener">
 <img width=800px height=400px src="https://hermes.digitalinnovation.one/site/images/cover_dio.jpg" alt="Logo Digital Innovation One"></a>
</p>

### :mag: Imagens do projeto

<p align="center">
 :globe_with_meridians: DEPLOY
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/lcds90/game-memory/development/img/screenshot.png">
</p>

## :file_folder: Estrutura do projeto <a name = "structure"></a>

```
 ├── game-memory
    ├── img                # Pasta de Imagens
    ├── index.html         # Estrutura do jogo
    ├── style.css          # Folha de estilo do jogo
    └── script.js          # Lógica do Jogo
```

<hr>

## :memo: Conceitos aprendidos <a name = "learned"></a>

### Estrutura e Otimização - Parte 1

No app component é utilizado a nivel de template é utilizado
```
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
```
Se alguma informação se repete e precisa ser disponibilizada globalmente, pode-se utilizado junto no AppComponent, exemplos: bootstrap, navbar, libs js.
O template fica como router-outlet para não ser necessário ficar realizando ngIf com informações repetir que podem ser excluidas caso sejam solicitados.

Em carregamento utiliza-se da técnica de lazy loading, para a primeira funcionalidade da aplicação estar disponível assim que aplicação carrega.

Usa-se no Angular padrão dentro de páginas, o uso de Presenters e Containers.
Para separar responsabilidades e suas funcionalidades.  
<hr>

### Estrutura e Otimização - Parte 2

<hr>

Numa aplicação quando está sendo executada e em uso pelo usuário, vários eventos disparam o change detection como
- eventos do DOM (click, blur, etc)
- chamadas HTTP
- setTimeout e setInterval 
- bindings

O angular realiza detecção do valor anterior do binding se continua mesmo, a cada execução do change detection
Operações complicadas no código, impactam na performance devido o consumo de processamentos gerando custos.

Cada component possui seu prórpio Change Detection, impedindo 
```
constructor(private contentService: ContentService,
            private cdRef: ChangeDetectorRef)
```

Métodos de Otimização para baixa complexidade de componente

> cdRef.Detach = Remover da árvore dos views, o component removendo o Change Detection, impedindo execuções multiplas, utilize no ciclo de vida do AfterViewInit

> cdRef.detectChanges = Utilizando junto com detach, é possível carregar a informação do component e seus filhos, somente se disparado o Change Detection, quando ocorre algum evento, por exemplo click.

<hr>

### Estrutura e Otimização - Parte 3

#### Padrão Container vs Presenter

* Separa responsabilidades
* Melhor manipulação do ChangeDetection
* Componentes reutilizáveis


##### Presenter
- Prioridade de como as coisas são mostradas
- Recebe informação do componente pai via Input
- Emissão de eventos para compoentne via Output
- Não guardam estado
- Podem ter presenters e containers dentro deles
- Podem ser mais performáticos com OnPush

##### Container
- Prioridade de como as coisas funcionam
- Consomem e geram informação de serviços
- Disparam ações com base nos eventos do componente filho
- Tem noção de estado
- Podem ter presenters e containers dentro deles

Estrutura

```
                AppComponent
              ↙             ↘
            ↙                 ↘
      Page 1                 Page n
     ↙     ↘
    ↙       ↘
Container 1  Container n
              ↙     ↘            
             ↙        ↘
        Component 1  Component n
```

Na annotation de @Component, possui um atributo de ChangeDetection
```
> @Component({
  selector: 'app-content-c-child',
  templateUrl: './content-c-child.component.html',
  styleUrl: ['./content-c-child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
```
A changeDetection OnPush, só realizar a renderização novamente caso for identificado mudança no Input que recebe

### Estrutura e Otimização - Parte 4

Pontos positivos para salvar o Observable inteiro é importante para salvar uma referencia de informação de uma string, e outras entidades podem trabalhar com essa referência.
Utilizando $

Pipe Async
Prove um observable 
https://angular.io/api/common/AsyncPipe


<b>Treinar esse padrão de projeto*</b>

```
@Input() counter: number;
@Output() inc = new EventEmitter();
@Output() dec = new EventEmitter();

incClick(){
    this.inc.emit()
}

decClick(){
    this.inc.emit()
}
```
Neste exemplo de presenter, como ele é o componente filho sua responsabilidade é emitir eventos para o pai atualizar o valor que manda para como input, gerando uma espécie de ciclo e cada um com sua responsabilidade. Não seria certo no eventos de click utilizar counter++ ou counter-- e o certo seria utiliar no component que tem como responsabilidade o dado que passa, garantindo consistência de dados.

#### Services
Álém de serem utilizadas em requisições HTTP, podem também ser utilizadas para compartilhar a mesma intancia de classe (informação) em outro componente, modulo, etc.

Podem ser providos tanto no module raiz da aplicação quanto em um determinado módulo.

Uma tecnica de requisição necessária e útil é priorizar menos requisições no servidor possível, procure verificar durante a aplicação se o dado já foi recarregado ao inves de realizar toda vez a requisição sendo necessária somente na primeira vez do acesso.

#### Hot Observables

[Hot Observables vs Cold Observables](https://medium.com/@marcelo.vismari/angular-rxjs-cold-e-hot-observable-557f04cb2e3d#:~:text=Pense%20que%20o%20Hot%20Observable,in%C3%ADcio%20independente%20de%20outras%20pessoas.)

```
Pense que o Hot Observable é uma estação de rádio, ela sempre está emitindo sinal independente da quantidade de ouvintes. Os ouvintes que sintonizarem na rádio ouvirão exatamente a mesma música naquele instante. Cold Observable é como um CD, você pode ouvir o CD do início independente de outras pessoas.
```

> Ao setar o valor, ele executa o next (create-todo) no Subject e todos que estão ouvindo o Observable irão receber as modificações (last-todos)

#### Arquitetura Redux

[Redux](https://balta.io/blog/angular-redux-ngrx)

Biblioteca NGRX

##### Como funciona

<p align="center">
<img src="https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png">
</p>

Reducer é a função que recebe uma action, estado atual e retorna um estado novo

##### Padrão NGRX
- Actions - Definida em duas partes
```
- 1 [Component] Fazer Ação
```
##### Memoized Selector

Memoization é técnica para otimização de perfomance com selector

[Ver este tutorial depois](https://www.youtube.com/watch?v=N_UQx8dPPkc)

Uma boa prática quando trabalhando com NGRX, é NÃO REPETIR actions para ser mais facil debugar os arquivos e suas responsabilidades.

### Testes

Padrão de teste na comunidade
AAA = Arrange, Act, Assert
[Vídeo sobre padrão](https://www.youtube.com/watch?v=wrLicPUsfTc&list=PL7uSdb_U7Fu8XlgXvBUOXyOE2Z_1B-jt9)

### ControlValueAcessor

[Projeto Stackblitz](https://stackblitz.com/edit/jv-control-value-accessor?file=src%2Fapp%2Fapp.component.ts)

Age como uma ponte entre a API de formulários do Angular e um elemento nativo do DOM
Interage com um FormControl, criado explicitamente ou não

#### Métodos Obrigatórios quando implememtando

> registerOnChange()
Recebe uma função e avisa o componente pai de valor atualizado e passar elee

> registerOnTouched()
Recebe função e quer avisar que precisa atualizar o formControl do componente pai

> setDisabledSate()
Quando setar disabled no componente pai, irá refletir no componente filho

> writeValue()
Recebe informação do formControl do componente do pai.

@Self -> Procurar somente no componente correspodente.
@Optional -> Torna a injeção do NgControl opcional, evitando o erro.

### Manipulação de Dom
[Projeto Stackblitz](https://stackblitz.com/edit/angular-ivy-cqauuv)
> ng-template
Com viewContainerRef, podemos definir com createEmbbebedView para o template ser gerado dinamicamente
* Por padrão sem ng-container, ele irá renderizar após todos os elementos da 

> ng-container
Serve como um slot