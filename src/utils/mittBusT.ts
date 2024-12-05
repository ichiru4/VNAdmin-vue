import mitt from'mitt'

type Events = {
    callFunction: Menu.MenuOption;
}

const emmitter = mitt<Events>()

export default emmitter