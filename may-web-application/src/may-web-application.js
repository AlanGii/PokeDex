import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class MayWebApplication extends LitElement {
  static properties = {
    pokemon:{
      type:Object
    },
    entrada:{
      type:String
    },
    pokeData:{
      type:Array
    },
    _arrayPaginationButtoms:{
      type:Array
    },
    totalButtoms:{
      type:Number
    },
    totalElements:{
      type:String
    }
  }

  static styles = css`
    .BG-Fondo{
      font-size = 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

    }

    .Header-color{
      font-size: 64px;
      color: red;
    }
    .Header-color-final{
      font-size: 64px;
      color: grey;
    }

    .Tablon{
      border-radius: 20px;
      background-color: red;
      color: white;
      font-family: fantasy;
      height: 250px;
      width: 550px;
      font-size: 40px;
      display: flex;
      align-items: center;
      text-align: center;
    }
    .Tablon_image{
      padding-left: 10px;
    }

  `;
//se inicializa mi constructor

  constructor() {
    super();
    this.pokemon = {};//objeto
    this.pokeData = [];//arreglo
    this.entrada = "";//String
    this._arrayPaginationButtoms = [];
    this.totalButtoms = 10;
    this.initializePaginationButtoms();
    this.totalElements = "10";
    this.pokemones(this.totalElements,1);//metodo 
  }

//estos son mis metodos
  initializePaginationButtoms(){
    for(let i=1; i<=this.totalButtoms; i++){
      this._arrayPaginationButtoms = [...this._arrayPaginationButtoms,i]
    }
    
  }

  pokemones(limit,offset){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.json())//la respuesta la vuelvo un json
    .then(data => {
      console.log(data)
      this.pokemon = data;//la guardo en una variable data
      this.pokemon.results?.map((pokedata)=>{
        fetch(`${pokedata.url}`)
        .then(response => response.json())
        .then(dataP => {
        this.pokeData = [...this.pokeData,dataP]
        }).catch((e)=>{
        console.error("La api esta fallando")
        }); 
    })
    })
    .catch((e)=>{
      console.error("La API esta fallando")
    });//es un return implicito 
  }

  getElements(event){
    this.pokeData = [];
    const position = parseInt(event.target.id);
    let offset = 0;
    let limit = 0;
    if(position === 1){
      this.pokemones("10","0")
    }else{
    
    limit = position * 10 + position ;
    offset = (position-1).toString()+(position-1).toString();
    console.log(position-1)
    this.pokemones(10,offset);
    }
  }

//El render es todo lo de HTML
  render() {
    return html`

<!--Aqui se obtiene la informacion-->
<label class="Header-color">Poke</label>
<label class="Header-color-final">Dex</label>

${this._arrayPaginationButtoms.map((current) => 
  html`
  <button @click=${this.getElements} id=${current}>${current}</button>
  `
)}

<div class="BG-Fondo">
${this.pokeData.map(data =>

  html`
  <div class= Tablon>
    <img src="${data.sprites.other['official-artwork']['front_default']}" alt= "Pokemon" width="150" height="100" class="Tablon_image">
    Nombre: ${data.name} <br/> Habilidades: ${data.abilities.map((current, i)=> 
    (data.abilities.length-1 === i) ? ` ${current.ability.name}` : ` ${current.ability.name},`)} <br/> Tipo: ${data.types.map((current,i)=>
    (data.types.length-1 === i)?`${current.type.name} `:`${current.type.name},`)}<br/>
    
  </div>
  <h1></h1>
  `
 )}

</div>

${this._arrayPaginationButtoms.map((current) => 
  html`
  <button @click=${this.getElements} id=${current}>${current}</button>
  `
)}
`;

  }
}

customElements.define('may-web-application', MayWebApplication);