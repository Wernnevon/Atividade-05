import axios from 'axios';
import Project from '../models/Project'

const api = axios.create({
    baseURL: "http://192.168.0.11:8080/project",
});

export default class Service{
    public async get(){
        return await api.get('');
    };
    public async getById<Project>(id: string){
        return await api.get(`/${id}`)
    };
    public async create(project: any){
        await api.post('', project);
    };
    public async update(id: string, project: any){
        try {
            await api.put(`/${id}`, project);
        } catch (error) {
            console.log(error)
        }
    };
    public async delete(id: string){
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.log(error)
        }
    };
};