import PROJECT from './interface/PROJECT';
import OPTIONS from './interface/OPTIONS';
export default class ProjectStorage{
    constructor(args:OPTIONS){
        this._projectName = args.projectName;
        this._cleanDateAfter = args.cleanDateAfter || 24*60*60*1000;
        this._project = <PROJECT>JSON.parse(window.localStorage.getItem(this._projectName));
        this._defaultProject = {
            name: this._projectName,
            cleanDataAfter: this._cleanDateAfter,
            value: undefined,
            useTime:Date.now()
        };
        if(!this._project){
            this._project = this._defaultProject;
        }else{
            if(!this._project.useTime || !this._project.cleanDataAfter){
                this._project = this._defaultProject;
            }else if(this._project.useTime + this._project.cleanDataAfter < Date.now()){
                //clean out date value
                this._project.value = undefined;
            }
            this._project.useTime = Date.now();
        }
        window.localStorage.setItem(this._projectName, JSON.stringify(this._project));
    }
    private _project:PROJECT;
    private _projectName:string;
    private _cleanDateAfter:number;
    private _defaultProject:PROJECT;
    get value(){
        return this._project.value;
    }
    set value(value:any){
        this._project.value = value;
        window.localStorage.setItem(this._projectName, JSON.stringify(this._project));
    }
    cleanOutDateProjects(){
        //todo: clean others project
        //question: is this over boundary?
    }
}