import { RootStackParamList } from "./RootStackParam";

declare module '*.png' {
    const content: HTMLImageElement;
    export default content;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}