export default class ICreateUserDto {
    id?: string;
    name: string;
    password?: string;
    email: string;
    driver_license?: string;
    isAdmin?: boolean;
    avatar?: string;
    created_at?: Date;
    avatar_url?: () => string;
}
