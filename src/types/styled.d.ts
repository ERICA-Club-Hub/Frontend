import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            mainBlue: string;

            subGreen: string;
            subOrange: string;

            bgLightGray: string;
            bgLightBlue: string;
            bgLightOrange: string;
            bgLightGreen: string;

            black: string;
            mainBlack: string;
            mainGray: string;
            subGray: string;
            mediumGray: string;
            lightGray: string;
            white: string;

            red: string;
        };
    }
}
