export type LayoutType = "vertical"|"transverse"
/* AuthState */
export interface AuthState {
    routeName: string;
    authButtonList: {
        [key: string]: string[];
    };
    authMenuList: Menu.MenuOption[];
}

export interface KeepAliveState{
    keepAliveName: string[];
}

export interface TabsState{
    tabMenuList: TabsMenuProps[];
}

export interface TabsMenuProps{
    icon: string;
    title: string;
    path: string;
    name : string;
    close: boolean;
}