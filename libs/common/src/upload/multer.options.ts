import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as multer from 'multer';

export const multerDiskOptions = {
  fileFilter: (
    request: Request,
    file: any,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (file.mimetype.match(/\/(mp4|jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 'Not allowed file type',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, getUploadPath(file));
    },
    filename: (request, file, callback) => {
      // callback(null, `${Date.now()}${extname(file.originalname)}`);
      callback(null, file.originalname);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const uploadedFileURL = (fileName: string): string => {
  const uploadPath = getUploadPath(fileName);
  return `http://localhost:3000/${uploadPath}/${fileName}`;
};

const getUploadPath = (file: any): string => {
  let uploadPath: string;
  if (file.mimetype.match(/\/(mp4)$/))
    uploadPath = join(__dirname, '/public/uploads/videos');
  else if (file.mimetype.match(/\/(jpg|jpeg|png)$/))
    uploadPath = join(__dirname, '/public/uploads/images');
  else uploadPath = join(__dirname, '/public/uploads/files');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath);
  }
  return uploadPath;
};
