/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): string;
    serveAvatar(filename: string, res: any): Promise<any>;
    serveAvatara(filename: string, res: any): Promise<any>;
}
