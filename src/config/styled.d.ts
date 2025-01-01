import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        color: {
            mainBlue: string;

            subGreen: string;
            subOrange: string;

            bgLightGray: string;
            bgLightBlue: string;
            bgLightOrange: string;
            bgLightGreen: string;

            black: string;
            mainGary: string;
            subGray: string;
            mediumGray: string;
            lightGray: string;
            white: string;
        };
    }
}
