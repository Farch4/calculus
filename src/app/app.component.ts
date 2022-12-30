import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(){

  }
  valorRecuperado=0
  messageError=''

  faturamento: number=0
  rendaBruta: number=0
  segmento :  {nome:string, monofasico:number, tributado:number}={
    nome: '',
    monofasico: 0,
    tributado: 0
  }
  selected = 'Angular';

  segmentos=[
    "Autopeça","Moto Peça", "Loja de Pneu", "Distribuidora de bebidas", "Padaria",
    "Lanchonete", "Restaurante", "Conveniência de postos", "Bar", "Farmácia/Drogaria",
    "Revenda de cosmético e perfumaria", "Mercado/minimercado", "Supermercado",
    "Petshop", "Loja de veterinária", "Boate", "Hotel/Motel"
  ]

  setSegmento(event:any){
    this.selected = event.target.value;

    switch(event.target.value) { 
      case 'Autopeça': { 
        this.segmento ={nome:"Autopeça", monofasico:0.8, tributado:0.2}
        break; 
      } 
      case 'Moto Peça': { 
        this.segmento ={nome:"Moto Peça", monofasico:0.35, tributado:0.65}
        break; 
      } 
      case 'Loja de Pneu': { 
        this.segmento ={nome:"Loja de Pneu", monofasico:0.95, tributado:0.05}
        break; 
      } 
      case 'Distribuidora de bebidas': { 
        this.segmento ={nome:"Distribuidora de bebidas", monofasico:0.9, tributado:0.1}
        break; 
      } 
      case 'Padaria': { 
        this.segmento ={nome:"Padaria", monofasico:0.15, tributado:0.85}
        break; 
      } 
      case 'Lanchonete': { 
        this.segmento ={nome:"Lanchonete",monofasico:0.2, tributado:0.8}
        break; 
      } 
      case 'Restaurante': { 
        this.segmento ={nome:"Restaurante", monofasico:0.3, tributado:0.7}
        break; 
      } 
      case 'Conveniência de postos': { 
        this.segmento ={nome:"Conveniência de postos", monofasico:0.6, tributado:0.4}
        break; 
      } 
      case 'Bar': { 
        this.segmento ={nome:"Bar", monofasico:0.6, tributado:0.4}
        break; 
      } 
      case 'Farmácia/Drogaria': { 
        this.segmento = {nome:"Farmácia/Drogaria", monofasico:0.85, tributado:0.15}
        break; 
      } 
      case 'Revenda de cosmético e perfumaria': { 
        this.segmento ={nome:"Revenda de cosmético e perfumaria", monofasico:0.7, tributado:0.3}
        break; 
      } 
      case 'Mercado/minimercado': { 
        this.segmento ={nome:"Mercado/minimercado", monofasico:0.2, tributado:0.8}
        break; 
      } 
      case 'Supermercado': { 
        this.segmento = {nome:"Supermercado", monofasico:0.25, tributado:0.75}
        break; 
      } 
      case 'Petshop': { 
        this.segmento = {nome:"Petshop", monofasico:0.2, tributado:0.8}
        break; 
      } 
      case 'Loja de veterinária': { 
        this.segmento ={nome:"Loja de veterinária", monofasico:0.4, tributado:0.6}
        break; 
      } 
      case 'Boate': { 
        this.segmento ={nome:"Boate", monofasico:0.6, tributado:0.4}
        break; 
      } 
      case 'Hotel/Motel': { 
        this.segmento ={nome:"Hotel/Motel", monofasico:0.15, tributado:0.85}
        break; 
      } 
   } 
}

setFaturamento(event:any){
  console.log(event.target.value)
  this.faturamento=event.target.value;
}

