declare global {
    namespace NodeJS {
      interface Global {
        _notifyAboutProgress: (tag: any, value: any, isSharedTransition: boolean) => void;
        _notifyAboutEnd: (tag: any, removeView: any) => void;
        ProgressTransitionRegister: {
          onTransitionStart: (tag: any, yogaValues: any) => void;
        };
        LayoutAnimationsManager: any;
      }
    }
  }
  
  export {};  