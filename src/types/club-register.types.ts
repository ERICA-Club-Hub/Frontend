import { IClubRegisterValue } from './input-value.types';

interface IClubRegisterState {
    requestBody: IClubRegisterValue;
    image: string | ArrayBuffer | null;
}

type SetUploadImgUrlType = React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
>;

export type { IClubRegisterState, SetUploadImgUrlType };
