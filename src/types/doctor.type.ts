export type TDoctorTitle = 'Dr.' | 'Prof. Dr.' | 'Assoc. Prof. Dr.' | 'Asst. Prof. Dr.';

export type TDoctorStatus = 'draft' | 'published' | 'archive';
export type TDoctorApprovalStatus = 'pending' | 'approved' | 'rejected';
export type TDoctorUserStatus = 'active' | 'inactive' | 'blocked';

export interface ICreateDoctorPayload {
    title: TDoctorTitle | "";
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    specialization: string;
    bmdcNumber?: string;
    designation?: string;
    education?: string;
    consultationFee: number;
    address?: string;
    experience?: string;
    about?: string;
    qualifications?: string;
    status: TDoctorStatus;
    image?: File | null | string;
}

export interface IDoctor {
    _id?: string;
    id?: string;
    userId?: string;
    title?: string;
    fullName?: string;
    email: string;
    phone?: string;
    profileImg?: string;
    userStatus?: TDoctorUserStatus | string;
    specialization?: string;
    hospital?: string;
    designation?: string;
    education?: string | string[];
    consultationFee?: number;
    address?: string;
    bmdcNumber?: string;
    experience?: string;
    about?: string;
    qualifications?: string;
    rating?: number;
    totalReviews?: number;
    approvalStatus?: TDoctorApprovalStatus | string;
    rejectionReason?: string | null;
    status: TDoctorStatus | string;
    registrationSource?: string;
    createdAt?: string;
    updatedAt?: string;

    // Optional legacy compatibility fields
    name?: string;
    specialty?: string;
    location?: string;
    fee?: string | number;
    languages?: string[];
    moreLangs?: string;
    avatar?: string;
    reviews?: number;
    expertise?: string[];
}

export interface IDoctorPaginationMeta {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}

export interface IGetDoctorsResponse {
    success: boolean;
    message: string;
    meta?: IDoctorPaginationMeta;
    data: IDoctor[];
}

export interface IDoctorQueryParams {
    searchTerm?: string;
    status?: string;
    approvalStatus?: string;
    page?: number;
    limit?: number;
    [key: string]: any;
}