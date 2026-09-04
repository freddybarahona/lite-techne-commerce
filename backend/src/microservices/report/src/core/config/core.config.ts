import AppCore from "../app.core";
import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"

export default class Serverconfigurations{
  private env= new Environment()
  private back= new AppCore()

  constructor(){
    this.initializeDBandBack()
  }

  private initializeDBandBack(){
    this.config_back({portBack: this.env.port})
  }

  private config_back({portBack}:{portBack: number}){
    this.back.app.listen(portBack, () =>{
      console.log(InitializeConstants.infoBackActive({port: portBack, ms_name: "report"}))
    })
  }
}