import Technology from './Technology'

export default interface Project{
    id?: string;
    title: string;
    url: string;
    techs: Array<Technology>;
};