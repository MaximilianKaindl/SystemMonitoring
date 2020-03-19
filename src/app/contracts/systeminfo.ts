import { Cpu } from './cpu';
import { Ram } from './ram';

export interface SystemInfo {
    Name: string;
    Cpu: Cpu;
    Ram: Ram;
}