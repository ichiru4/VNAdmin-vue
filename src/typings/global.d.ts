declare namespace User{
    export interface UserResponse{
        Name: string; // 对应 C# 的 public string Name { get; set; }
        // pass: string; // 如果需要，可以添加此行，取消注释即可
        Status: number;  // 对应 C# 的 public int Status { get; set; } = 0;
        Sex: number;     // 对应 C# 的 public int Sex { get; set; } = 0;
        Age: number;     // 对应 C# 的 public int Age { get; set; }
        CreateTime: string; // 对应 C# 的 public DateTime CreateTime { get; set; } = DateTime.Now;
        UpdateTime: string; // 对应 C# 的 public DateTime UpdateTime { get; set; } = DateTime.Now;
        IsDelete: boolean; // 对应 C# 的 public bool isDelete { get; set; }
        Id: string;
        IDs: string[];
    }
}

declare namespace Menu{
     interface MenuOption{
        id: string;
        pid: string;
        order: number;
        name: string;
        IsHide:boolean;
        IsButton:boolean;
        path:string;
        Func:string|null;
        component?: string | (()=>Promise<unknown>)
        iconCls:string;
        meta: MetaProps;
        children?: MenuOption[]|null
        search:string|null;
    }

    interface MetaProps{
        icon: string;
        title: string;
        requireAuth: boolean;
        NoTabPage: boolean;
        KeepAlive: boolean;
        isLink: string | null;
        // isFull:true;
    }
    export interface MenuRequest{
        uid: string;
    }
}