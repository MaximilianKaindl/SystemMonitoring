import { Cpu } from './cpu';
import { Ram } from './ram';

export interface SystemInfo {
    Id: string;
    Cpu: Cpu;
    Ram: Ram;
}