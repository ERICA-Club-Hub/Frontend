interface IInputValue {
    clubName: string;
    leaderEmail: string;
    category: string;
    oneLiner: string;
    briefIntroduction: string;
}

interface IClubRegisterState {
    requestBody: IInputValue;
    image: string | ArrayBuffer | null;
}

type SetUploadImgUrlType = React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
>;

export type { IInputValue, IClubRegisterState, SetUploadImgUrlType };
