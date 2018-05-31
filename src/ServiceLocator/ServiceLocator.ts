

export class ServiceLocator{
    public static _registerdClasses: any = new Array()

    public static register( interfaceName: string, instance: any ){
        this._registerdClasses[interfaceName] = instance
    }

    public static resolve(interfaceName: string){
        return this._registerdClasses[interfaceName]
    }

}