import { useEffect } from "react";
import * as webBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
    useEffect(() => {
       void  webBrowser.warmUpAsync();
       return () => {
          void  webBrowser.coolDownAsync();
       };
    }, []);
}