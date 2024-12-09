export function getFlatMenuList(menuList: Menu.MenuOption[]): Menu.MenuOption[] {
    let newMenuList: Menu.MenuOption[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}


export function getShowMenuList(menuList: Menu.MenuOption[]): Menu.MenuOption[] {
    let newMenuList: Menu.MenuOption[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children))
        return !item.IsButton;
    });
}

export function getAllBreadcrumbList(menuList: Menu.MenuOption[], parent = [], result: { [key: string]: any } = {}) {
    for (const item of menuList) {
        result[item.path] = [...parent, item]
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
    }
    return result
}

export function getButtonList(routePath: string, router: Menu.MenuOption[]) {
    let buttonList: Menu.MenuOption[] = [];
    const findButton =  (path:string,route:Menu.MenuOption[])=>{
        for(const item of route){
            if(path&&item.path){
                const currentPath = path.toLowerCase();
                if(item.path&&item.path.toLowerCase()===currentPath){
                    buttonList = item.children||[];
                    return;
                }else if(item.children){
                    findButton(currentPath,item.children);
                }
            }
        }
    }
    findButton(routePath,router);
    return buttonList;
}

export function pathToUpperComponent(path: string):string {
    if (!path.includes ("/") ) return '/'+path.charAt(0).toUpperCase() +path.slice(1);
    const lastIndex = path.lastIndexOf("/");
    const pathToUpper = path.slice(lastIndex + 1);
    const lastPart = pathToUpper.charAt(0).toUpperCase() + pathToUpper.slice(1);
    const beforePart = path.slice(0, lastIndex);
    return beforePart+ '/'+ lastPart;
}