//* ------------ Tab Interfaces: ------------
export interface Tab {
    id: number;
    name: string;
    fileURL: string; //* This will eventually point to the location of an actual file (ex: coolTab.gp5)
    userId: number;
}