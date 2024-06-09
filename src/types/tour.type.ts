

export type TUser = {
    bio: string;
    username: string;
    email: string;
    age: number;
    address: string;
    contactNumber: string;
    id: string;
    photos?: String;
};


export type TTour = {
    data: TUser[]
    id: string;
    destination: string;
    description: string;
    type: string;
    location: string;
    age: number;
    itinerary: string;
    photos?: String[];
    startDate: Date;
    endDate: Date;
    activities: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    meta: TMeta
};


type TMeta = {
    total: number;
    page: number;
    limit: number;
}