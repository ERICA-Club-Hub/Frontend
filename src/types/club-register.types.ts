import { IClubRegisterValue } from './input-value.types';

interface IClubRegisterState {
    requestBody: IClubRegisterValue;
    image: string | ArrayBuffer | null;
}

type SetPreviewImgType = React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
>;

export type { IClubRegisterState, SetPreviewImgType };
