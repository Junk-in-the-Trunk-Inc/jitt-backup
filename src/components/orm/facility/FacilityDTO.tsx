
export type FacilityDTO = {
    _id: string;
    name: string;
    phoneNumber?: string;
    email?: string;
    facilityNumber?: string;
    selfStorage: {
        _id: string;
        name: string;
    };
    address: {
        street?: string;
        suite?: string;
        city: string;
        state: string;
        country: string;
        postal?: string;
    };
};
