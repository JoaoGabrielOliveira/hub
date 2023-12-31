import { BaseEntity, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import SendEvent from "../util/Events";

interface Service<T extends BaseEntity> {
    find(options : FindManyOptions <T>) : Promise<T[]>;
}

export abstract class BaseService<T extends BaseEntity> implements Service<T> {
    public repository : Repository<T>;
    protected nameTable : string;

    get name(){
        return this.nameTable;
    }

    async find(options: FindManyOptions<T>) {
        SendEvent(`${this.constructor.name} - ${this.constructor.name} - Starting search for ${this.name} in database!`, options, 'info');

        const models = this.repository.find(options);
        models.then(result => {
            if(result)
                SendEvent(`${this.constructor.name} - ${this.constructor.name} - Search for ${this.name} completed successfully!`, options);
            else
                SendEvent(`${this.constructor.name} - Has no ${this.name} in database!`, options, 'warn');
        }).catch((error) => {
            SendEvent(`${this.constructor.name} - Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findOne(options: FindOneOptions<T>) {
        SendEvent(`${this.constructor.name} - Starting search for one ${this.name} in database!`, {}, 'info');

        const models = this.repository.findOne(options);
        models.then(result => {
            if(result)
                SendEvent(`${this.constructor.name} - Search for one ${this.name} completed successfully!`, options);
            else
                SendEvent(`${this.constructor.name} - Has no ${this.name} in database!`, options, 'warn');
        }).catch((error) => {
            SendEvent(`${this.constructor.name} - Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findBy(params : FindOptionsWhere<T> | FindOptionsWhere<T>[]){
        SendEvent(`${this.constructor.name} - Starting search by params for ${this.name} in database!`, params, 'info');

        const models = this.repository.findBy(params);
        models.then(result => {
            if(result)
                SendEvent(`${this.constructor.name} - Search by params for ${this.name} completed successfully!`, params);
            else
                SendEvent(`${this.constructor.name} - Has no ${this.name} with this params in database!`, params, 'warn');
        }).catch((error) => {
            SendEvent(`${this.constructor.name} - Search for ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findOneBy(params : {}){
        SendEvent(`${this.constructor.name} - Starting search by params for one ${this.name} in database!`, params, 'info');

        const models = this.repository.findOneBy(params);
        models.then(result => {
            if(result)
                SendEvent(`${this.constructor.name} - Search by params for one ${this.name} completed successfully!`, params);
            else
                SendEvent(`${this.constructor.name} - Has no ${this.name} with this params in database!`, params, 'warn');
        }).catch((error) => {
            SendEvent(`${this.constructor.name} - Search for one ${this.name} has a error!`, error, 'error');
        });

        return models;
    }

    async findById(id:any) {
        return this.findOneBy({id: id});
    }

    async save(model : T){
        SendEvent(`${this.constructor.name} - Starting saving a new item of ${this.name} in database!`, model);

        let promiseResult = this.repository.save(model).then(this.checkIfModelHasId).catch((error) => {
            SendEvent(`${this.constructor.name} - Has no ${this.name}`, error, 'error');
        });

        return promiseResult;
    }

    async saveAll(models : T[]){
        SendEvent(`${this.constructor.name} - Starting saving a new item of ${this.name} in database!`, models);

        let promiseResult = this.repository.save(models)
        .then((result) => result.forEach((eachResult) => this.checkIfModelHasId(eachResult)))
        .catch((error) => {
            SendEvent(`${this.constructor.name} - Has no ${this.name}`, error, 'error');
        });

        return promiseResult;
    }

    async saveEach(models : T[]) {
        const   arrayLength = models.length,
                lastIndex = arrayLength - 1;

        const promise = new Promise<void>((resolve => {    
            for(let index = 0; index < arrayLength; index++){
                models[index].save({transaction:true})
                if(index == lastIndex)
                    resolve();
            }
        }));

        return promise;
    }


    private checkIfModelHasId(model : T){
        if(model.hasId())
            SendEvent(`${this.constructor.name} - One item of ${this.name} was saved in database with successfully!`, model);
        else
            SendEvent(`${this.constructor.name} - Item has no ID. Check table ${this.name} is the model exist!`, model, 'warn');
    }

}