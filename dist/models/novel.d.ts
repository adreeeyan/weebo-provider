import { Status } from "./status";
export default class Novel {
    title: string;
    alternativeTitles: string[];
    cover: string;
    authors: string[];
    genres: string[];
    summary: string;
    status: Status;
    releaseDate: Date;
    updateDate: Date;
    rating: number;
    location: string;
    constructor(init?: Partial<Novel>);
}