setRendaBruta(event:any){
  console.log(event.target.value)
  this.rendaBruta=event.target.value;
}

 getAliquotaNominalEDeducao(){
    if(this.rendaBruta<=180000.00)return {aliquota:0.04, deducao: 0}
    
    
    if(this.rendaBruta>=180000.01 && 
    this.rendaBruta<=360000.00)return {aliquota:0.073, deducao: 5940.00}
    
    
    if(this.rendaBruta>=360000.01 && 
    this.rendaBruta<=720000.00)return {aliquota:0.095, deducao: 13860.00}
    
    if(this.rendaBruta>=720000.01 && 
    this.rendaBruta<=1800000.00)return {aliquota:0.107, deducao: 22500.00}
    
    
    if(this.rendaBruta>=1800000.01 && 
    this.rendaBruta<=3600000.00)return {aliquota:0.143, deducao: 87300.00}
    
    
   if(this.rendaBruta>=3600000.01 && 
    this.rendaBruta<=4800000.00)return {aliquota:0.19, deducao: 378000.00}    

    return {aliquota:0, deducao: 0} 
}


 getCalculo(){
    return this.rendaBruta * this.getAliquotaNominalEDeducao().aliquota
}


 getAliquotaEfetiva(){
    return ((this.getCalculo() - this.getAliquotaNominalEDeducao().deducao)/this.rendaBruta)*100
}

 getMonofasico(){
    return (this.faturamento * this.segmento.monofasico)
}

 getTributado(){
    return (this.segmento.tributado * this.faturamento)
}


 getImpostos(){

    return {
        irpj:this.getAliquotaEfetiva()*0.055,
        csll:this.getAliquotaEfetiva()*0.035,
        cofins:this.getAliquotaEfetiva()*0.1274,
        pis:this.getAliquotaEfetiva()*0.0276,
        cpp:this.getAliquotaEfetiva()*0.42
    }
}

 getDASsemRevisao(){
    return (this.getImpostos().irpj*this.faturamento)+(this.getImpostos().csll*this.faturamento)+
    (this.getImpostos().cofins*this.faturamento)+(this.getImpostos().pis*this.faturamento)
    +(this.getImpostos().cpp*this.faturamento)
}

 getDAScomRevisao(){

    let monofasico=(this.getMonofasico()*this.getImpostos().irpj)+(this.getMonofasico()*this.getImpostos().csll)+
    (this.getMonofasico() * this.getImpostos().cpp)
    
    let tributado=(this.getTributado() * this.getImpostos().irpj)+(this.getTributado() * this.getImpostos().csll)+
    (this.getTributado() * this.getImpostos().cpp)+ (this.getTributado() * this.getImpostos().pis)+
    (this.getTributado() * this.getImpostos().cofins)
    
    return monofasico+tributado

}

 setValorRecuperado(){
   try{
    if(!this.checkValues()){
        this.valorRecuperado= ((this.getDASsemRevisao()-this.getDAScomRevisao())*60)/100
        this.valorRecuperado = Math.round((this.valorRecuperado + Number.EPSILON) * 100) / 100
      }
    }catch(e){
      this.messageError='Ocorreu um erro no processamento dos dados. Por favor, tente novamente.'
    }
  }

  checkValues(){
    this.messageError=''
    if(this.segmento.nome==''){
      this.messageError='Por favor, preencha o campo de segmento'
      return true
    }

    if(this.faturamento<=0){
      this.messageError='Por favor, preencha corretamente o campo de faturamento mensal'
      return true
    }
    if(this.rendaBruta<=0){
      this.messageError= 'Por favor, preencha corretamente o campo de renda bruta anual'
      return true
    }

    if(this.rendaBruta>4800000.00){
      this.messageError= 'O valor da renda bruta excede o ultrapassa o limite do Simples Nacional'
      return true
    }

    if(this.faturamento>4800000.00){
      this.messageError= 'O valor do faturamento mensal excede o ultrapassa o limite do Simples Nacional'
      return true
    }
    
    return false
  }

  remakeCalc(){
    window.location.reload()
  }

}
