export type TTour = {
    id: string;
    destination: string;
    description: string;
    type: string;
    location: string;
    itinerary: string;
    photos?: string | null;
    startDate: Date;
    endDate: Date;
    activities: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}