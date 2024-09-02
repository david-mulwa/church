/// <reference types="nativewind/types" />

declare module '*.png'{
    export default string
}
declare module '*.jpg'{
    export default string
}
declare module '*.svg'{ 
    export default string
}   
declare module '*.jpeg'{
    export default string
}

declare module 'react-native-dotenv' {
  export const config: any;
}
